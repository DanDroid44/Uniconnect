"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { SemesterBadge } from "@/components/ui/semester-badge"
import { useLanguage } from "@/hooks/use-language"
import {
  BookOpen,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Target,
  Award,
  CheckCircle,
  Star,
  Activity,
  GraduationCap,
} from "lucide-react"
import type { User } from "@supabase/supabase-js"

interface StudentStats {
  currentGPA: number
  creditsCompleted: number
  totalCredits: number
  semesterProgress: number
  upcomingDeadlines: number
  groupActivities: number
}

interface Assignment {
  title: string
  course: string
  dueDate: string
  priority: "high" | "medium" | "low"
  completed: boolean
}

export default function StudentDashboard() {
  const { t } = useLanguage()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<StudentStats>({
    currentGPA: 0,
    creditsCompleted: 0,
    totalCredits: 0,
    semesterProgress: 0,
    upcomingDeadlines: 0,
    groupActivities: 0,
  })
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)
        // Simulate loading student stats
        setStats({
          currentGPA: 15.8,
          creditsCompleted: 120,
          totalCredits: 180,
          semesterProgress: 67,
          upcomingDeadlines: 4,
          groupActivities: 3,
        })

        setAssignments([
          { title: "Relatório de Física", course: "FIS101", dueDate: "Amanhã", priority: "high", completed: false },
          { title: "Exercícios de Cálculo", course: "MAT201", dueDate: "3 dias", priority: "medium", completed: false },
          {
            title: "Projeto de Programação",
            course: "INF101",
            dueDate: "1 semana",
            priority: "medium",
            completed: false,
          },
          { title: "Ensaio de História", course: "HIS101", dueDate: "2 semanas", priority: "low", completed: true },
        ])
      }
      setLoading(false)
    }

    loadDashboard()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="text-gray-600 font-medium">{t("loading")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("studentDashboard")}</h1>
          <p className="text-gray-600">
            {t("welcomeBack")}, {user?.user_metadata?.full_name || user?.email}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SemesterBadge mode="compact" />
          <Badge variant="student" className="px-3 py-1">
            {t("student")}
          </Badge>
        </div>
      </div>

      {/* KPI Cards - Green theme for students */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">{t("currentGPA")}</CardTitle>
              <Star className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-green-700">{stats.currentGPA}/20</div>
            <p className="text-xs text-green-600 mt-1">+0.3 este semestre</p>
            <Progress value={(stats.currentGPA / 20) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">{t("creditsCompleted")}</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-blue-700">
              {stats.creditsCompleted}/{stats.totalCredits}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round((stats.creditsCompleted / stats.totalCredits) * 100)}% concluído
            </p>
            <Progress value={(stats.creditsCompleted / stats.totalCredits) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">{t("upcomingDeadlines")}</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-orange-700">{stats.upcomingDeadlines}</div>
            <p className="text-xs text-gray-500 mt-1">1 urgente</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">{t("groupActivities")}</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-purple-700">{stats.groupActivities}</div>
            <p className="text-xs text-gray-500 mt-1">2 projetos em andamento</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-10">
          <TabsTrigger value="progress" className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Progresso</span>
          </TabsTrigger>
          <TabsTrigger value="deadlines" className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Prazos</span>
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Grupos</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2 text-sm">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Conquistas</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Academic Progress */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  {t("academicProgress")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progresso do Semestre</span>
                    <span className="font-medium">{stats.semesterProgress}%</span>
                  </div>
                  <Progress value={stats.semesterProgress} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Créditos Concluídos</span>
                    <span className="font-medium">
                      {Math.round((stats.creditsCompleted / stats.totalCredits) * 100)}%
                    </span>
                  </div>
                  <Progress value={(stats.creditsCompleted / stats.totalCredits) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Desempenho Geral</span>
                    <span className="font-medium">{Math.round((stats.currentGPA / 20) * 100)}%</span>
                  </div>
                  <Progress value={(stats.currentGPA / 20) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Grades */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>{t("recentGrades")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { course: "Matemática I", grade: 16.5, date: "Ontem" },
                    { course: "Física II", grade: 14.8, date: "3 dias atrás" },
                    { course: "Programação", grade: 17.2, date: "1 semana atrás" },
                    { course: "História", grade: 15.0, date: "2 semanas atrás" },
                  ].map((grade, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <h4 className="font-medium text-sm">{grade.course}</h4>
                        <p className="text-xs text-gray-600">{grade.date}</p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-bold text-lg ${
                            grade.grade >= 16
                              ? "text-green-600"
                              : grade.grade >= 14
                                ? "text-blue-600"
                                : grade.grade >= 10
                                  ? "text-yellow-600"
                                  : "text-red-600"
                          }`}
                        >
                          {grade.grade}/20
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Performance */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>{t("coursePerformance")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { course: "Matemática I", average: 16.2, attendance: 95, status: "excellent" },
                  { course: "Física II", average: 14.8, attendance: 88, status: "good" },
                  { course: "Programação", average: 17.5, attendance: 92, status: "excellent" },
                  { course: "História", average: 13.2, attendance: 85, status: "warning" },
                  { course: "Inglês", average: 15.8, attendance: 90, status: "good" },
                  { course: "Estatística", average: 12.5, attendance: 78, status: "attention" },
                ].map((course, index) => (
                  <Card key={index} className="relative">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{course.course}</CardTitle>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            course.status === "excellent"
                              ? "bg-green-500"
                              : course.status === "good"
                                ? "bg-blue-500"
                                : course.status === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                          }`}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Média</span>
                          <span className="font-medium">{course.average}/20</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Frequência</span>
                          <span className="font-medium">{course.attendance}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Ações Rápidas
              </CardTitle>
              <CardDescription>Acesso rápido às funcionalidades mais utilizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Button variant="student-outline" className="h-16 flex-col gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs">Ver Notas</span>
                </Button>
                <Button variant="student-outline" className="h-16 flex-col gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-xs">Horários</span>
                </Button>
                <Button variant="student-outline" className="h-16 flex-col gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-xs">Grupos</span>
                </Button>
                <Button variant="student-outline" className="h-16 flex-col gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-xs">Materiais</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                {t("deadlineTracker")}
              </CardTitle>
              <CardDescription>Acompanhe seus trabalhos e projetos organizados por prioridade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                      assignment.completed ? "bg-green-50 border-green-200" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {assignment.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div
                          className={`w-3 h-3 rounded-full ${
                            assignment.priority === "high"
                              ? "bg-red-500"
                              : assignment.priority === "medium"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                      )}
                      <div>
                        <h4 className={`font-medium ${assignment.completed ? "line-through text-gray-500" : ""}`}>
                          {assignment.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {assignment.course} • Prazo: {assignment.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          assignment.completed
                            ? "success"
                            : assignment.priority === "high"
                              ? "high"
                              : assignment.priority === "medium"
                                ? "medium"
                                : "low"
                        }
                      >
                        {assignment.completed
                          ? "Concluído"
                          : assignment.priority === "high"
                            ? t("urgent")
                            : assignment.priority === "medium"
                              ? t("medium")
                              : t("low")}
                      </Badge>
                      {!assignment.completed && (
                        <Button size="sm" variant="student">
                          Marcar Concluído
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                {t("groupActivities")}
              </CardTitle>
              <CardDescription>Seus grupos de estudo e projetos colaborativos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Projeto Final - Engenharia",
                    members: 4,
                    progress: 75,
                    nextMeeting: "Amanhã 14:00",
                    status: "active",
                  },
                  {
                    name: "Grupo de Estudo - Matemática",
                    members: 6,
                    progress: 60,
                    nextMeeting: "Sexta 16:00",
                    status: "active",
                  },
                  {
                    name: "Trabalho de História",
                    members: 3,
                    progress: 90,
                    nextMeeting: "Concluído",
                    status: "completed",
                  },
                ].map((group, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{group.name}</h4>
                      <Badge variant={group.status === "completed" ? "success" : "student"}>
                        {group.status === "completed" ? "Concluído" : t("active")}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{group.members} membros</span>
                        <span>Próxima reunião: {group.nextMeeting}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{group.progress}%</span>
                      </div>
                      <Progress value={group.progress} className="h-2" />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="student-outline">
                        {t("details")}
                      </Button>
                      {group.status === "active" && (
                        <Button size="sm" variant="student">
                          Participar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                {t("achievements")}
              </CardTitle>
              <CardDescription>Seus marcos acadêmicos e reconhecimentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Excelência Acadêmica",
                    description: "Média acima de 16",
                    earned: true,
                    icon: "🏆",
                  },
                  {
                    title: "Participação Ativa",
                    description: "95% de frequência",
                    earned: true,
                    icon: "🎯",
                  },
                  {
                    title: "Trabalho em Equipe",
                    description: "3 projetos em grupo",
                    earned: true,
                    icon: "🤝",
                  },
                  {
                    title: "Pontualidade",
                    description: "Sem atrasos este semestre",
                    earned: false,
                    icon: "⏰",
                  },
                  {
                    title: "Inovação",
                    description: "Projeto criativo aprovado",
                    earned: false,
                    icon: "💡",
                  },
                  {
                    title: "Liderança",
                    description: "Liderar um grupo de estudo",
                    earned: false,
                    icon: "👑",
                  },
                ].map((achievement, index) => (
                  <Card
                    key={index}
                    className={`relative transition-colors ${
                      achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`text-3xl mb-2 ${achievement.earned ? "" : "grayscale opacity-50"}`}>
                        {achievement.icon}
                      </div>
                      <h4 className={`font-medium mb-1 ${achievement.earned ? "text-green-800" : "text-gray-600"}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs ${achievement.earned ? "text-green-600" : "text-gray-500"}`}>
                        {achievement.description}
                      </p>
                      {achievement.earned && (
                        <Badge variant="success" className="mt-2">
                          Conquistado
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
