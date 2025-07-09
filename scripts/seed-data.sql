-- Seed data for UniConnect platform
-- This script populates the database with sample data for testing

-- Insert sample faculties
INSERT INTO public.faculties (id, name, code, description, created_at) VALUES
  ('f1', 'Ciências da Computação', 'CC', 'Faculdade de Ciências da Computação', NOW()),
  ('f2', 'Gestão de Negócios', 'GN', 'Faculdade de Gestão de Negócios', NOW()),
  ('f3', 'Contabilidade', 'CONT', 'Faculdade de Contabilidade', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample departments
INSERT INTO public.departments (id, name, code, faculty_id, created_at) VALUES
  ('d1', 'Programação', 'PROG', 'f1', NOW()),
  ('d2', 'Sistemas de Informação', 'SI', 'f1', NOW()),
  ('d3', 'Marketing', 'MKT', 'f2', NOW()),
  ('d4', 'Finanças', 'FIN', 'f2', NOW()),
  ('d5', 'Auditoria', 'AUD', 'f3', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample courses
INSERT INTO public.courses (id, name, code, credits, department_id, semester, created_at) VALUES
  ('c1', 'Programação I', 'PROG101', 6, 'd1', 1, NOW()),
  ('c2', 'Cálculo II', 'CALC201', 6, 'd1', 2, NOW()),
  ('c3', 'Base de Dados', 'BD301', 8, 'd2', 3, NOW()),
  ('c4', 'Marketing Digital', 'MKT201', 6, 'd3', 2, NOW()),
  ('c5', 'Contabilidade Geral', 'CONT101', 6, 'd5', 1, NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample academic years
INSERT INTO public.academic_years (id, year, start_date, end_date, is_active, created_at) VALUES
  ('ay2024', '2024', '2024-02-01', '2024-11-30', true, NOW()),
  ('ay2023', '2023', '2023-02-01', '2023-11-30', false, NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample semesters
INSERT INTO public.semesters (id, name, academic_year_id, start_date, end_date, is_active, created_at) VALUES
  ('s1-2024', '1º Semestre', 'ay2024', '2024-02-01', '2024-06-30', false, NOW()),
  ('s2-2024', '2º Semestre', 'ay2024', '2024-08-01', '2024-11-30', true, NOW())
ON CONFLICT (id) DO NOTHING;

-- Note: User profiles will be created automatically via triggers when users register
-- Sample enrollments and grades would be added after users are created
