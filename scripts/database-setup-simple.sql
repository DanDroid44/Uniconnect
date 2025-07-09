-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'lecturer', 'coordinator');
CREATE TYPE faculty_type AS ENUM ('computer-science', 'business-management', 'accounting');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'overdue');
CREATE TYPE announcement_priority AS ENUM ('low', 'medium', 'high');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    role user_role NOT NULL,
    faculty faculty_type,
    student_id TEXT UNIQUE,
    phone TEXT,
    address TEXT,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table
CREATE TABLE public.courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    credits INTEGER NOT NULL DEFAULT 3,
    faculty faculty_type NOT NULL,
    semester INTEGER NOT NULL CHECK (semester IN (1, 2)),
    year INTEGER NOT NULL,
    coordinator_id UUID REFERENCES public.profiles(id),
    lecturer_id UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student enrollments
CREATE TABLE public.enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'active',
    UNIQUE(student_id, course_id)
);

-- Assessments table
CREATE TABLE public.assessments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('test1', 'test2', 'assignment1', 'assignment2', 'exam')),
    score DECIMAL(5,2),
    max_score DECIMAL(5,2) NOT NULL DEFAULT 100,
    weight DECIMAL(3,2) NOT NULL,
    date_assigned DATE DEFAULT CURRENT_DATE,
    due_date DATE,
    submitted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financial records
CREATE TABLE public.financial_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('tuition', 'subject_fee', 'other')),
    description TEXT,
    due_date DATE NOT NULL,
    payment_date DATE,
    status payment_status DEFAULT 'pending',
    academic_year INTEGER NOT NULL,
    semester INTEGER NOT NULL CHECK (semester IN (1, 2)),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements
CREATE TABLE public.announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    priority announcement_priority DEFAULT 'medium',
    author_id UUID REFERENCES public.profiles(id),
    target_role user_role,
    target_faculty faculty_type,
    target_course_id UUID REFERENCES public.courses(id),
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Class schedules
CREATE TABLE public.class_schedules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room TEXT,
    building TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
