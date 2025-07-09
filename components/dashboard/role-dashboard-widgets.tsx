"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Users,
  TrendingUp,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  GraduationCap,
  BarChart3,
  UserCheck,
  Bell,
  Upload,
  MessageSquare,
  Target,
  Award,
  Zap,
} from "lucide-react"

interface StudentDashboardWidgetsProps {
  className?: string
}

export function StudentDashboardWidgets({ className }: StudentDashboardWidgetsProps) {
  const studentStats = {
    gpa: 15.2,
    completedCourses: 8,
    totalCourses: 12,
    upcomingDeadlines: 3,
    unreadNotifications: 5,
    groupsJoined: 2,
    attendanceRate: 92,
  }

  const upcomingDeadlines = [
    { course: "Algoritmos", task: "Trabalho Prático", dueDate: "2024-03-20", priority: "high" },
    { course: "Base de Dados", task: "Projeto Final", dueDate: "2024-03-25", priority: "medium" },
    { course: "Programação I", task: "Lista de Exercícios", dueDate: "2024-03-28", priority: "low" },
  ]

  const recentGrades = [
    { course: "Programação I", assessment: "2º Teste", grade: 16.5, maxGrade: 20 },
    { course: "Matemática Discreta", assessment: "1º Teste", grade: 14.0, maxGrade: 20 },
    { course: "Algoritmos", assessment: "Trabalho", grade: 18.0, maxGrade: 20 },
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Academic Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Geral (GPA)</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{studentStats.gpa.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Escala de 0-20 pontos</p>
            <Progress value={(studentStats.gpa / 20) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disciplinas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {studentStats.completedCourses}/{studentStats.totalCourses}
            </div>
            <p className="text-xs text-muted-foreground">Concluídas este semestre</p>
            <Progress value={(studentStats.completedCourses / studentStats.totalCourses) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prazos Próximos</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{studentStats.upcomingDeadlines}</div>
            <p className="text-xs text-muted-foreground">Entregas esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presença</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{studentStats.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">Taxa de comparecimento</p>
            <Progress value={studentStats.attendanceRate} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-600" />
            Ações Rápidas
          </CardTitle>
          <CardDescription>Acesso rápido às funcionalidades mais utilizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <BookOpen className="w-6 h-6 text-green-600" />
              <span className="text-sm">Ver Notas</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <Calendar className="w-6 h-6 text-blue-600" />
              <span className="text-sm">Horários</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <Users className="w-6 h-6 text-purple-600" />
              <span className="text-sm">Grupos</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <FileText className="w-6 h-6 text-orange-600" />
              <span className="text-sm">Materiais</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              Notas Recentes
            </CardTitle>
            <CardDescription>Suas últimas avaliações</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{grade.course}</p>
                  <p className="text-xs text-muted-foreground">{grade.assessment}</p>
                </div>
                <Badge variant={grade.grade >= 14 ? "default" : grade.grade >= 10 ? "secondary" : "destructive"}>
                  {grade.grade.toFixed(1)}/{grade.maxGrade}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Prazos Próximos
            </CardTitle>
            <CardDescription>Entregas e avaliações importantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{deadline.course}</p>
                  <p className="text-xs text-muted-foreground">{deadline.task}</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      deadline.priority === "high"
                        ? "destructive"
                        : deadline.priority === "medium"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {new Date(deadline.dueDate).toLocaleDateString("pt-MZ")}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface FacultyDashboardWidgetsProps {
  className?: string
}

export function FacultyDashboardWidgetsProps({ className }: FacultyDashboardWidgetsProps) {
  const facultyStats = {
    totalStudents: 156,
    activeCourses: 4,
    pendingGrades: 23,
    upcomingClasses: 8,
    averageGrade: 13.8,
    attendanceRate: 87,
  }

  const todaysClasses = [
    { course: "Programação I", time: "08:00", room: "Lab 1", students: 45 },
    { course: "Algoritmos", time: "14:00", room: "Sala 203", students: 38 },
    { course: "Base de Dados", time: "16:00", room: "Lab 2", students: 42 },
  ]

  const pendingTasks = [
    { task: "Corrigir testes de Programação I", count: 45, priority: "high" },
    { task: "Preparar material para próxima aula", count: 3, priority: "medium" },
    { task: "Responder dúvidas dos estudantes", count: 12, priority: "medium" },
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Faculty KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Estudantes</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{facultyStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disciplinas Ativas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facultyStats.activeCourses}</div>
            <p className="text-xs text-muted-foreground">Este semestre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notas Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{facultyStats.pendingGrades}</div>
            <p className="text-xs text-muted-foreground">Para correção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média da Turma</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{facultyStats.averageGrade.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Todas as disciplinas</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions for Faculty */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Ações Rápidas
          </CardTitle>
          <CardDescription>Ferramentas essenciais para gestão acadêmica</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <Upload className="w-6 h-6 text-blue-600" />
              <span className="text-sm">Upload Notas</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <FileText className="w-6 h-6 text-green-600" />
              <span className="text-sm">Relatórios</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <Users className="w-6 h-6 text-purple-600" />
              <span className="text-sm">Matrículas</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <MessageSquare className="w-6 h-6 text-orange-600" />
              <span className="text-sm">Comunicação</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule and Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Aulas de Hoje
            </CardTitle>
            <CardDescription>Seu cronograma para hoje</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaysClasses.map((class_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{class_.course}</p>
                  <p className="text-xs text-muted-foreground">
                    {class_.room} • {class_.students} estudantes
                  </p>
                </div>
                <Badge variant="outline">{class_.time}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Tarefas Pendentes
            </CardTitle>
            <CardDescription>Atividades que requerem sua atenção</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{task.task}</p>
                  <p className="text-xs text-muted-foreground">{task.count} itens</p>
                </div>
                <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>
                  {task.priority === "high" ? "Alta" : "Média"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface AdminDashboardWidgetsProps {
  className?: string
}

export function AdminDashboardWidgets({ className }: AdminDashboardWidgetsProps) {
  const adminStats = {
    totalStudents: 1247,
    totalFaculty: 89,
    activeCourses: 156,
    systemUptime: 99.9,
    pendingRequests: 15,
    recentRegistrations: 23,
  }

  const systemMetrics = [
    { metric: "Database Performance", value: 98, status: "excellent" },
    { metric: "Server Response Time", value: 85, status: "good" },
    { metric: "User Satisfaction", value: 92, status: "excellent" },
    { metric: "System Load", value: 67, status: "good" },
  ]

  const recentActivity = [
    { action: "Novo estudante registrado", user: "Maria Silva", time: "5 min atrás" },
    { action: "Professor adicionado", user: "Dr. João Santos", time: "15 min atrás" },
    { action: "Disciplina criada", user: "Sistema", time: "1 hora atrás" },
    { action: "Backup concluído", user: "Sistema", time: "2 horas atrás" },
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-violet-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Estudantes</CardTitle>
            <GraduationCap className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-violet-600">{adminStats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{adminStats.recentRegistrations} este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Corpo Docente</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalFaculty}</div>
            <p className="text-xs text-muted-foreground">Professores ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disciplinas Ativas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.activeCourses}</div>
            <p className="text-xs text-muted-foreground">Este semestre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime do Sistema</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{adminStats.systemUptime}%</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-violet-600" />
            Painel de Controle
          </CardTitle>
          <CardDescription>Ferramentas administrativas essenciais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <Users className="w-6 h-6 text-violet-600" />
              <span className="text-sm">Usuários</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <span className="text-sm">Relatórios</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <BookOpen className="w-6 h-6 text-green-600" />
              <span className="text-sm">Disciplinas</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
              <Bell className="w-6 h-6 text-orange-600" />
              <span className="text-sm">Notificações</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Metrics and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-violet-600" />
              Métricas do Sistema
            </CardTitle>
            <CardDescription>Performance e saúde do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.metric}</span>
                  <span className="text-sm text-muted-foreground">{metric.value}%</span>
                </div>
                <Progress
                  value={metric.value}
                  className={`h-2 ${
                    metric.status === "excellent"
                      ? "text-green-600"
                      : metric.status === "good"
                        ? "text-blue-600"
                        : "text-yellow-600"
                  }`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Atividade Recente
            </CardTitle>
            <CardDescription>Últimas ações no sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
