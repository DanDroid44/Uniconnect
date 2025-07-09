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
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Settings,
  Megaphone,
  FileCheck,
  Target,
} from "lucide-react"
import type { User } from "@supabase/supabase-js"

interface CoordinatorStats {
  totalLecturers: number
  activeCourses: number
  totalStudents: number
  pendingApprovals: number
  facultyPerformance: number
  semesterProgress: number
}

interface PendingApproval {
  type: string
  title: string
  requester: string
  date: string
  priority: "high" | "medium" | "low"
}

export default function CoordinatorDashboard() {
  const { t } = useLanguage()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<CoordinatorStats>({
    totalLecturers: 0,
    activeCourses: 0,
    totalStudents: 0,
    pendingApprovals: 0,
    facultyPerformance: 0,
    semesterProgress: 0,
  })
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)
        // Simulate loading coordinator stats
        setStats({
          totalLecturers: 24,
          activeCourses: 18,
          totalStudents: 456,
          pendingApprovals: 7,
          facultyPerformance: 87.3,
          semesterProgress: 72,
        })

        setPendingApprovals([
          {
            type: "Horário",
            title: "Alteração de horário - Matemática I",
            requester: "Prof. João Silva",
            date: "Hoje",
            priority: "high",
          },
          {
            type: "Disciplina",
            title: "Nova disciplina optativa",
            requester: "Prof. Maria Santos",
            date: "Ontem",
            priority: "medium",
          },
          {
            type: "Recurso",
            title: "Solicitação de laboratório",
            requester: "Prof. Pedro Costa",
            date: "2 dias atrás",
            priority: "low",
          },
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("coordinatorDashboard")}</h1>
          <p className="text-gray-600">
            {t("welcomeBack")}, Coord. {user?.user_metadata?.full_name || user?.email}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SemesterBadge mode="compact" />
          <Badge variant="coordinator" className="px-3 py-1">
            {t("coordinator")}
          </Badge>
        </div>
      </div>

      {/* KPI Cards - Violet theme for coordinators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">{t("totalLecturers")}</CardTitle>
              <Users className="h-4 w-4 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-violet-700">{stats.totalLecturers}</div>
            <p className="text-xs text-violet-600 mt-1">+2 este mês</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">{t("activeCourses")}</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-blue-700">{stats.activeCourses}</div>
            <p className="text-xs text-gray-500 mt-1">3 novas disciplinas</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">{t("totalStudents")}</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-green-700">{stats.totalStudents}</div>
            <p className="text-xs text-gray-500 mt-1">+15 novos alunos</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">{t("pendingApprovals")}</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-orange-700">{stats.pendingApprovals}</div>
            <p className="text-xs text-gray-500 mt-1">2 urgentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-10">
          <TabsTrigger value="overview" className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Visão Geral</span>
          </TabsTrigger>
          <TabsTrigger value="approvals" className="flex items-center gap-2 text-sm">
            <FileCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Aprovações</span>
          </TabsTrigger>
          <TabsTrigger value="scheduling" className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Agendamento</span>
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex items-center gap-2 text-sm">
            <Megaphone className="h-4 w-4" />
            <span className="hidden sm:inline">Comunicados</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Faculty Performance */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-violet-600" />
                  {t("facultyStats")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Desempenho Geral</span>
                    <span className="font-medium">{stats.facultyPerformance}%</span>
                  </div>
                  <Progress value={stats.facultyPerformance} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progresso do Semestre</span>
                    <span className="font-medium">{stats.semesterProgress}%</span>
                  </div>
                  <Progress value={stats.semesterProgress} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Taxa de Frequência</span>
                    <span className="font-medium">91.2%</span>
                  </div>
                  <Progress value={91.2} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Atividades Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "Novo professor cadastrado", user: "Prof. Ana Silva", time: "2h atrás", type: "success" },
                    { action: "Horário aprovado", user: "Prof. João Costa", time: "4h atrás", type: "info" },
                    { action: "Disciplina criada", user: "Prof. Maria Santos", time: "1 dia atrás", type: "success" },
                    { action: "Solicitação pendente", user: "Prof. Pedro Lima", time: "2 dias atrás", type: "warning" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "success"
                            ? "bg-green-500"
                            : activity.type === "info"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-600">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Overview */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Visão Geral dos Departamentos</CardTitle>
              <CardDescription>Estatísticas por departamento da faculdade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    department: "Ciências da Computação",
                    lecturers: 8,
                    students: 156,
                    courses: 6,
                    performance: 89.2,
                  },
                  {
                    department: "Gestão de Negócios",
                    lecturers: 10,
                    students: 189,
                    courses: 8,
                    performance: 85.7,
                  },
                  {
                    department: "Contabilidade",
                    lecturers: 6,
                    students: 111,
                    courses: 4,
                    performance: 87.1,
                  },
                ].map((dept, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{dept.department}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Professores</span>
                          <span className="font-medium">{dept.lecturers}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Estudantes</span>
                          <span className="font-medium">{dept.students}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Disciplinas</span>
                          <span className="font-medium">{dept.courses}</span>
                        </div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Desempenho</span>
                          <span className="font-medium">{dept.performance}%</span>
                        </div>
                        <Progress value={dept.performance} className="h-1" />
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
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesso rápido às funcionalidades administrativas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Button variant="coordinator-outline" className="h-16 flex-col gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-xs">Gerir Professores</span>
                </Button>
                <Button variant="coordinator-outline" className="h-16 flex-col gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs">Disciplinas</span>
                </Button>
                <Button variant="coordinator-outline" className="h-16 flex-col gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-xs">Horários</span>
                </Button>
                <Button variant="coordinator-outline" className="h-16 flex-col gap-2">
                  <Settings className="w-5 h-5" />
                  <span className="text-xs">Configurações</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-violet-600" />
                {t("pendingApprovals")}
              </CardTitle>
              <CardDescription>Solicitações aguardando sua aprovação, organizadas por prioridade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          approval.priority === "high"
                            ? "bg-red-500"
                            : approval.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div>
                        <h4 className="font-medium">{approval.title}</h4>
                        <p className="text-sm text-gray-600">
                          {approval.type} • {approval.requester} • {approval.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          approval.priority === "high" ? "high" : approval.priority === "medium" ? "medium" : "low"
                        }
                      >
                        {approval.priority === "high"
                          ? t("urgent")
                          : approval.priority === "medium"
                            ? t("medium")
                            : t("low")}
                      </Badge>
                      <Button size="sm" variant="coordinator-outline">
                        {t("details")}
                      </Button>
                      <Button size="sm" variant="coordinator">
                        {t("approve")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduling" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-violet-600" />
                {t("schedulingTools")}
              </CardTitle>
              <CardDescription>Ferramentas para gestão de horários e salas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Conflitos de Horário</h4>
                  <div className="space-y-2">
                    {[
                      { course: "Matemática I", time: "08:00-10:00", room: "Sala 101", issue: "Sobreposição" },
                      { course: "Física II", time: "14:00-16:00", room: "Lab 203", issue: "Sala ocupada" },
                    ].map((conflict, index) => (
                      <div key={index} className="p-3 border border-red-200 rounded-lg bg-red-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-sm">{conflict.course}</h5>
                            <p className="text-xs text-gray-600">
                              {conflict.time} • {conflict.room}
                            </p>
                          </div>
                          <Badge variant="high">{conflict.issue}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Salas Disponíveis</h4>
                  <div className="space-y-2">
                    {[
                      { room: "Sala 105", capacity: 40, available: "08:00-12:00" },
                      { room: "Lab 301", capacity: 25, available: "14:00-18:00" },
                      { room: "Auditório", capacity: 100, available: "10:00-16:00" },
                    ].map((room, index) => (
                      <div key={index} className="p-3 border border-green-200 rounded-lg bg-green-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium text-sm">{room.room}</h5>
                            <p className="text-xs text-gray-600">
                              Capacidade: {room.capacity} • Disponível: {room.available}
                            </p>
                          </div>
                          <Button size="sm" variant="coordinator">
                            Reservar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-violet-600" />
                {t("bulkAnnouncements")}
              </CardTitle>
              <CardDescription>Envie comunicados para toda a faculdade ou grupos específicos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button variant="coordinator" className="h-20 flex-col gap-2">
                    <Users className="w-6 h-6" />
                    <span>Todos os Professores</span>
                  </Button>
                  <Button variant="coordinator-outline" className="h-20 flex-col gap-2">
                    <BookOpen className="w-6 h-6" />
                    <span>Todos os Estudantes</span>
                  </Button>
                  <Button variant="coordinator-outline" className="h-20 flex-col gap-2">
                    <Settings className="w-6 h-6" />
                    <span>Grupo Personalizado</span>
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Comunicados Recentes</h4>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Reunião de Coordenação",
                        date: "Hoje",
                        recipients: "24 professores",
                        status: "Enviado",
                      },
                      {
                        title: "Alteração de Calendário",
                        date: "Ontem",
                        recipients: "456 estudantes",
                        status: "Enviado",
                      },
                      {
                        title: "Nova Política de Avaliação",
                        date: "2 dias atrás",
                        recipients: "Todos",
                        status: "Rascunho",
                      },
                    ].map((announcement, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h5 className="font-medium text-sm">{announcement.title}</h5>
                          <p className="text-xs text-gray-600">
                            {announcement.date} • {announcement.recipients}
                          </p>
                        </div>
                        <Badge variant={announcement.status === "Enviado" ? "success" : "warning"}>
                          {announcement.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
