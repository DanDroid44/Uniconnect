import { z } from "zod"

// User registration schema
export const registerSchema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    fullName: z.string().min(2, "Nome completo é obrigatório"),
    role: z.enum(["student", "lecturer", "coordinator"], {
      required_error: "Selecione uma função",
    }),
    faculty: z.string().min(1, "Selecione uma faculdade"),
    terms: z.boolean().refine((val) => val === true, {
      message: "Você deve aceitar os termos e condições",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

// User login schema
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
})

// Profile update schema
export const profileSchema = z.object({
  fullName: z.string().min(2, "Nome completo é obrigatório"),
  phone: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  nationality: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  bio: z.string().optional(),
  // Student-specific fields
  academicYear: z.number().min(1).max(4).optional(),
  // Faculty-specific fields
  officeHours: z.string().optional(),
  researchInterests: z.array(z.string()).optional(),
})

// Course creation schema
export const courseSchema = z.object({
  name: z.string().min(2, "Nome do curso é obrigatório"),
  code: z.string().min(2, "Código do curso é obrigatório"),
  description: z.string().optional(),
  credits: z.number().min(1).max(12, "Créditos devem estar entre 1 e 12"),
  semester: z.number().min(1).max(8, "Semestre deve estar entre 1 e 8"),
  prerequisites: z.array(z.string()).optional(),
})

// Grade entry schema
export const gradeSchema = z.object({
  studentId: z.string().uuid("ID do estudante inválido"),
  courseId: z.string().uuid("ID do curso inválido"),
  assessmentType: z.enum(["test", "exam", "assignment", "project"], {
    required_error: "Tipo de avaliação é obrigatório",
  }),
  assessmentName: z.string().min(1, "Nome da avaliação é obrigatório"),
  grade: z.number().min(0).max(20, "Nota deve estar entre 0 e 20"),
  maxGrade: z.number().min(1).max(20).default(20),
  weight: z.number().min(0).max(1).default(1),
  assessmentDate: z.string().optional(),
  comments: z.string().optional(),
})

// Notification schema
export const notificationSchema = z.object({
  recipientId: z.string().uuid("ID do destinatário inválido"),
  title: z.string().min(1, "Título é obrigatório"),
  message: z.string().min(1, "Mensagem é obrigatória"),
  type: z.enum(["grade", "assignment", "announcement", "system"]).default("general"),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  relatedCourseId: z.string().uuid().optional(),
})

export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type ProfileFormData = z.infer<typeof profileSchema>
export type CourseFormData = z.infer<typeof courseSchema>
export type GradeFormData = z.infer<typeof gradeSchema>
export type NotificationFormData = z.infer<typeof notificationSchema>
