-- Insert sample users into auth.users (this would typically be done through Supabase Auth)
-- Note: In production, users are created through the authentication flow

-- Insert sample profiles
INSERT INTO profiles (id, email, full_name, role, faculty, year, student_id, phone, address, created_at, updated_at) VALUES
-- Students
('11111111-1111-1111-1111-111111111111', 'daniel.darsamo@student.stu.ac.mz', 'Daniel Darsamo', 'student', 'Computer Science', '2nd Year', 'CS2024001', '+258 84 123 4567', 'Maputo, Mozambique', NOW(), NOW()),
('22222222-2222-2222-2222-222222222222', 'ana.costa@student.stu.ac.mz', 'Ana Costa Silva', 'student', 'Computer Science', '2nd Year', 'CS2024002', '+258 84 234 5678', 'Beira, Mozambique', NOW(), NOW()),
('33333333-3333-3333-3333-333333333333', 'carlos.mendes@student.stu.ac.mz', 'Carlos Mendes', 'student', 'Business Management', '3rd Year', 'BM2023001', '+258 84 345 6789', 'Nampula, Mozambique', NOW(), NOW()),
('44444444-4444-4444-4444-444444444444', 'isabel.rodrigues@student.stu.ac.mz', 'Isabel Rodrigues', 'student', 'Accounting', '1st Year', 'AC2024001', '+258 84 456 7890', 'Quelimane, Mozambique', NOW(), NOW()),
('55555555-5555-5555-5555-555555555555', 'antonio.pereira@student.stu.ac.mz', 'António Pereira', 'student', 'Computer Science', '3rd Year', 'CS2023002', '+258 84 567 8901', 'Tete, Mozambique', NOW(), NOW()),

-- Coordinators
('66666666-6666-6666-6666-666666666666', 'joao.silva@coord.stu.ac.mz', 'Dr. João Silva', 'coordinator', 'Computer Science', NULL, NULL, '+258 84 111 2222', 'Maputo, Mozambique', NOW(), NOW()),
('77777777-7777-7777-7777-777777777777', 'maria.santos@coord.stu.ac.mz', 'Dr. Maria Santos', 'coordinator', 'Business Management', NULL, NULL, '+258 84 222 3333', 'Maputo, Mozambique', NOW(), NOW()),
('88888888-8888-8888-8888-888888888888', 'pedro.oliveira@coord.stu.ac.mz', 'Dr. Pedro Oliveira', 'coordinator', 'Accounting', NULL, NULL, '+258 84 333 4444', 'Maputo, Mozambique', NOW(), NOW()),

-- Lecturers
('99999999-9999-9999-9999-999999999999', 'ana.lecturer@lect.stu.ac.mz', 'Prof. Ana Lecturer', 'lecturer', 'Computer Science', NULL, NULL, '+258 84 444 5555', 'Maputo, Mozambique', NOW(), NOW()),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'carlos.lecturer@lect.stu.ac.mz', 'Prof. Carlos Lecturer', 'lecturer', 'Business Management', NULL, NULL, '+258 84 555 6666', 'Maputo, Mozambique', NOW(), NOW()),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'isabel.lecturer@lect.stu.ac.mz', 'Prof. Isabel Lecturer', 'lecturer', 'Accounting', NULL, NULL, '+258 84 666 7777', 'Maputo, Mozambique', NOW(), NOW());

-- Insert sample courses
INSERT INTO courses (id, code, name, description, credits, faculty, semester, lecturer_id, max_enrollment, created_at, updated_at) VALUES
-- Computer Science Courses
(1, 'CS101', 'Introduction to Computer Science', 'Basic concepts of programming and computer science fundamentals', 3, 'Computer Science', 'Spring 2025', '99999999-9999-9999-9999-999999999999', 50, NOW(), NOW()),
(2, 'CS201', 'Data Structures and Algorithms', 'Advanced programming concepts including data structures and algorithm design', 4, 'Computer Science', 'Spring 2025', '99999999-9999-9999-9999-999999999999', 45, NOW(), NOW()),
(3, 'CS301', 'Software Engineering', 'Software development methodologies and project management', 3, 'Computer Science', 'Spring 2025', '99999999-9999-9999-9999-999999999999', 40, NOW(), NOW()),

