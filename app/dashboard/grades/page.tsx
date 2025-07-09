"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, Award, BarChart3, Download } from "lucide-react"

const currentSemesterGrades = [
  {
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    assessments: [
      { type: "Test 1", score: 85, maxScore: 100, weight: 20, date: "2025-02-15" },
      { type: "Test 2", score: 90, maxScore: 100, weight: 20, date: "2025-03-01" },
      { type: "Assignment 1", score: 95, maxScore: 100, weight: 10, date: "2025-02-20" },
      { type: "Assignment 2", score: 88, maxScore: 100, weight: 10, date: "2025-03-05" },
      { type: "Final Exam", score: null, maxScore: 100, weight: 40, date: "2025-03-20" },
    ],
    currentGrade: 89.5,
    letterGrade: "A-",
    credits: 3,
  },
  {
    courseCode: "MATH201",
    courseName: "Calculus II",
    assessments: [
      { type: "Test 1", score: 78, maxScore: 100, weight: 20, date: "2025-02-18" },
      { type: "Test 2", score: 82, maxScore: 100, weight: 20, date: "2025-03-04" },
      { type: "Assignment 1", score: 85, maxScore: 100, weight: 10, date: "2025-02-25" },
      { type: "Assignment 2", score: 90, maxScore: 100, weight: 10, date: "2025-03-08" },
      { type: "Final Exam", score: null, maxScore: 100, weight: 40, date: "2025-03-22" },
    ],
    currentGrade: 83.1,
    letterGrade: "B+",
    credits: 4,
  },
  {
    courseCode: "ENG202",
    courseName: "Technical Writing",
    assessments: [
      { type: "Test 1", score: 92, maxScore: 100, weight: 25, date: "2025-02-22" },
      { type: "Assignment 1", score: 88, maxScore: 100, weight: 25, date: "2025-02-28" },
      { type: "Assignment 2", score: 94, maxScore: 100, weight: 25, date: "2025-03-10" },
      { type: "Final Project", score: null, maxScore: 100, weight: 25, date: "2025-03-25" },
    ],
    currentGrade: 91.5,
    letterGrade: "A-",
    credits: 2,
  },
  {
    courseCode: "PSYC101",
    courseName: "Introduction to Psychology",
    assessments: [
      { type: "Test 1", score: 87, maxScore: 100, weight: 20, date: "2025-02-19" },
      { type: "Test 2", score: 84, maxScore: 100, weight: 20, date: "2025-03-02" },
      { type: "Assignment 1", score: 91, maxScore: 100, weight: 15, date: "2025-02-26" },
      { type: "Assignment 2", score: 89, maxScore: 100, weight: 15, date: "2025-03-07" },
      { type: "Final Exam", score: null, maxScore: 100, weight: 30, date: "2025-03-21" },
    ],
    currentGrade: 87.65,
    letterGrade: "B+",
    credits: 3,
  },
  {
    courseCode: "HIST105",
    courseName: "World History",
    assessments: [
      { type: "Test 1", score: 79, maxScore: 100, weight: 25, date: "2025-02-21" },
      { type: "Test 2", score: 83, maxScore: 100, weight: 25, date: "2025-03-06" },
      { type: "Research Paper", score: 88, maxScore: 100, weight: 30, date: "2025-03-01" },
      { type: "Final Exam", score: null, maxScore: 100, weight: 20, date: "2025-03-23" },
    ],
    currentGrade: 83.25,
    letterGrade: "B+",
    credits: 3,
  },
  {
    courseCode: "PHIL101",
    courseName: "Introduction to Philosophy",
    assessments: [
      { type: "Test 1", score: 85, maxScore: 100, weight: 30, date: "2025-02-17" },
      { type: "Essay 1", score: 90, maxScore: 100, weight: 35, date: "2025-02-28" },
      { type: "Essay 2", score: null, maxScore: 100, weight: 35, date: "2025-03-15" },
    ],
    currentGrade: 88.25,
    letterGrade: "B+",
    credits: 2,
  },
]

