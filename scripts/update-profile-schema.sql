-- Update user profiles table to support role-specific fields
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS program VARCHAR(100),
ADD COLUMN IF NOT EXISTS year INTEGER,
ADD COLUMN IF NOT EXISTS enrollment_date DATE,
ADD COLUMN IF NOT EXISTS department VARCHAR(100),
ADD COLUMN IF NOT EXISTS courses_taught TEXT[],
ADD COLUMN IF NOT EXISTS is_coordinator BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS access_level VARCHAR(50),
ADD COLUMN IF NOT EXISTS assigned_faculty VARCHAR(100);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_department ON user_profiles(department);
CREATE INDEX IF NOT EXISTS idx_user_profiles_program ON user_profiles(program);

-- Update existing records with default values based on role
UPDATE user_profiles 
SET 
  program = CASE 
    WHEN role = 'student' THEN 'Ciências da Computação'
    ELSE program
  END,
  year = CASE 
    WHEN role = 'student' THEN 1
    ELSE year
  END,
  enrollment_date = CASE 
    WHEN role = 'student' THEN CURRENT_DATE
    ELSE enrollment_date
  END,
  department = CASE 
    WHEN role IN ('lecturer', 'coordinator') THEN 'Ciências da Computação'
    ELSE department
  END,
  access_level = CASE 
    WHEN role = 'admin' THEN 'full'
    ELSE access_level
  END,
  assigned_faculty = CASE 
    WHEN role = 'admin' THEN 'Todas'
    ELSE assigned_faculty
  END
WHERE role IS NOT NULL;

-- Create function to validate profile data based on role
CREATE OR REPLACE FUNCTION validate_profile_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate student fields
  IF NEW.role = 'student' THEN
    IF NEW.program IS NULL OR NEW.year IS NULL OR NEW.enrollment_date IS NULL THEN
      RAISE EXCEPTION 'Students must have program, year, and enrollment_date';
    END IF;
  END IF;
  
  -- Validate faculty fields
  IF NEW.role IN ('lecturer', 'coordinator') THEN
    IF NEW.department IS NULL THEN
      RAISE EXCEPTION 'Faculty must have department';
    END IF;
  END IF;
  
  -- Validate admin fields
  IF NEW.role = 'admin' THEN
    IF NEW.access_level IS NULL OR NEW.assigned_faculty IS NULL THEN
      RAISE EXCEPTION 'Admins must have access_level and assigned_faculty';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profile validation
DROP TRIGGER IF EXISTS validate_profile_trigger ON user_profiles;
CREATE TRIGGER validate_profile_trigger
  BEFORE INSERT OR UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION validate_profile_data();

-- Create view for student profiles
CREATE OR REPLACE VIEW student_profiles AS
SELECT 
  up.*,
  u.email,
  u.created_at as user_created_at
FROM user_profiles up
JOIN auth.users u ON up.user_id = u.id
WHERE up.role = 'student';

-- Create view for faculty profiles
CREATE OR REPLACE VIEW faculty_profiles AS
SELECT 
  up.*,
  u.email,
  u.created_at as user_created_at
FROM user_profiles up
JOIN auth.users u ON up.user_id = u.id
WHERE up.role IN ('lecturer', 'coordinator');

-- Create view for admin profiles
CREATE OR REPLACE VIEW admin_profiles AS
SELECT 
  up.*,
  u.email,
  u.created_at as user_created_at
FROM user_profiles up
JOIN auth.users u ON up.user_id = u.id
WHERE up.role = 'admin';

-- Grant appropriate permissions
GRANT SELECT ON student_profiles TO authenticated;
GRANT SELECT ON faculty_profiles TO authenticated;
GRANT SELECT ON admin_profiles TO authenticated;

-- Update RLS policies
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow coordinators and admins to view profiles in their department/faculty
CREATE POLICY "Coordinators can view department profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles coordinator
      WHERE coordinator.user_id = auth.uid()
      AND coordinator.role = 'coordinator'
      AND coordinator.department = user_profiles.department
    )
  );

CREATE POLICY "Admins can view assigned faculty profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles admin
      WHERE admin.user_id = auth.uid()
      AND admin.role = 'admin'
      AND (admin.assigned_faculty = 'Todas' OR admin.assigned_faculty = user_profiles.department)
    )
  );
