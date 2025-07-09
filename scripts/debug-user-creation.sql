-- Debug script for user creation issues
-- Run this to check the status of user registration and profile creation

-- Check if the profiles table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'profiles'
) as profiles_table_exists;

-- Check if the trigger function exists
SELECT EXISTS (
  SELECT FROM information_schema.routines 
  WHERE routine_schema = 'public' 
  AND routine_name = 'handle_new_user'
) as trigger_function_exists;

-- Check if the trigger exists
SELECT EXISTS (
  SELECT FROM information_schema.triggers 
  WHERE trigger_name = 'on_auth_user_created'
) as trigger_exists;

-- Check recent users and their profiles
SELECT 
  u.id,
  u.email,
  u.created_at as user_created,
  p.id as profile_id,
  p.full_name,
  p.role,
  p.created_at as profile_created
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC
LIMIT 10;

-- Check for any orphaned users (users without profiles)
SELECT 
  u.id,
  u.email,
  u.created_at
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- Check for any orphaned profiles (profiles without users)
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.created_at
FROM public.profiles p
LEFT JOIN auth.users u ON p.id = u.id
WHERE u.id IS NULL;

-- Test the handle_new_user function manually
-- (This is just for testing - don't run in production)
/*
DO $$
DECLARE
  test_user_id UUID := gen_random_uuid();
BEGIN
  -- Simulate a new user insertion
  INSERT INTO auth.users (id, email, raw_user_meta_data, created_at, updated_at)
  VALUES (
    test_user_id,
    'test@example.com',
    '{"full_name": "Test User", "role": "student"}'::jsonb,
    NOW(),
    NOW()
  );
  
  -- Check if profile was created
  IF EXISTS (SELECT 1 FROM public.profiles WHERE id = test_user_id) THEN
    RAISE NOTICE 'Profile creation successful for test user';
  ELSE
    RAISE NOTICE 'Profile creation failed for test user';
  END IF;
  
  -- Clean up
  DELETE FROM auth.users WHERE id = test_user_id;
  DELETE FROM public.profiles WHERE id = test_user_id;
END $$;
*/
