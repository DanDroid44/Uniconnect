"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Award, BookOpen, Download, BarChart3, Target } from "lucide-react"

export default function GradesPage() {
  const [selectedSemester, setSelectedSemester] = useState("current")
  const [selectedCourse, setSelectedCourse] = useState("all")

  // Mock data - in real app, this would come from your database
  const grades = [
    {
      id: 1,
      course: "Programação I",
      courseCode: "PROG101",
      semester: "1º Semestre 2024",
      assessments: [
        { type: "Teste", name: "Teste 1", grade: 16.5, maxGrade: 20, weight: 0.3, date: "2024-01-15" },
        { type: "Trabalho", name: "Projeto Final", grade: 18.0, maxGrade: 20, weight: 0.4, date: "2024-01-25" },
        { type: "Exame", name: "Exame Final", grade: 15.0, maxGrade: 20, weight: 0.3, date: "2024-02-05" },
      ],
      finalGrade: 16.5,
      status: "approved",
      credits: 6,
    },
    {
      id: 2,
      course: "Cálculo II",
      courseCode: "CALC201",
      semester: "1º Semestre 2024",
      assessments: [
        { type: "Teste", name: "Teste 1", grade: 14.0, maxGrade: 20, weight: 0.25, date: "2024-01-20" },
        { type: "Teste", name: "Teste 2", grade: 15.5, maxGrade: 20, weight: 0.25, date: "2024-02-01" },
        { type: "Trabalho", name: "Exercícios", grade: 16.0, maxGrade: 20, weight: 0.2, date: "2024-02-10" },
        { type: "Exame", name: "Exame Final", grade: 13.0, maxGrade: 20, weight: 0.3, date: "2024-02-15" },
      ],
      finalGrade: 14.2,
      status: "approved",
      credits: 6,
    },
    {
      id: 3,
      course: "Base de Dados",
      courseCode: "BD301",
      semester: "2º Semestre 2023",
      assessments: [
        { type: "Teste", name: "Teste 1", grade: 17.0, maxGrade: 20, weight: 0.3, date: "2023-09-15" },
        { type: "Projeto", name: "Sistema BD", grade: 19.0, maxGrade: 20, weight: 0.4, date: "2023-10-20" },
        { type: "Exame", name: "Exame Final", grade: 18.0, maxGrade: 20, weight: 0.3, date: "2023-11-10" },
      ],
      finalGrade: 18.0,
      status: "approved",
      credits: 8,
    },
  ]

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return "text-green-600"
    if (grade >= 14) return "text-blue-600"
    if (grade >= 10) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700"
      case "failed":
        return "bg-red-100 text-red-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprovado"
      case "failed":
        return "Reprovado"
      case "pending":
        return "Pendente"
      default:
        return status
    }
  }

  const calculateGPA = () => {
    const totalCredits = grades.reduce((sum, course) => sum + course.credits, 0)
    const weightedSum = grades.reduce((sum, course) => sum + course.finalGrade * course.credits, 0)
    return totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : "0.00"
  }

  const filteredGrades = grades.filter((grade) => {
    const matchesSemester =
      selectedSemester === "all" || (selectedSemester === "current" && grade.semester.includes("2024"))
    const matchesCourse = selectedCourse === "all" || grade.courseCode === selectedCourse
    return matchesSemester && matchesCourse
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notas</h1>
        <p className="text-gray-600 mt-1">Acompanhe seu desempenho acadêmico e histórico de notas</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Geral (GPA)</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getGradeColor(Number.parseFloat(calculateGPA()))}`}>
              {calculateGPA()}
            </div>
            <p className="text-xs text-muted-foreground">Escala 0-20</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Aprovados</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {grades.filter((g) => g.status === "approved").length}
            </div>
            <p className="text-xs text-muted-foreground">de {grades.length} cursos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Créditos Obtidos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {grades.filter((g) => g.status === "approved").reduce((sum, g) => sum + g.credits, 0)}
            </div>
            <p className="text-xs text-muted-foreground">créditos completados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Melhor Nota</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.max(...grades.map((g) => g.finalGrade)).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">nota mais alta</p>
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
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Selecionar semestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os semestres</SelectItem>
                <SelectItem value="current">Semestre atual</SelectItem>
                <SelectItem value="2024-1">1º Semestre 2024</SelectItem>
                <SelectItem value="2023-2">2º Semestre 2023</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Selecionar curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os cursos</SelectItem>
                {grades.map((grade) => (
                  <SelectItem key={grade.courseCode} value={grade.courseCode}>
                    {grade.courseCode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="ml-auto bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exportar Histórico
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grades Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="detailed">Detalhado</TabsTrigger>
          <TabsTrigger value="analytics">Análise</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6">
            {filteredGrades.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.course}</CardTitle>
                      <CardDescription>
                        {course.courseCode} • {course.semester}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getGradeColor(course.finalGrade)}`}>
                          {course.finalGrade.toFixed(1)}
                        </div>
                        <p className="text-xs text-gray-600">{course.credits} créditos</p>
                      </div>
                      <Badge className={getStatusColor(course.status)}>{getStatusLabel(course.status)}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progresso das avaliações</span>
                      <span>{course.assessments.length} avaliações</span>
                    </div>

                    <div className="space-y-2">
                      {course.assessments.map((assessment, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs">
                              {assessment.type}
                            </Badge>
                            <span className="text-sm font-medium">{assessment.name}</span>
                            <span className="text-xs text-gray-500">Peso: {(assessment.weight * 100).toFixed(0)}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {new Date(assessment.date).toLocaleDateString("pt-BR")}
                            </span>
                            <span className={`font-semibold ${getGradeColor(assessment.grade)}`}>
                              {assessment.grade.toFixed(1)}/{assessment.maxGrade}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico Detalhado</CardTitle>
              <CardDescription>Todas as avaliações e notas por curso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredGrades.map((course) => (
                  <div key={course.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{course.course}</h3>
                        <p className="text-sm text-gray-600">
                          {course.courseCode} • {course.semester}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${getGradeColor(course.finalGrade)}`}>
                          Nota Final: {course.finalGrade.toFixed(1)}
                        </div>
                        <Badge className={getStatusColor(course.status)}>{getStatusLabel(course.status)}</Badge>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Avaliação</th>
                            <th className="text-left py-2">Tipo</th>
                            <th className="text-left py-2">Data</th>
                            <th className="text-right py-2">Nota</th>
                            <th className="text-right py-2">Peso</th>
                            <th className="text-right py-2">Contribuição</th>
                          </tr>
                        </thead>
                        <tbody>
                          {course.assessments.map((assessment, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2 font-medium">{assessment.name}</td>
                              <td className="py-2">
                                <Badge variant="outline" className="text-xs">
                                  {assessment.type}
                                </Badge>
                              </td>
                              <td className="py-2 text-gray-600">
                                {new Date(assessment.date).toLocaleDateString("pt-BR")}
                              </td>
                              <td className={`py-2 text-right font-semibold ${getGradeColor(assessment.grade)}`}>
                                {assessment.grade.toFixed(1)}/{assessment.maxGrade}
                              </td>
                              <td className="py-2 text-right">{(assessment.weight * 100).toFixed(0)}%</td>
                              <td className="py-2 text-right font-medium">
                                {(assessment.grade * assessment.weight).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Distribuição de Notas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Excelente (16-20)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={40} className="w-20 h-2" />
                      <span className="text-sm font-medium">40%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bom (14-15.9)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={33} className="w-20 h-2" />
                      <span className="text-sm font-medium">33%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Satisfatório (10-13.9)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={27} className="w-20 h-2" />
                      <span className="text-sm font-medium">27%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Insuficiente (0-9.9)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={0} className="w-20 h-2" />
                      <span className="text-sm font-medium">0%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendência de Desempenho</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tendência geral</span>
                    <div className="flex items-center gap-2 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">Melhorando</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Média do semestre anterior</span>
                      <span className="font-medium">15.1</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Média atual</span>
                      <span className="font-medium text-green-600">15.4</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Melhoria</span>
                      <span className="font-medium text-green-600">+0.3</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
