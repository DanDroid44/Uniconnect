"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Users, Calendar, TrendingUp, Bell } from "lucide-react"
import { SemesterBadge } from "@/components/ui/semester-badge"
import { SemesterCalendarWidget } from "@/components/dashboard/semester-calendar-widget"
import { getActiveSemester, getCurrentAcademicYear } from "@/lib/academic-calendar"
import type { User } from "@supabase/supabase-js"

interface DashboardContentProps {
  user: User
}

export function DashboardContent({ user }: DashboardContentProps) {
  const activeSemester = getActiveSemester()
  const currentYear = getCurrentAcademicYear()

  // Mock data - in real app, this would come from your database
  const studentStats = {
    enrolledCourses: 6,
    completedCredits: 45,
    currentGPA: 3.7,
    attendanceRate: 92,
  }

  const recentActivities = [
    {
      id: 1,
      type: "grade",
      title: "Nova nota disponível",
      description: "Cálculo II - Exame Final",
      time: "2 horas atrás",
      icon: TrendingUp,
    },
    {
      id: 2,
      type: "assignment",
      title: "Trabalho entregue",
      description: "Programação I - Projeto Final",
      time: "1 dia atrás",
      icon: BookOpen,
    },
    {
      id: 3,
      type: "schedule",
      title: "Aula cancelada",
      description: "História Mundial - 15 Jan",
      time: "2 dias atrás",
      icon: Calendar,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section with Semester Info */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bem-vindo, {user.user_metadata?.full_name || user.email}!
          </h1>
          <p className="text-gray-600 mt-1">Aqui está o resumo das suas atividades acadêmicas</p>
        </div>

        <SemesterBadge variant="detailed" showProgress showDetails />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disciplinas Inscritas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentStats.enrolledCourses}</div>
            <p className="text-xs text-muted-foreground">
              {activeSemester ? `${activeSemester.name} ${activeSemester.academicYear}` : "Período de férias"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Créditos Concluídos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentStats.completedCredits}</div>
            <p className="text-xs text-muted-foreground">+12 este semestre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentStats.currentGPA}</div>
            <p className="text-xs text-muted-foreground">+0.2 desde o último semestre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Presença</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentStats.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">Acima da média da turma</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Academic Progress */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progresso Acadêmico</CardTitle>
              <CardDescription>
                Seu desempenho no {activeSemester ? activeSemester.name : "semestre atual"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeSemester && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso do Semestre</span>
                    <span className="font-medium">{Math.round(activeSemester.progress)}%</span>
                  </div>
                  <Progress value={activeSemester.progress} className="h-2" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Disciplinas em Andamento</p>
                  <div className="space-y-1">
                    {["Cálculo II", "Programação I", "Física I", "História Mundial"].map((course, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{course}</span>
                        <Badge variant="outline" className="text-xs">
                          {["A", "B+", "A-", "B"][index]}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Próximas Avaliações</p>
                  <div className="space-y-1">
                    {[
                      { course: "Cálculo II", date: "20 Jan", type: "Exame" },
                      { course: "Programação I", date: "25 Jan", type: "Projeto" },
                      { course: "Física I", date: "28 Jan", type: "Teste" },
                    ].map((exam, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">{exam.course}</span>
                          <span className="text-gray-500">{exam.date}</span>
                        </div>
                        <p className="text-xs text-gray-600">{exam.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Atividades Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <activity.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <SemesterCalendarWidget />

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Ver Horário</p>
                    <p className="text-xs text-gray-600">Aulas desta semana</p>
                  </div>
                </div>
              </button>

              <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Ver Notas</p>
                    <p className="text-xs text-gray-600">Resultados recentes</p>
                  </div>
                </div>
              </button>

              <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-sm">Perfil</p>
                    <p className="text-xs text-gray-600">Atualizar informações</p>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Academic Year Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ano Acadêmico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">{currentYear.year}</p>
                  <p className="text-sm text-gray-600">{currentYear.isActive ? "Em andamento" : "Inativo"}</p>
                </div>

                <div className="space-y-2">
                  {currentYear.semesters.map((semester) => (
                    <div key={semester.id} className="flex items-center justify-between text-sm">
                      <span>{semester.name}</span>
                      <Badge
                        variant={semester.status === "active" ? "default" : "outline"}
                        className={
                          semester.status === "active"
                            ? "bg-green-600 hover:bg-green-700"
                            : semester.status === "completed"
                              ? "text-gray-600"
                              : "text-blue-600"
                        }
                      >
                        {semester.status === "active"
                          ? "Ativo"
                          : semester.status === "completed"
                            ? "Concluído"
                            : "Próximo"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