-- Business Management Courses
(4, 'BM101', 'Introduction to Business', 'Fundamentals of business management and operations', 3, 'Business Management', 'Spring 2025', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 60, NOW(), NOW()),
(5, 'BM201', 'Marketing Principles', 'Basic marketing concepts and strategies', 3, 'Business Management', 'Spring 2025', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 55, NOW(), NOW()),
(6, 'BM301', 'Strategic Management', 'Advanced business strategy and planning', 4, 'Business Management', 'Spring 2025', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 35, NOW(), NOW()),

-- Accounting Courses
(7, 'AC101', 'Financial Accounting', 'Basic principles of financial accounting', 3, 'Accounting', 'Spring 2025', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 50, NOW(), NOW()),
(8, 'AC201', 'Management Accounting', 'Cost accounting and management decision making', 3, 'Accounting', 'Spring 2025', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 45, NOW(), NOW()),
(9, 'AC301', 'Advanced Accounting', 'Complex accounting topics and financial reporting', 4, 'Accounting', 'Spring 2025', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 30, NOW(), NOW()),

-- General Education Courses
(10, 'MATH201', 'Calculus II', 'Advanced calculus concepts', 4, 'Mathematics', 'Spring 2025', '99999999-9999-9999-9999-999999999999', 40, NOW(), NOW()),
(11, 'ENG202', 'Technical Writing', 'Professional and technical communication skills', 2, 'English', 'Spring 2025', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 35, NOW(), NOW()),
(12, 'PSYC101', 'Introduction to Psychology', 'Basic psychological principles and theories', 3, 'Psychology', 'Spring 2025', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 45, NOW(), NOW());

-- Insert sample enrollments
INSERT INTO enrollments (id, student_id, course_id, enrollment_date, status, created_at, updated_at) VALUES
-- Daniel Darsamo enrollments
(1, '11111111-1111-1111-1111-111111111111', 1, '2025-01-15', 'active', NOW(), NOW()),
(2, '11111111-1111-1111-1111-111111111111', 10, '2025-01-15', 'active', NOW(), NOW()),
(3, '11111111-1111-1111-1111-111111111111', 11, '2025-01-15', 'active', NOW(), NOW()),
(4, '11111111-1111-1111-1111-111111111111', 12, '2025-01-15', 'active', NOW(), NOW()),

-- Ana Costa enrollments
(5, '22222222-2222-2222-2222-222222222222', 1, '2025-01-15', 'active', NOW(), NOW()),
(6, '22222222-2222-2222-2222-222222222222', 2, '2025-01-15', 'active', NOW(), NOW()),
(7, '22222222-2222-2222-2222-222222222222', 10, '2025-01-15', 'active', NOW(), NOW()),
(8, '22222222-2222-2222-2222-222222222222', 11, '2025-01-15', 'active', NOW(), NOW()),

-- Carlos Mendes enrollments
(9, '33333333-3333-3333-3333-333333333333', 4, '2025-01-15', 'active', NOW(), NOW()),
(10, '33333333-3333-3333-3333-333333333333', 5, '2025-01-15', 'active', NOW(), NOW()),
(11, '33333333-3333-3333-3333-333333333333', 6, '2025-01-15', 'active', NOW(), NOW()),

-- Isabel Rodrigues enrollments
(12, '44444444-4444-4444-4444-444444444444', 7, '2025-01-15', 'active', NOW(), NOW()),
(13, '44444444-4444-4444-4444-444444444444', 8, '2025-01-15', 'active', NOW(), NOW()),
(14, '44444444-4444-4444-4444-444444444444', 12, '2025-01-15', 'active', NOW(), NOW()),

