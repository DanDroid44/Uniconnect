export type Language = "en" | "pt"

export const translations = {
  en: {
    // Landing Page
    welcome: "Welcome to",
    tagline: "Your University Management Platform",
    description:
      "Your comprehensive university management platform for Saint Thomas University of Mozambique. Manage academics, finances, and communication all in one place.",
    createAccount: "Create Account",
    signIn: "Sign In",
    getStarted: "Get Started",

    // Features
    academicManagement: "Academic Management",
    academicDescription: "Track courses, grades, assignments, and academic progress",
    financialTracking: "Financial Tracking",
    financialDescription: "Manage tuition payments, fees, and financial records",
    communication: "Communication",
    communicationDescription: "Stay connected with announcements and messaging",
    multiRole: "Multi-Role Support",
    multiRoleDescription: "Students, lecturers, and coordinators all in one platform",

    // University
    universityName: "Saint Thomas University of Mozambique",
    universityDescription:
      "Supporting three faculties: Computer Science, Business Management, and Accounting. Built specifically for the Mozambican academic system with local payment integration.",

    // Auth Forms
    fullName: "Full Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    role: "Role",
    faculty: "Faculty",
    student: "Student",
    lecturer: "Faculty",
    coordinator: "Administrative Staff",
    computerScience: "Computer Science",
    businessManagement: "Business Management",
    accounting: "Accounting",

    // Login
    signInTitle: "Sign In",
    signInDescription: "Enter your credentials to access your account",
    forgotPassword: "Forgot password?",
    signingIn: "Signing in...",
    dontHaveAccount: "Don't have an account?",

    // Register
    createAccountTitle: "Create Account",
    registerDescription: "Register for UniConnect to get started",
    selectRole: "Select your role",
    selectFaculty: "Select your faculty",
    creatingAccount: "Creating Account...",
    alreadyHaveAccount: "Already have an account?",

    // Validation
    nameRequired: "Full name is required",
    nameInvalid: "Name can only contain letters and spaces",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    passwordRequired: "Password is required",
    passwordTooShort: "Password must be at least 6 characters",
    passwordMismatch: "Passwords do not match",
    roleRequired: "Please select your role",
    facultyRequired: "Please select your faculty",

    // Messages
    loginSuccess: "Logged in successfully!",
    registerSuccess: "Account created successfully! Please check your email for verification.",
    error: "Error",
    success: "Success",
    unexpectedError: "An unexpected error occurred",

    // Dashboard
    welcomeBack: "Welcome back",
    academicActivities: "Here's what's happening with your academic activities today.",
    upcomingClasses: "Upcoming Classes",
    assignmentsDue: "Assignments Due",
    newAnnouncements: "New Announcements",
    balanceDue: "Balance Due",
    nextClass: "Next class in",
    nextDue: "Next due in",
    highPriority: "high priority",
    dueIn: "Due in",
    days: "days",

    // Common
    showPassword: "Show password",
    hidePassword: "Hide password",
    language: "Language",
    english: "English",
    portuguese: "Portuguese",
  },
  pt: {
    // Landing Page
    welcome: "Bem-vindo ao",
    tagline: "Sua Plataforma de Gestão Universitária",
    description:
      "Sua plataforma abrangente de gestão universitária para a Universidade São Tomás de Moçambique. Gerencie acadêmicos, finanças e comunicação tudo em um lugar.",
    createAccount: "Criar Conta",
    signIn: "Entrar",
    getStarted: "Começar",

    // Features
    academicManagement: "Gestão Acadêmica",
    academicDescription: "Acompanhe cursos, notas, tarefas e progresso acadêmico",
    financialTracking: "Controle Financeiro",
    financialDescription: "Gerencie pagamentos de propinas, taxas e registros financeiros",
    communication: "Comunicação",
    communicationDescription: "Mantenha-se conectado com anúncios e mensagens",
    multiRole: "Suporte Multi-Função",
    multiRoleDescription: "Estudantes, professores e coordenadores numa só plataforma",

    // University
    universityName: "Universidade São Tomás de Moçambique",
    universityDescription:
      "Apoiando três faculdades: Ciências da Computação, Gestão de Negócios e Contabilidade. Construído especificamente para o sistema acadêmico moçambicano com integração de pagamento local.",

    // Auth Forms
    fullName: "Nome Completo",
    email: "Email",
    password: "Senha",
    confirmPassword: "Confirmar Senha",
    role: "Função",
    faculty: "Faculdade",
    student: "Estudante",
    lecturer: "Professor",
    coordinator: "Pessoal Administrativo",
    computerScience: "Ciências da Computação",
    businessManagement: "Gestão de Negócios",
    accounting: "Contabilidade",

    // Login
    signInTitle: "Entrar",
    signInDescription: "Digite suas credenciais para acessar sua conta",
    forgotPassword: "Esqueceu a senha?",
    signingIn: "Entrando...",
    dontHaveAccount: "Não tem uma conta?",

    // Register
    createAccountTitle: "Criar Conta",
    registerDescription: "Registre-se no UniConnect para começar",
    selectRole: "Selecione sua função",
    selectFaculty: "Selecione sua faculdade",
    creatingAccount: "Criando Conta...",
    alreadyHaveAccount: "Já tem uma conta?",

    // Validation
    nameRequired: "Nome completo é obrigatório",
    nameInvalid: "Nome pode conter apenas letras e espaços",
    emailRequired: "Email é obrigatório",
    emailInvalid: "Por favor, digite um endereço de email válido",
    passwordRequired: "Senha é obrigatória",
    passwordTooShort: "Senha deve ter pelo menos 6 caracteres",
    passwordMismatch: "Senhas não coincidem",
    roleRequired: "Por favor, selecione sua função",
    facultyRequired: "Por favor, selecione sua faculdade",

    // Messages
    loginSuccess: "Login realizado com sucesso!",
    registerSuccess: "Conta criada com sucesso! Verifique seu email para confirmação.",
    error: "Erro",
    success: "Sucesso",
    unexpectedError: "Ocorreu um erro inesperado",

    // Dashboard
    welcomeBack: "Bem-vindo de volta",
    academicActivities: "Aqui está o que está acontecendo com suas atividades acadêmicas hoje.",
    upcomingClasses: "Próximas Aulas",
    assignmentsDue: "Tarefas Pendentes",
    newAnnouncements: "Novos Anúncios",
    balanceDue: "Saldo Devedor",
    nextClass: "Próxima aula em",
    nextDue: "Próximo vencimento em",
    highPriority: "alta prioridade",
    dueIn: "Vence em",
    days: "dias",

    // Common
    showPassword: "Mostrar senha",
    hidePassword: "Ocultar senha",
    language: "Idioma",
    english: "Inglês",
    portuguese: "Português",
  },
}

export function getTranslation(key: string, lang: Language): string {
  const keys = key.split(".")
  let value: any = translations[lang]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