const previousSemesters = [
  {
    semester: "Fall 2024",
    gpa: 3.42,
    courses: [
      { code: "MATH101", name: "Calculus I", grade: "A", points: 4.0, credits: 4 },
      { code: "CS100", name: "Programming Fundamentals", grade: "A-", points: 3.7, credits: 3 },
      { code: "ENG101", name: "English Composition", grade: "B+", points: 3.3, credits: 3 },
      { code: "PHYS101", name: "Physics I", grade: "B", points: 3.0, credits: 4 },
      { code: "PHIL101", name: "Introduction to Philosophy", grade: "A", points: 4.0, credits: 2 },
    ],
  },
  {
    semester: "Spring 2024",
    gpa: 3.53,
    courses: [
      { code: "MATH102", name: "Linear Algebra", grade: "A-", points: 3.7, credits: 3 },
      { code: "CS150", name: "Data Structures", grade: "B+", points: 3.3, credits: 4 },
      { code: "STAT101", name: "Statistics", grade: "A", points: 4.0, credits: 3 },
      { code: "ECON101", name: "Microeconomics", grade: "B", points: 3.0, credits: 3 },
      { code: "PORT101", name: "Portuguese Language", grade: "A", points: 4.0, credits: 2 },
    ],
  },
]

const gradeChartData = currentSemesterGrades.map((course) => ({
  course: course.courseCode,
  grade: course.currentGrade,
}))

const gpaHistory = [
  { semester: "Spring 2024", gpa: 3.53 },
  { semester: "Fall 2024", gpa: 3.42 },
  { semester: "Spring 2025", gpa: 3.48 }, // Current estimated
]

export default function GradesPage() {
  const currentGPA = 3.48
  const totalCreditsCompleted = previousSemesters.reduce(
    (total, sem) => total + sem.courses.reduce((sum, course) => sum + course.credits, 0),
    0,
  )
  const currentSemesterCredits = currentSemesterGrades.reduce((sum, course) => sum + course.credits, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Grades</h1>
        <p className="text-gray-600 mt-1">View your academic performance and grades</p>
      </div>

      {/* Academic Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentGPA.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Out of 4.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Completed</CardTitle>
            <Award className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCreditsCompleted}</div>
            <p className="text-xs text-muted-foreground">Out of 120 required</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Credits</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentSemesterCredits}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Academic Status</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-600">Good Standing</div>
            <p className="text-xs text-muted-foreground">Eligible for graduation</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Semester</TabsTrigger>
          <TabsTrigger value="previous">Previous Semesters</TabsTrigger>
          <TabsTrigger value="analytics">Grade Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Spring 2025 - Current Grades</CardTitle>
              <CardDescription>Your grades for the current semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentSemesterGrades.map((course) => (
                  <Card key={course.courseCode} className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{course.courseName}</h3>
                        <p className="text-gray-600">
                          {course.courseCode} • {course.credits} credits
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{course.currentGrade}%</div>
                        <Badge variant="outline" className="mt-1">
                          {course.letterGrade}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {course.assessments.map((assessment, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex-1">
                            <span className="font-medium">{assessment.type}</span>
                            <span className="text-sm text-gray-600 ml-2">({assessment.weight}%)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">
                              {new Date(assessment.date).toLocaleDateString()}
                            </span>
                            {assessment.score !== null ? (
                              <Badge variant="default" className="bg-green-100 text-green-800">
                                {assessment.score}/{assessment.maxScore}
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Pending</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="previous" className="space-y-6">
          {previousSemesters.map((semester) => (
            <Card key={semester.semester}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{semester.semester}</CardTitle>
                    <CardDescription>
                      GPA: {semester.gpa.toFixed(2)} • Credits:{" "}
                      {semester.courses.reduce((sum, course) => sum + course.credits, 0)}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Transcript
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {semester.courses.map((course) => (
                    <div key={course.code} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">{course.code}</Badge>
                          <span className="font-medium">{course.name}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{course.credits} credits</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">{course.points.toFixed(1)} pts</span>
                        <Badge
                          variant="outline"
                          className={
                            course.grade.startsWith("A")
                              ? "bg-green-100 text-green-800"
                              : course.grade.startsWith("B")
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {course.grade}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Semester Performance</CardTitle>
                <CardDescription>Grade distribution across courses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gradeChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="course" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="grade" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GPA Trend</CardTitle>
                <CardDescription>Your GPA progression over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={gpaHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis domain={[0, 4]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="gpa"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