-- António Pereira enrollments
(15, '55555555-5555-5555-5555-555555555555', 2, '2025-01-15', 'active', NOW(), NOW()),
(16, '55555555-5555-5555-5555-555555555555', 3, '2025-01-15', 'active', NOW(), NOW()),
(17, '55555555-5555-5555-5555-555555555555', 10, '2025-01-15', 'active', NOW(), NOW());

-- Insert sample grades
INSERT INTO grades (id, student_id, course_id, assignment_name, score, max_score, weight, grade_date, created_at, updated_at) VALUES
-- Daniel Darsamo grades for CS101
(1, '11111111-1111-1111-1111-111111111111', 1, 'Assignment 1', 85, 100, 15, '2025-02-15', NOW(), NOW()),
(2, '11111111-1111-1111-1111-111111111111', 1, 'Assignment 2', 92, 100, 15, '2025-03-01', NOW(), NOW()),
(3, '11111111-1111-1111-1111-111111111111', 1, 'Midterm Exam', 78, 100, 30, '2025-03-15', NOW(), NOW()),
(4, '11111111-1111-1111-1111-111111111111', 1, 'Final Project', 88, 100, 25, '2025-04-20', NOW(), NOW()),

-- Daniel Darsamo grades for MATH201
(5, '11111111-1111-1111-1111-111111111111', 10, 'Quiz 1', 95, 100, 10, '2025-02-10', NOW(), NOW()),
(6, '11111111-1111-1111-1111-111111111111', 10, 'Quiz 2', 88, 100, 10, '2025-02-25', NOW(), NOW()),
(7, '11111111-1111-1111-1111-111111111111', 10, 'Midterm Exam', 82, 100, 35, '2025-03-15', NOW(), NOW()),
(8, '11111111-1111-1111-1111-111111111111', 10, 'Assignment 1', 90, 100, 20, '2025-04-01', NOW(), NOW()),

-- Ana Costa grades for CS101
(9, '22222222-2222-2222-2222-222222222222', 1, 'Assignment 1', 90, 100, 15, '2025-02-15', NOW(), NOW()),
(10, '22222222-2222-2222-2222-222222222222', 1, 'Assignment 2', 88, 100, 15, '2025-03-01', NOW(), NOW()),
(11, '22222222-2222-2222-2222-222222222222', 1, 'Midterm Exam', 85, 100, 30, '2025-03-15', NOW(), NOW()),
(12, '22222222-2222-2222-2222-222222222222', 1, 'Final Project', 92, 100, 25, '2025-04-20', NOW(), NOW());

-- Insert sample financial records
INSERT INTO financial_records (id, student_id, transaction_type, amount, currency, description, due_date, payment_date, status, created_at, updated_at) VALUES
-- Daniel Darsamo financial records
(1, '11111111-1111-1111-1111-111111111111', 'tuition', 31250.00, 'MZN', 'Spring 2025 Tuition Fee', '2025-02-01', '2025-01-25', 'paid', NOW(), NOW()),
(2, '11111111-1111-1111-1111-111111111111', 'payment', -23190.00, 'MZN', 'Partial Payment - Spring 2025', '2025-02-01', '2025-01-25', 'completed', NOW(), NOW()),

-- Ana Costa financial records
(3, '22222222-2222-2222-2222-222222222222', 'tuition', 31250.00, 'MZN', 'Spring 2025 Tuition Fee', '2025-02-01', NULL, 'pending', NOW(), NOW()),
(4, '22222222-2222-2222-2222-222222222222', 'payment', -15625.00, 'MZN', 'Partial Payment - Spring 2025', '2025-02-01', '2025-01-20', 'completed', NOW(), NOW()),

