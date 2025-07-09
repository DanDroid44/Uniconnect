"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { SemesterBadge } from "@/components/ui/semester-badge"
import { Save, FileSpreadsheet, AlertCircle, CheckCircle, Users, BookOpen, GraduationCap, Download } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

interface StudentGrade {
  id: string
  studentName: string
  studentNumber: string
  currentGrade: number | null
  newGrade: number | null
  status: "pending" | "valid" | "invalid"
  comments?: string
}

interface Course {
  id: string
  name: string
  code: string
  semester: string
  students: number
}

const mockCourses: Course[] = [
  { id: "1", name: "Programação I", code: "CC101", semester: "1º Semestre", students: 45 },
  { id: "2", name: "Matemática Discreta", code: "CC102", semester: "1º Semestre", students: 42 },
  { id: "3", name: "Algoritmos e Estruturas de Dados", code: "CC201", semester: "2º Semestre", students: 38 },
  { id: "4", name: "Base de Dados", code: "CC202", semester: "2º Semestre", students: 40 },
]

const mockStudents: StudentGrade[] = [
  {
    id: "1",
    studentName: "Ana Silva",
    studentNumber: "20240001",
    currentGrade: 15,
    newGrade: null,
    status: "pending",
  },
  {
    id: "2",
    studentName: "João Santos",
    studentNumber: "20240002",
    currentGrade: null,
    newGrade: null,
    status: "pending",
  },
  {
    id: "3",
    studentName: "Maria Costa",
    studentNumber: "20240003",
    currentGrade: 12,
    newGrade: null,
    status: "pending",
  },
]

