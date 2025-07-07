-- Insert sample profiles
INSERT INTO public.profiles (id, full_name, role, faculty, student_id, phone, address) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'Daniel Darsamo', 'student', 'computer-science', 'CS2024001', '+258 84 123 4567', 'Maputo, Mozambique'),
    ('550e8400-e29b-41d4-a716-446655440001', 'Prof. Maria Santos', 'lecturer', 'computer-science', NULL, '+258 84 234 5678', 'Maputo, Mozambique'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Dr. João Silva', 'coordinator', 'computer-science', NULL, '+258 84 345 6789', 'Maputo, Mozambique');

-- Insert sample courses
INSERT INTO public.courses (id, code, name, description, credits, faculty, semester, year, coordinator_id, lecturer_id) VALUES
    ('650e8400-e29b-41d4-a716-446655440000', 'CS101', 'Introduction to Computer Science', 'Basic concepts of programming and computer science', 3, 'computer-science', 1, 2025, '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001'),
    ('650e8400-e29b-41d4-a716-446655440001', 'MATH201', 'Calculus II', 'Advanced calculus concepts', 4, 'computer-science', 1, 2025, '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001'),
    ('650e8400-e29b-41d4-a716-446655440002', 'ENG202', 'Technical Writing', 'Writing skills for technical documentation', 2, 'computer-science', 1, 2025, '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001'),
    ('650e8400-e29b-41d4-a716-446655440003', 'PSYC101', 'Introduction to Psychology', 'Basic psychological concepts', 3, 'computer-science', 1, 2025, '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001'),
    ('650e8400-e29b-41d4-a716-446655440004', 'HIST105', 'World History', 'Overview of world historical events', 3, 'computer-science', 1, 2025, '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001');

-- Insert student enrollments
INSERT INTO public.enrollments (student_id, course_id) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440000'),
    ('550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440002'),
    ('550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440003'),
    ('550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440004');

-- Insert sample assessments with proper weights
INSERT INTO public.assessments (course_id, student_id, type, score, max_score, weight) VALUES
    -- CS101 assessments
    ('650e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'test1', 85, 100, 0.20),
    ('650e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'test2', 90, 100, 0.20),
    ('650e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'assignment1', 95, 100, 0.10),
    ('650e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'assignment2', 88, 100, 0.10),
    ('650e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'exam', 92, 100, 0.40),
    
    -- MATH201 assessments
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'test1', 78, 100, 0.20),
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'test2', 82, 100, 0.20),
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'assignment1', 85, 100, 0.10),
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'assignment2', 90, 100, 0.10),
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'exam', 88, 100, 0.40);

-- Insert financial records (Mozambican Metical - MT)
INSERT INTO public.financial_records (student_id, amount, type, description, due_date, status, academic_year, semester) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 5670.00, 'tuition', 'Monthly tuition fee', '2025-02-01', 'pending', 2025, 1),
    ('550e8400-e29b-41d4-a716-446655440000', 945.00, 'subject_fee', 'CS101 subject fee', '2025-02-01', 'paid', 2025, 1),
    ('550e8400-e29b-41d4-a716-446655440000', 945.00, 'subject_fee', 'MATH201 subject fee', '2025-02-01', 'paid', 2025, 1),
    ('550e8400-e29b-41d4-a716-446655440000', 945.00, 'subject_fee', 'ENG202 subject fee', '2025-02-01', 'pending', 2025, 1);

-- Insert class schedules
INSERT INTO public.class_schedules (course_id, day_of_week, start_time, end_time, room, building) VALUES
    ('650e8400-e29b-41d4-a716-446655440000', 1, '09:30', '11:00', '203', 'Building A'),
    ('650e8400-e29b-41d4-a716-446655440001', 1, '12:30', '14:00', '105', 'Building B'),
    ('650e8400-e29b-41d4-a716-446655440000', 3, '09:30', '11:00', '203', 'Building A'),
    ('650e8400-e29b-41d4-a716-446655440001', 3, '12:30', '14:00', '105', 'Building B');

-- Insert sample announcements
INSERT INTO public.announcements (title, content, priority, author_id, target_role, target_faculty) VALUES
    ('Important update on final exam schedule', 'Please note that the final exam schedule has been updated. Check your student portal for the latest information.', 'high', '550e8400-e29b-41d4-a716-446655440002', 'student', 'computer-science'),
    ('Library hours extended for exam week', 'The library will be open 24/7 during exam week to support student studies.', 'medium', '550e8400-e29b-41d4-a716-446655440002', 'student', NULL),
    ('New course registration opens next week', 'Course registration for the next semester will open on Monday. Prepare your course selections.', 'medium', '550e8400-e29b-41d4-a716-446655440002', 'student', NULL);
