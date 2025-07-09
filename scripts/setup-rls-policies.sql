-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_schedules ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for courses
CREATE POLICY "Anyone can view courses" ON public.courses
    FOR SELECT USING (true);

-- RLS Policies for enrollments
CREATE POLICY "Students can view own enrollments" ON public.enrollments
    FOR SELECT USING (
        auth.uid() = student_id OR 
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('lecturer', 'coordinator')
        )
    );

CREATE POLICY "Students can insert own enrollments" ON public.enrollments
    FOR INSERT WITH CHECK (auth.uid() = student_id);

-- RLS Policies for assessments
CREATE POLICY "Students can view own assessments" ON public.assessments
    FOR SELECT USING (
        auth.uid() = student_id OR
        EXISTS (
            SELECT 1 FROM public.courses c
            JOIN public.profiles p ON p.id = auth.uid()
            WHERE c.id = course_id AND (c.lecturer_id = auth.uid() OR c.coordinator_id = auth.uid())
        )
    );

-- RLS Policies for financial records
CREATE POLICY "Students can view own financial records" ON public.financial_records
    FOR SELECT USING (
        auth.uid() = student_id OR
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'coordinator'
        )
    );

-- RLS Policies for announcements
CREATE POLICY "Users can view relevant announcements" ON public.announcements
    FOR SELECT USING (
        target_role IS NULL OR
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = target_role
        ) OR
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND faculty = target_faculty
        )
    );

-- RLS Policies for class schedules
CREATE POLICY "Users can view class schedules" ON public.class_schedules
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.enrollments e
            WHERE e.course_id = class_schedules.course_id AND e.student_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.courses c
            WHERE c.id = class_schedules.course_id AND (c.lecturer_id = auth.uid() OR c.coordinator_id = auth.uid())
        )
    );