export default function UploadMarksPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [selectedAssessment, setSelectedAssessment] = useState<string>("")
  const [students, setStudents] = useState<StudentGrade[]>(mockStudents)
  const [bulkGrade, setBulkGrade] = useState<string>("")
  const [comments, setComments] = useState<string>("")

  const validateGrade = (grade: number): boolean => {
    return grade >= 0 && grade <= 20
  }

  const updateStudentGrade = (studentId: string, grade: string) => {
    const numericGrade = Number.parseFloat(grade)
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id === studentId) {
          const isValid = grade === "" || validateGrade(numericGrade)
          return {
            ...student,
            newGrade: grade === "" ? null : numericGrade,
            status: grade === "" ? "pending" : isValid ? "valid" : "invalid",
          }
        }
        return student
      }),
    )
  }

  const applyBulkGrade = () => {
    const numericGrade = Number.parseFloat(bulkGrade)
    if (validateGrade(numericGrade)) {
      setStudents((prev) =>
        prev.map((student) => ({
          ...student,
          newGrade: numericGrade,
          status: "valid" as const,
        })),
      )
      setBulkGrade("")
    }
  }

  const saveGrades = () => {
    const validGrades = students.filter((s) => s.status === "valid")
    console.log("Saving grades:", validGrades)
    // Here you would typically send the data to your backend
  }

  const exportTemplate = () => {
    console.log("Exporting template for course:", selectedCourse)
    // Here you would generate and download a CSV/Excel template
  }

  const columns: ColumnDef<StudentGrade>[] = [
    {
      accessorKey: "studentNumber",
      header: "Número",
      cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("studentNumber")}</div>,
    },
    {
      accessorKey: "studentName",
      header: "Nome do Estudante",
      cell: ({ row }) => <div className="font-medium">{row.getValue("studentName")}</div>,
    },
    {
      accessorKey: "currentGrade",
      header: "Nota Atual",
      cell: ({ row }) => {
        const grade = row.getValue("currentGrade") as number | null
        return (
          <div className="text-center">
            {grade !== null ? (
              <Badge variant={grade >= 10 ? "default" : "destructive"}>{grade.toFixed(1)}</Badge>
            ) : (
              <Badge variant="secondary">N/A</Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "newGrade",
      header: "Nova Nota",
      cell: ({ row }) => {
        const student = row.original
        return (
          <div className="w-20">
            <Input
              type="number"
              min="0"
              max="20"
              step="0.1"
              placeholder="0-20"
              value={student.newGrade?.toString() || ""}
              onChange={(e) => updateStudentGrade(student.id, e.target.value)}
              className={`text-center ${
                student.status === "invalid"
                  ? "border-red-500 focus:border-red-500"
                  : student.status === "valid"
                    ? "border-green-500 focus:border-green-500"
                    : ""
              }`}
            />
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const icons = {
          pending: <AlertCircle className="w-4 h-4" />,
          valid: <CheckCircle className="w-4 h-4" />,
          invalid: <AlertCircle className="w-4 h-4" />,
        }
        const variants = {
          pending: "secondary" as const,
          valid: "default" as const,
          invalid: "destructive" as const,
        }
        const labels = {
          pending: "Pendente",
          valid: "Válida",
          invalid: "Inválida",
        }

        return (
          <Badge variant={variants[status as keyof typeof variants]} className="gap-1">
            {icons[status as keyof typeof icons]}
            {labels[status as keyof typeof labels]}
          </Badge>
        )
      },
    },
  ]

  const validGradesCount = students.filter((s) => s.status === "valid").length
  const invalidGradesCount = students.filter((s) => s.status === "invalid").length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload de Notas</h1>
          <p className="text-muted-foreground">
            Gerencie e atualize as notas dos estudantes seguindo o sistema de avaliação moçambicano (0-20)
          </p>
        </div>
        <SemesterBadge showProgress />
      </div>

      {/* Course Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Seleção de Disciplina
          </CardTitle>
          <CardDescription>Escolha a disciplina e o tipo de avaliação para carregar as notas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course">Disciplina</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma disciplina" />
                </SelectTrigger>
                <SelectContent>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{course.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {course.code} • {course.students} estudantes
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assessment">Tipo de Avaliação</Label>
              <Select value={selectedAssessment} onValueChange={setSelectedAssessment}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test1">1º Teste (30%)</SelectItem>
                  <SelectItem value="test2">2º Teste (30%)</SelectItem>
                  <SelectItem value="exam">Exame Final (40%)</SelectItem>
                  <SelectItem value="assignment">Trabalho Prático</SelectItem>
                  <SelectItem value="participation">Participação</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedCourse && selectedAssessment && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Disciplina selecionada: <strong>{mockCourses.find((c) => c.id === selectedCourse)?.name}</strong> •{" "}
                Avaliação: <strong>{selectedAssessment}</strong>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedCourse && selectedAssessment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Ações em Massa
            </CardTitle>
            <CardDescription>Aplique notas ou ações para múltiplos estudantes simultaneamente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="bulkGrade">Aplicar nota para todos</Label>
                <Input
                  id="bulkGrade"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  placeholder="Digite uma nota (0-20)"
                  value={bulkGrade}
                  onChange={(e) => setBulkGrade(e.target.value)}
                />
              </div>
              <Button onClick={applyBulkGrade} disabled={!bulkGrade || !validateGrade(Number.parseFloat(bulkGrade))}>
                Aplicar a Todos
              </Button>
              <Button variant="outline" onClick={exportTemplate}>
                <Download className="w-4 h-4 mr-2" />
                Template Excel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grades Table */}
      {selectedCourse && selectedAssessment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Notas dos Estudantes
            </CardTitle>
            <CardDescription>Sistema de avaliação: 0-20 pontos • Nota mínima de aprovação: 10 pontos</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={students}
              searchKey="studentName"
              searchPlaceholder="Pesquisar por nome do estudante..."
              roleTheme="faculty"
              showExport
              onExport={() => console.log("Exporting grades")}
            />

            <Separator className="my-6" />

            {/* Summary and Actions */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{students.length}</div>
                  <div className="text-sm text-blue-600">Total de Estudantes</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{validGradesCount}</div>
                  <div className="text-sm text-green-600">Notas Válidas</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{invalidGradesCount}</div>
                  <div className="text-sm text-red-600">Notas Inválidas</div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Comentários (Opcional)</Label>
                <Textarea
                  id="comments"
                  placeholder="Adicione comentários sobre esta avaliação..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button variant="outline">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Importar Excel
                </Button>
                <Button
                  onClick={saveGrades}
                  disabled={validGradesCount === 0}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Notas ({validGradesCount})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
