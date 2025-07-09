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
      "Supporting three faculties: Computer Science, Business Management, and Accounting. Built specifically for the Mozambican academic system.",

    // Auth Forms
    fullName: "Full Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    role: "Role",
    faculty: "Faculty",
    student: "Student",
    lecturer: "Lecturer",
    coordinator: "Coordinator",
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

    // Dashboard Common
    welcomeBack: "Welcome back",
    loading: "Loading...",
    dashboard: "Dashboard",
    overview: "Overview",
    settings: "Settings",
    profile: "Profile",
    logout: "Logout",

    // Student Dashboard
    studentDashboard: "Student Dashboard",
    academicProgress: "Academic Progress",
    currentGPA: "Current GPA",
    creditsCompleted: "Credits Completed",
    upcomingDeadlines: "Upcoming Deadlines",
    groupActivities: "Group Activities",
    recentGrades: "Recent Grades",
    coursePerformance: "Course Performance",
    deadlineTracker: "Deadline Tracker",
    achievements: "Achievements",

    // Lecturer Dashboard
    lecturerDashboard: "Lecturer Dashboard",
    todayClasses: "Today's Classes",
    gradingBacklog: "Grading Backlog",
    studentAlerts: "Student Alerts",
    courseStats: "Course Statistics",
    attendanceRate: "Attendance Rate",
    averageGrade: "Average Grade",

    // Coordinator Dashboard
    coordinatorDashboard: "Coordinator Dashboard",
    facultyStats: "Faculty Statistics",
    schedulingTools: "Scheduling Tools",
    bulkAnnouncements: "Bulk Announcements",
    pendingApprovals: "Pending Approvals",
    totalLecturers: "Total Lecturers",
    activeCourses: "Active Courses",
    totalStudents: "Total Students",

    // Common Actions
    view: "View",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
    approve: "Approve",
    reject: "Reject",
    contact: "Contact",
    details: "Details",
    continue: "Continue",
    complete: "Complete",
    start: "Start",
    finish: "Finish",

    // Time and Dates
    today: "Today",
    tomorrow: "Tomorrow",
    yesterday: "Yesterday",
    thisWeek: "This Week",
    nextWeek: "Next Week",
    thisMonth: "This Month",
    nextMonth: "Next Month",
    daysAgo: "days ago",
    hoursAgo: "hours ago",
    minutesAgo: "minutes ago",

    // Status
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    completed: "Completed",
    inProgress: "In Progress",
    cancelled: "Cancelled",
    approved: "Approved",
    rejected: "Rejected",
    urgent: "Urgent",
    high: "High",
    medium: "Medium",
    low: "Low",

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
    academicDescription: "Acompanhe disciplinas, notas, tarefas e progresso acadêmico",
    financialTracking: "Controle Financeiro",
    financialDescription: "Gerencie pagamentos de propinas, taxas e registros financeiros",
    communication: "Comunicação",
    communicationDescription: "Mantenha-se conectado com anúncios e mensagens",
    multiRole: "Suporte Multi-Função",
    multiRoleDescription: "Estudantes, professores e coordenadores numa só plataforma",

    // University
    universityName: "Universidade São Tomás de Moçambique",
    universityDescription:
      "Apoiando três faculdades: Ciências da Computação, Gestão de Negócios e Contabilidade. Construído especificamente para o sistema acadêmico moçambicano.",

    // Auth Forms
    fullName: "Nome Completo",
    email: "Email",
    password: "Senha",
    confirmPassword: "Confirmar Senha",
    role: "Função",
    faculty: "Faculdade",
    student: "Estudante",
    lecturer: "Professor",
    coordinator: "Coordenador",
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

    // Dashboard Common
    welcomeBack: "Bem-vindo de volta",
    loading: "Carregando...",
    dashboard: "Painel",
    overview: "Visão Geral",
    settings: "Configurações",
    profile: "Perfil",
    logout: "Sair",

    // Student Dashboard
    studentDashboard: "Painel do Estudante",
    academicProgress: "Progresso Acadêmico",
    currentGPA: "Média Atual",
    creditsCompleted: "Créditos Concluídos",
    upcomingDeadlines: "Prazos Próximos",
    groupActivities: "Atividades em Grupo",
    recentGrades: "Notas Recentes",
    coursePerformance: "Desempenho por Disciplina",
    deadlineTracker: "Rastreador de Prazos",
    achievements: "Conquistas",

    // Lecturer Dashboard
    lecturerDashboard: "Painel do Professor",
    todayClasses: "Aulas de Hoje",
    gradingBacklog: "Correções Pendentes",
    studentAlerts: "Alertas de Estudantes",
    courseStats: "Estatísticas do Curso",
    attendanceRate: "Taxa de Frequência",
    averageGrade: "Nota Média",

    // Coordinator Dashboard
    coordinatorDashboard: "Painel do Coordenador",
    facultyStats: "Estatísticas da Faculdade",
    schedulingTools: "Ferramentas de Agendamento",
    bulkAnnouncements: "Comunicados em Massa",
    pendingApprovals: "Aprovações Pendentes",
    totalLecturers: "Total de Professores",
    activeCourses: "Disciplinas Ativas",
    totalStudents: "Total de Estudantes",

    // Common Actions
    view: "Ver",
    edit: "Editar",
    delete: "Excluir",
    save: "Salvar",
    cancel: "Cancelar",
    submit: "Enviar",
    approve: "Aprovar",
    reject: "Rejeitar",
    contact: "Contactar",
    details: "Detalhes",
    continue: "Continuar",
    complete: "Concluir",
    start: "Iniciar",
    finish: "Finalizar",

    // Time and Dates
    today: "Hoje",
    tomorrow: "Amanhã",
    yesterday: "Ontem",
    thisWeek: "Esta Semana",
    nextWeek: "Próxima Semana",
    thisMonth: "Este Mês",
    nextMonth: "Próximo Mês",
    daysAgo: "dias atrás",
    hoursAgo: "horas atrás",
    minutesAgo: "minutos atrás",

    // Status
    active: "Ativo",
    inactive: "Inativo",
    pending: "Pendente",
    completed: "Concluído",
    inProgress: "Em Andamento",
    cancelled: "Cancelado",
    approved: "Aprovado",
    rejected: "Rejeitado",
    urgent: "Urgente",
    high: "Alta",
    medium: "Média",
    low: "Baixa",

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