-- Carlos Mendes financial records
(5, '33333333-3333-3333-3333-333333333333', 'tuition', 31250.00, 'MZN', 'Spring 2025 Tuition Fee', '2025-02-01', NULL, 'overdue', NOW(), NOW()),
(6, '33333333-3333-3333-3333-333333333333', 'payment', -5670.00, 'MZN', 'Partial Payment - Spring 2025', '2025-02-01', '2025-01-15', 'completed', NOW(), NOW()),

-- Isabel Rodrigues financial records
(7, '44444444-4444-4444-4444-444444444444', 'tuition', 31250.00, 'MZN', 'Spring 2025 Tuition Fee', '2025-02-01', '2025-01-30', 'paid', NOW(), NOW()),
(8, '44444444-4444-4444-4444-444444444444', 'payment', -31250.00, 'MZN', 'Full Payment - Spring 2025', '2025-02-01', '2025-01-30', 'completed', NOW(), NOW()),

-- António Pereira financial records
(9, '55555555-5555-5555-5555-555555555555', 'tuition', 31250.00, 'MZN', 'Spring 2025 Tuition Fee', '2025-02-01', NULL, 'pending', NOW(), NOW()),
(10, '55555555-5555-5555-5555-555555555555', 'payment', -20000.00, 'MZN', 'Partial Payment - Spring 2025', '2025-02-01', '2025-01-28', 'completed', NOW(), NOW());

-- Insert sample announcements
INSERT INTO announcements (id, title, content, priority, author, target_audience, faculty, created_by, created_at, updated_at) VALUES
(1, 'Important update on final exam schedule', 'The final exam schedule has been updated. Please check your student portal for the latest information and make note of any changes to your exam dates and times.', 'high', 'Academic Affairs', 'students', NULL, '66666666-6666-6666-6666-666666666666', NOW() - INTERVAL '1 hour', NOW()),
(2, 'Library hours extended for exam week', 'The library will be open 24/7 during exam week (March 15-22) to support student studies. Additional study spaces have been made available.', 'medium', 'Library Services', 'students', NULL, '77777777-7777-7777-7777-777777777777', NOW() - INTERVAL '3 hours', NOW()),
(3, 'New course registration opens next week', 'Course registration for the Fall 2025 semester will open on Monday, March 10th at 8:00 AM. Prepare your course selections in advance.', 'medium', 'Registrar Office', 'students', NULL, '88888888-8888-8888-8888-888888888888', NOW() - INTERVAL '1 day', NOW()),
(4, 'Campus maintenance scheduled', 'Scheduled maintenance will occur in Building A this weekend. Some areas may be temporarily inaccessible.', 'low', 'Facilities Management', 'all', NULL, '66666666-6666-6666-6666-666666666666', NOW() - INTERVAL '2 days', NOW()),
(5, 'Student health services update', 'The student health center has extended hours during exam period. Mental health counseling is also available.', 'medium', 'Health Services', 'students', NULL, '77777777-7777-7777-7777-777777777777', NOW() - INTERVAL '3 days', NOW()),
(6, 'Computer Science Department Meeting', 'All Computer Science students are invited to attend the department meeting on Friday at 2 PM in Room A-301.', 'medium', 'CS Department', 'students', 'Computer Science', '66666666-6666-6666-6666-666666666666', NOW() - INTERVAL '1 day', NOW()),
(7, 'Business Management Workshop', 'Join us for a professional development workshop on entrepreneurship this Thursday at 3 PM.', 'medium', 'BM Department', 'students', 'Business Management', '77777777-7777-7777-7777-777777777777', NOW() - INTERVAL '2 days', NOW()),
(8, 'Accounting Career Fair', 'Meet with potential employers at our annual Accounting Career Fair next Tuesday from 10 AM to 4 PM.', 'high', 'AC Department', 'students', 'Accounting', '88888888-8888-8888-8888-888888888888', NOW() - INTERVAL '1 day', NOW());
