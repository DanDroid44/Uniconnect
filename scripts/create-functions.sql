-- Database functions for UniConnect
-- This script creates useful functions for the application

-- Function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to calculate GPA for a student
CREATE OR REPLACE FUNCTION public.calculate_student_gpa(student_uuid UUID)
RETURNS DECIMAL(3,2) AS $$
DECLARE
  gpa_result DECIMAL(3,2);
BEGIN
  SELECT ROUND(
    SUM(e.final_grade * c.credits) / SUM(c.credits), 2
  ) INTO gpa_result
  FROM public.enrollments e
  JOIN public.courses c ON e.course_id = c.id
  WHERE e.student_id = student_uuid 
    AND e.status = 'completed' 
    AND e.final_grade IS NOT NULL;
  
  RETURN COALESCE(gpa_result, 0.00);
END;
$$ LANGUAGE plpgsql;

-- Function to get active semester
CREATE OR REPLACE FUNCTION public.get_active_semester()
RETURNS TABLE(
  id UUID,
  name VARCHAR(50),
  academic_year_id UUID,
  start_date DATE,
  end_date DATE,
  academic_year VARCHAR(9)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.name,
    s.academic_year_id,
    s.start_date,
    s.end_date,
    ay.year
  FROM public.semesters s
  JOIN public.academic_years ay ON s.academic_year_id = ay.id
  WHERE s.is_active = true
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function to generate student number
CREATE OR REPLACE FUNCTION public.generate_student_number()
RETURNS VARCHAR(20) AS $$
DECLARE
  year_suffix VARCHAR(4);
  sequence_num INTEGER;
  student_number VARCHAR(20);
BEGIN
  -- Get current year suffix
  year_suffix := EXTRACT(YEAR FROM NOW())::VARCHAR;
  
  -- Get next sequence number for this year
  SELECT COALESCE(MAX(
    CASE 
      WHEN student_number LIKE year_suffix || '%' 
      THEN (SUBSTRING(student_number FROM 5))::INTEGER 
      ELSE 0 
    END
  ), 0) + 1
  INTO sequence_num
  FROM public.profiles
  WHERE student_number IS NOT NULL;
  
  -- Format: YYYY0001, YYYY0002, etc.
  student_number := year_suffix || LPAD(sequence_num::VARCHAR, 4, '0');
  
  RETURN student_number;
END;
$$ LANGUAGE plpgsql;

-- Function to generate employee number
CREATE OR REPLACE FUNCTION public.generate_employee_number()
RETURNS VARCHAR(20) AS $$
DECLARE
  year_suffix VARCHAR(4);
  sequence_num INTEGER;
  employee_number VARCHAR(20);
BEGIN
  -- Get current year suffix
  year_suffix := EXTRACT(YEAR FROM NOW())::VARCHAR;
  
  -- Get next sequence number for this year
  SELECT COALESCE(MAX(
    CASE 
      WHEN employee_number LIKE 'EMP' || year_suffix || '%' 
      THEN (SUBSTRING(employee_number FROM 8))::INTEGER 
      ELSE 0 
    END
  ), 0) + 1
  INTO sequence_num
  FROM public.profiles
  WHERE employee_number IS NOT NULL;
  
  -- Format: EMPYYYY001, EMPYYYY002, etc.
  employee_number := 'EMP' || year_suffix || LPAD(sequence_num::VARCHAR, 3, '0');
  
  RETURN employee_number;
END;
$$ LANGUAGE plpgsql;

-- Function to update student GPA automatically
CREATE OR REPLACE FUNCTION public.update_student_gpa()
RETURNS TRIGGER AS $$
BEGIN
  -- Update GPA when enrollment is completed with a grade
  IF NEW.status = 'completed' AND NEW.final_grade IS NOT NULL THEN
    UPDATE public.profiles 
    SET gpa = public.calculate_student_gpa(NEW.student_id)
    WHERE id = NEW.student_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update GPA
DROP TRIGGER IF EXISTS update_gpa_on_completion ON public.enrollments;
CREATE TRIGGER update_gpa_on_completion
  AFTER UPDATE ON public.enrollments
  FOR EACH ROW EXECUTE FUNCTION public.update_student_gpa();

-- Function to get course statistics for lecturers
CREATE OR REPLACE FUNCTION public.get_course_stats(course_uuid UUID, semester_uuid UUID)
RETURNS TABLE(
  total_students INTEGER,
  average_grade DECIMAL(4,2),
  pass_rate DECIMAL(5,2),
  attendance_rate DECIMAL(5,2)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(e.id)::INTEGER as total_students,
    ROUND(AVG(e.final_grade), 2) as average_grade,
    ROUND(
      (COUNT(CASE WHEN e.final_grade >= 10 THEN 1 END)::DECIMAL / 
       NULLIF(COUNT(CASE WHEN e.final_grade IS NOT NULL THEN 1 END), 0)) * 100, 2
    ) as pass_rate,
    ROUND(
      (COUNT(CASE WHEN a.status = 'present' THEN 1 END)::DECIMAL / 
       NULLIF(COUNT(a.id), 0)) * 100, 2
    ) as attendance_rate
  FROM public.enrollments e
  LEFT JOIN public.attendance a ON e.id = a.enrollment_id
  WHERE e.course_id = course_uuid 
    AND e.semester_id = semester_uuid;
END;
$$ LANGUAGE plpgsql;
