-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Coordinators can view profiles in their faculty" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles p 
            WHERE p.id = auth.uid() 
            AND p.role = 'coordinator' 
            AND p.faculty = profiles.faculty
        )
    );

CREATE POLICY "Lecturers can view student profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles p 
            WHERE p.id = auth.uid() 
            AND p.role = 'lecturer'
        ) AND profiles.role = 'student'
    );

-- Courses policies
CREATE POLICY "Everyone can view courses" ON courses
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Lecturers can view their courses" ON courses
    FOR SELECT USING (lecturer_id = auth.uid());

CREATE POLICY "Coordinators can manage courses in their faculty" ON courses
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles p 
            WHERE p.id = auth.uid() 
            AND p.role = 'coordinator' 
            AND p.faculty = courses.faculty
        )
    );

-- Enrollments policies
CREATE POLICY "Students can view their enrollments" ON enrollments
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Lecturers can view enrollments for their courses" ON enrollments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM courses c 
            WHERE c.id = enrollments.course_id 
            AND c.lecturer_id = auth.uid()
        )
    );

CREATE POLICY "Coordinators can manage enrollments in their faculty" ON enrollments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles p 
            JOIN courses c ON c.faculty = p.faculty
            WHERE p.id = auth.uid() 
            AND p.role = 'coordinator' 
            AND c.id = enrollments.course_id
        )
    );

-- Grades policies
CREATE POLICY "Students can view their grades" ON grades
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Lecturers can manage grades for their courses" ON grades
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM courses c 
            WHERE c.id = grades.course_id 
            AND c.lecturer_id = auth.uid()
        )
    );

CREATE POLICY "Coordinators can view grades in their faculty" ON grades
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles p 
            JOIN courses c ON c.faculty = p.faculty
            WHERE p.id = auth.uid() 
            AND p.role = 'coordinator' 
            AND c.id = grades.course_id
        )
    );

-- Financial records policies
CREATE POLICY "Students can view their financial records" ON financial_records
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Coordinators can manage financial records in their faculty" ON financial_records
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles p1 
            JOIN profiles p2 ON p2.faculty = p1.faculty
            WHERE p1.id = auth.uid() 
            AND p1.role = 'coordinator' 
            AND p2.id = financial_records.student_id
        )
    );

-- Announcements policies
CREATE POLICY "Everyone can view published announcements" ON announcements
    FOR SELECT USING (
        is_published = true 
        AND (expires_at IS NULL OR expires_at > NOW())
        AND (
            target_audience = 'all' 
            OR (target_audience = 'students' AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()))
            OR (faculty IS NULL OR EXISTS (
                SELECT 1 FROM profiles p 
                WHERE p.id = auth.uid() 
                AND p.faculty = announcements.faculty
            ))
        )
    );

CREATE POLICY "Coordinators can manage announcements" ON announcements
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles p 
            WHERE p.id = auth.uid() 
            AND p.role IN ('coordinator', 'admin')
        )
    );

-- Schedule policies
CREATE POLICY "Students can view their schedule" ON schedule
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Lecturers can view schedules for their courses" ON schedule
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM courses c 
            WHERE c.id = schedule.course_id 
            AND c.lecturer_id = auth.uid()
        )
    );

CREATE POLICY "Coordinators can manage schedules in their faculty" ON schedule
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles p 
            JOIN courses c ON c.faculty = p.faculty
            WHERE p.id = auth.uid() 
            AND p.role = 'coordinator' 
            AND c.id = schedule.course_id
        )
    );

-- Attendance policies
CREATE POLICY "Students can view their attendance" ON attendance
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Lecturers can manage attendance for their courses" ON attendance
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM courses c 
            WHERE c.id = attendance.course_id 
            AND c.lecturer_id = auth.uid()
        )
    );

CREATE POLICY "Coordinators can view attendance in their faculty" ON attendance
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles p 
            JOIN courses c ON c.faculty = p.faculty
            WHERE p.id = auth.uid() 
            AND p.role = 'coordinator' 
            AND c.id = attendance.course_id
        )
    );
