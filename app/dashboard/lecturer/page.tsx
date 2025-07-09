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
import { Clock, BookOpen, Users, AlertCircle, TrendingUp, Calendar, FileText, Bell, Target } from "lucide-react"
import type { User } from "@supabase/supabase-js"

interface LecturerStats {
  todayClasses: number
  gradingBacklog: number
  studentAlerts: number
  coursePerformance: number
  attendanceRate: number
  assignmentCompletion: number
}

interface TodayClass {
  time: string
  course: string
  room: string
  students: number
  type: string
}

export default function LecturerDashboard() {
  const { t } = useLanguage()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<LecturerStats>({
    todayClasses: 0,
    gradingBacklog: 0,
    studentAlerts: 0,
    coursePerformance: 0,
    attendanceRate: 0,
    assignmentCompletion: 0,
  })
  const [todayClasses, setTodayClasses] = useState<TodayClass[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)
        // Simulate loading lecturer stats
        setStats({
          todayClasses: 3,
          gradingBacklog: 12,
          studentAlerts: 5,
          coursePerformance: 85.7,
          attendanceRate: 89.2,
          assignmentCompletion: 78.5,
        })

        setTodayClasses([
          { time: "08:00", course: "Matemática I", room: "Sala 101", students: 45, type: "Aula Teórica" },
          { time: "10:00", course: "Cálculo II", room: "Sala 203", students: 32, type: "Exercícios" },
          { time: "14:00", course: "Estatística", room: "Lab 105", students: 28, type: "Prática" },
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("lecturerDashboard")}</h1>
          <p className="text-gray-600">
            {t("welcomeBack")}, Prof. {user?.user_metadata?.full_name || user?.email}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SemesterBadge mode="compact" />
          <Badge variant="lecturer" className="px-3 py-1">
            {t("lecturer")}
          </Badge>
        </div>
      </div>

      {/* KPI Cards - Blue theme for lecturers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">{t("todayClasses")}</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-blue-700">{stats.todayClasses}</div>
            <p className="text-xs text-blue-600 mt-1">Próxima às 08:00</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">{t("gradingBacklog")}</CardTitle>
              <FileText className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-orange-700">{stats.gradingBacklog}</div>
            <p className="text-xs text-gray-500 mt-1">3 em atraso</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">{t("studentAlerts")}</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-red-700">{stats.studentAlerts}</div>
            <p className="text-xs text-gray-500 mt-1">Requer atenção</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Desempenho Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-green-700">{stats.coursePerformance}%</div>
            <p className="text-xs text-gray-500 mt-1">+2.3% vs mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-10">
          <TabsTrigger value="today" className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">{t("today")}</span>
          </TabsTrigger>
          <TabsTrigger value="grading" className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Correções</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2 text-sm">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alertas</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Desempenho</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Aulas de Hoje
              </CardTitle>
              <CardDescription>
                Sua agenda para{" "}
                {new Date().toLocaleDateString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayClasses.map((classItem, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-700">{classItem.time}</div>
                        <div className="text-xs text-gray-500">{classItem.type}</div>
                      </div>
                      <div>
                        <h4 className="font-medium">{classItem.course}</h4>
                        <p className="text-sm text-gray-600">
                          {classItem.room} • {classItem.students} estudantes
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="lecturer-outline">
                        {t("details")}
                      </Button>
                      <Button size="sm" variant="lecturer">
                        Iniciar Aula
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesso rápido às funcionalidades mais utilizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Button variant="lecturer-outline" className="h-16 flex-col gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-xs">Lista de Presença</span>
                </Button>
                <Button variant="lecturer-outline" className="h-16 flex-col gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="text-xs">Material de Aula</span>
                </Button>
                <Button variant="lecturer-outline" className="h-16 flex-col gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs">Plano de Ensino</span>
                </Button>
                <Button variant="lecturer-outline" className="h-16 flex-col gap-2">
                  <Bell className="w-5 h-5" />
                  <span className="text-xs">Avisos</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grading" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Fila de Correções
              </CardTitle>
              <CardDescription>Trabalhos e provas aguardando correção, organizados por prioridade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    assignment: "Prova Final - Matemática I",
                    course: "MAT101",
                    students: 45,
                    deadline: "Amanhã",
                    priority: "high",
                    type: "Prova",
                  },
                  {
                    assignment: "Trabal ho de Pesquisa - Cálculo II",
                    course: "MAT201",
                    students: 32,
                    deadline: "3 dias",
                    priority: "medium",
                    type: "Trabalho",
                  },
                  {
                    assignment: "Exercícios - Estatística",
                    course: "EST101",
                    students: 28,
                    deadline: "1 semana",
                    priority: "low",
                    type: "Exercícios",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.priority === "high"
                            ? "bg-red-500"
                            : item.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div>
                        <h4 className="font-medium">{item.assignment}</h4>
                        <p className="text-sm text-gray-600">
                          {item.course} • {item.students} estudantes • Prazo: {item.deadline}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={item.priority === "high" ? "high" : item.priority === "medium" ? "medium" : "low"}
                      >
                        {item.priority === "high" ? t("urgent") : item.priority === "medium" ? t("medium") : t("low")}
                      </Badge>
                      <Button size="sm" variant="lecturer">
                        Corrigir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Alertas de Estudantes
              </CardTitle>
              <CardDescription>Estudantes que requerem atenção especial</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    student: "João Silva",
                    course: "Matemática I",
                    issue: "Baixa frequência (65%)",
                    severity: "high",
                    lastSeen: "3 dias atrás",
                  },
                  {
                    student: "Maria Santos",
                    course: "Cálculo II",
                    issue: "Notas abaixo da média",
                    severity: "medium",
                    lastSeen: "Ontem",
                  },
                  {
                    student: "Pedro Costa",
                    course: "Estatística",
                    issue: "Não entregou 2 trabalhos",
                    severity: "high",
                    lastSeen: "1 semana atrás",
                  },
                ].map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <AlertCircle
                        className={`h-5 w-5 ${alert.severity === "high" ? "text-red-500" : "text-yellow-500"}`}
                      />
                      <div>
                        <h4 className="font-medium">{alert.student}</h4>
                        <p className="text-sm text-gray-600">
                          {alert.course} • {alert.issue}
                        </p>
                        <p className="text-xs text-gray-500">Última atividade: {alert.lastSeen}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={alert.severity === "high" ? "high" : "medium"}>
                        {alert.severity === "high" ? "Urgente" : "Atenção"}
                      </Badge>
                      <Button size="sm" variant="lecturer">
                        {t("contact")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Course Statistics */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>{t("courseStats")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{t("attendanceRate")}</span>
                    <span className="font-medium">{stats.attendanceRate}%</span>
                  </div>
                  <Progress value={stats.attendanceRate} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Taxa de Aprovação</span>
                    <span className="font-medium">{stats.assignmentCompletion}%</span>
                  </div>
                  <Progress value={stats.assignmentCompletion} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Desempenho Geral</span>
                    <span className="font-medium">{stats.coursePerformance}%</span>
                  </div>
                  <Progress value={stats.coursePerformance} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Course Performance by Subject */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Desempenho por Disciplina</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { course: "Matemática I", average: 14.2, students: 45, trend: "up" },
                    { course: "Cálculo II", average: 13.8, students: 32, trend: "stable" },
                    { course: "Estatística", average: 15.1, students: 28, trend: "up" },
                  ].map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm">{course.course}</h4>
                        <p className="text-xs text-gray-600">{course.students} estudantes</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-blue-700">{course.average}/20</div>
                        <div
                          className={`text-xs ${
                            course.trend === "up"
                              ? "text-green-600"
                              : course.trend === "down"
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          {course.trend === "up"
                            ? "↗ Melhorando"
                            : course.trend === "down"
                              ? "↘ Declinando"
                              : "→ Estável"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
