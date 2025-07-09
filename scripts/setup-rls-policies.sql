-- Row Level Security (RLS) Policies for UniConnect
-- This script sets up security policies to ensure users can only access their own data

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_memberships ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Lecturers can view student profiles in their courses" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.course_assignments ca
      JOIN public.enrollments e ON ca.course_id = e.course_id
      WHERE ca.lecturer_id = auth.uid() AND e.student_id = profiles.id
    )
  );

CREATE POLICY "Coordinators can view profiles in their department" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role = 'coordinator' 
      AND p.department_id = profiles.department_id
    )
  );

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- Enrollments policies
CREATE POLICY "Students can view their own enrollments" ON public.enrollments
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Lecturers can view enrollments for their courses" ON public.enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.course_assignments ca
      WHERE ca.lecturer_id = auth.uid() AND ca.course_id = enrollments.course_id
    )
  );

CREATE POLICY "Lecturers can update enrollments for their courses" ON public.enrollments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.course_assignments ca
      WHERE ca.lecturer_id = auth.uid() AND ca.course_id = enrollments.course_id
    )
  );

-- Grades policies
CREATE POLICY "Students can view their own grades" ON public.grades
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.enrollments e
      WHERE e.id = grades.enrollment_id AND e.student_id = auth.uid()
    )
  );

CREATE POLICY "Lecturers can manage grades for their courses" ON public.grades
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.enrollments e
      JOIN public.course_assignments ca ON ca.course_id = e.course_id
      WHERE e.id = grades.enrollment_id AND ca.lecturer_id = auth.uid()
    )
  );

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = recipient_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = recipient_id);

CREATE POLICY "Lecturers and coordinators can send notifications" ON public.notifications
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('lecturer', 'coordinator', 'admin')
    )
  );

-- Public read access for reference tables
CREATE POLICY "Public read access for faculties" ON public.faculties FOR SELECT USING (true);
CREATE POLICY "Public read access for departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Public read access for courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public read access for academic years" ON public.academic_years FOR SELECT USING (true);
CREATE POLICY "Public read access for semesters" ON public.semesters FOR SELECT USING (true);

-- Student groups policies
CREATE POLICY "Students can view groups for their courses" ON public.student_groups
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.enrollments e
      WHERE e.student_id = auth.uid() AND e.course_id = student_groups.course_id
    )
  );

CREATE POLICY "Students can create groups for their courses" ON public.student_groups
  FOR INSERT WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM public.enrollments e
      WHERE e.student_id = auth.uid() AND e.course_id = course_id
    )
  );

-- Group memberships policies
CREATE POLICY "Students can view their group memberships" ON public.group_memberships
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can join groups" ON public.group_memberships
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can leave groups" ON public.group_memberships
  FOR DELETE USING (auth.uid() = student_id);
