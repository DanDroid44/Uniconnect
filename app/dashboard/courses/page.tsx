"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Users, Calendar, Search, Star, CheckCircle, AlertCircle, Play } from "lucide-react"

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSemester, setFilterSemester] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock data - in real app, this would come from your database
  const courses = [
    {
      id: 1,
      name: "Programação I",
      code: "PROG101",
      credits: 6,
      semester: 1,
      status: "active",
      progress: 75,
      grade: 16.5,
      lecturer: "Prof. João Silva",
      schedule: "Seg, Qua, Sex - 08:00-10:00",
      description: "Introdução aos conceitos fundamentais de programação usando Python",
      nextClass: "2024-02-15 08:00",
      assignments: 3,
      attendance: 85,
    },
    {
      id: 2,
      name: "Cálculo II",
      code: "CALC201",
      credits: 6,
      semester: 2,
      status: "active",
      progress: 60,
      grade: 14.2,
      lecturer: "Prof. Maria Santos",
      schedule: "Ter, Qui - 10:00-12:00",
      description: "Derivadas, integrais e aplicações do cálculo diferencial e integral",
      nextClass: "2024-02-16 10:00",
      assignments: 2,
      attendance: 92,
    },
    {
      id: 3,
      name: "Base de Dados",
      code: "BD301",
      credits: 8,
      semester: 3,
      status: "completed",
      progress: 100,
      grade: 18.0,
      lecturer: "Prof. Carlos Mendes",
      schedule: "Seg, Qua - 14:00-17:00",
      description: "Modelagem, implementação e administração de sistemas de base de dados",
      nextClass: null,
      assignments: 0,
      attendance: 88,
    },
    {
      id: 4,
      name: "Sistemas Operativos",
      code: "SO401",
      credits: 6,
      semester: 4,
      status: "upcoming",
      progress: 0,
      grade: null,
      lecturer: "Prof. Ana Costa",
      schedule: "Ter, Qui, Sex - 08:00-10:00",
      description: "Conceitos e implementação de sistemas operativos modernos",
      nextClass: "2024-08-01 08:00",
      assignments: 0,
      attendance: 0,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      case "upcoming":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo"
      case "completed":
        return "Concluído"
      case "upcoming":
        return "Próximo"
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "upcoming":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSemester = filterSemester === "all" || course.semester.toString() === filterSemester
    const matchesStatus = filterStatus === "all" || course.status === filterStatus

    return matchesSearch && matchesSemester && matchesStatus
  })

  const activeCourses = courses.filter((c) => c.status === "active")
  const completedCourses = courses.filter((c) => c.status === "completed")
  const upcomingCourses = courses.filter((c) => c.status === "upcoming")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cursos</h1>
        <p className="text-gray-600 mt-1">Gerencie seus cursos e acompanhe o progresso acadêmico</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Ativos</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCourses.length}</div>
            <p className="text-xs text-muted-foreground">Em andamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCourses.length}</div>
            <p className="text-xs text-muted-foreground">Finalizados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingCourses.length}</div>
            <p className="text-xs text-muted-foreground">A iniciar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedCourses.length > 0
                ? (completedCourses.reduce((acc, c) => acc + (c.grade || 0), 0) / completedCourses.length).toFixed(1)
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Valores finais</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Pesquisar cursos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filterSemester} onValueChange={setFilterSemester}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Semestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os semestres</SelectItem>
                <SelectItem value="1">1º Semestre</SelectItem>
                <SelectItem value="2">2º Semestre</SelectItem>
                <SelectItem value="3">3º Semestre</SelectItem>
                <SelectItem value="4">4º Semestre</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="upcoming">Próximo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses List */}
      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Grade</TabsTrigger>
          <TabsTrigger value="list">Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>
                        {course.code} • {course.credits} créditos
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(course.status)}>
                      {getStatusIcon(course.status)}
                      <span className="ml-1">{getStatusLabel(course.status)}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{course.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{course.lecturer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{course.schedule}</span>
                    </div>
                    {course.nextClass && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>Próxima aula: {new Date(course.nextClass).toLocaleDateString("pt-BR")}</span>
                      </div>
                    )}
                  </div>

                  {course.status === "active" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    {course.grade && (
                      <div className="text-sm">
                        <span className="text-gray-600">Nota: </span>
                        <span className="font-semibold">{course.grade}</span>
                      </div>
                    )}

                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{course.name}</h3>
                            <p className="text-sm text-gray-600">
                              {course.code} • {course.lecturer}
                            </p>
                          </div>
                          <Badge className={getStatusColor(course.status)}>
                            {getStatusIcon(course.status)}
                            <span className="ml-1">{getStatusLabel(course.status)}</span>
                          </Badge>
                        </div>

                        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Créditos: </span>
                            <span className="font-medium">{course.credits}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Semestre: </span>
                            <span className="font-medium">{course.semester}º</span>
                          </div>
                          {course.grade && (
                            <div>
                              <span className="text-gray-600">Nota: </span>
                              <span className="font-medium">{course.grade}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-600">Presença: </span>
                            <span className="font-medium">{course.attendance}%</span>
                          </div>
                        </div>

                        {course.status === "active" && (
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progresso do curso</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        )}
                      </div>

                      <Button variant="outline">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
