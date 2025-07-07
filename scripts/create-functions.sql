-- Functions and triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate final grade
CREATE OR REPLACE FUNCTION calculate_final_grade(p_student_id UUID, p_course_id UUID)
RETURNS DECIMAL(5,2) AS $$
DECLARE
    final_grade DECIMAL(5,2) := 0;
    assessment_record RECORD;
BEGIN
    FOR assessment_record IN 
        SELECT type, score, max_score, weight 
        FROM public.assessments 
        WHERE student_id = p_student_id AND course_id = p_course_id AND score IS NOT NULL
    LOOP
        final_grade := final_grade + (assessment_record.score / assessment_record.max_score * assessment_record.weight * 100);
    END LOOP;
    
    RETURN final_grade;
END;
$$ LANGUAGE plpgsql;

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role, faculty)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Unknown User'),
        COALESCE(NEW.raw_user_meta_data->>'role', 'student')::user_role,
        CASE 
            WHEN NEW.raw_user_meta_data->>'faculty' IS NOT NULL 
            THEN (NEW.raw_user_meta_data->>'faculty')::faculty_type
            ELSE NULL
        END
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile when user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
