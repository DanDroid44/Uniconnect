"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Minus, Award, BookOpen } from "lucide-react"

const currentSemesterGrades = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    credits: 3,
    assignments: [
      { name: "Assignment 1", score: 85, maxScore: 100, weight: 15 },
      { name: "Assignment 2", score: 92, maxScore: 100, weight: 15 },
      { name: "Midterm Exam", score: 78, maxScore: 100, weight: 30 },
      { name: "Final Project", score: 88, maxScore: 100, weight: 25 },
      { name: "Final Exam", score: null, maxScore: 100, weight: 15 },
    ],
    currentGrade: "B+",
    gpa: 3.3,
    trend: "up",
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    credits: 4,
    assignments: [
      { name: "Quiz 1", score: 95, maxScore: 100, weight: 10 },
      { name: "Quiz 2", score: 88, maxScore: 100, weight: 10 },
      { name: "Midterm Exam", score: 82, maxScore: 100, weight: 35 },
      { name: "Assignment 1", score: 90, maxScore: 100, weight: 20 },
      { name: "Final Exam", score: null, maxScore: 100, weight: 25 },
    ],
    currentGrade: "A-",
    gpa: 3.7,
    trend: "up",
  },
  {
    id: 3,
    code: "ENG202",
    name: "Technical Writing",
    credits: 2,
    assignments: [
      { name: "Essay 1", score: 75, maxScore: 100, weight: 25 },
      { name: "Essay 2", score: 82, maxScore: 100, weight: 25 },
      { name: "Presentation", score: 88, maxScore: 100, weight: 20 },
      { name: "Final Portfolio", score: null, maxScore: 100, weight: 30 },
    ],
    currentGrade: "B",
    gpa: 3.0,
    trend: "stable",
  },
  {
    id: 4,
    code: "PSYC101",
    name: "Introduction to Psychology",
    credits: 3,
    assignments: [
      { name: "Quiz 1", score: 92, maxScore: 100, weight: 15 },
      { name: "Quiz 2", score: 95, maxScore: 100, weight: 15 },
      { name: "Research Paper", score: 88, maxScore: 100, weight: 30 },
      { name: "Midterm Exam", score: 90, maxScore: 100, weight: 25 },
      { name: "Final Exam", score: null, maxScore: 100, weight: 15 },
    ],
    currentGrade: "A",
    gpa: 4.0,
    trend: "up",
  },
  {
    id: 5,
    code: "HIST105",
    name: "World History",
    credits: 3,
    assignments: [
      { name: "Essay 1", score: 70, maxScore: 100, weight: 20 },
      { name: "Essay 2", score: 75, maxScore: 100, weight: 20 },
      { name: "Midterm Exam", score: 68, maxScore: 100, weight: 30 },
      { name: "Group Project", score: 80, maxScore: 100, weight: 15 },
      { name: "Final Exam", score: null, maxScore: 100, weight: 15 },
    ],
    currentGrade: "C+",
    gpa: 2.3,
    trend: "down",
  },
  {
    id: 6,
    code: "PHIL101",
    name: "Introduction to Philosophy",
    credits: 3,
    assignments: [
      { name: "Essay 1", score: 95, maxScore: 100, weight: 25 },
      { name: "Essay 2", score: 98, maxScore: 100, weight: 25 },
      { name: "Midterm Exam", score: 92, maxScore: 100, weight: 25 },
      { name: "Final Essay", score: 96, maxScore: 100, weight: 25 },
    ],
    currentGrade: "A+",
    gpa: 4.0,
    trend: "stable",
  },
]

const previousSemesterGrades = [
  {
    code: "CS100",
    name: "Programming Fundamentals",
    credits: 3,
    finalGrade: "A-",
    gpa: 3.7,
  },
  {
    code: "MATH101",
    name: "Calculus I",
    credits: 4,
    finalGrade: "B+",
    gpa: 3.3,
  },
  {
    code: "ENG101",
    name: "English Composition",
    credits: 3,
    finalGrade: "A",
    gpa: 4.0,
  },
  {
    code: "PHYS101",
    name: "Physics I",
    credits: 4,
    finalGrade: "B",
    gpa: 3.0,
  },
  {
    code: "CHEM101",
    name: "General Chemistry",
    credits: 3,
    finalGrade: "B+",
    gpa: 3.3,
  },
]

export default function GradesPage() {
  const [selectedTab, setSelectedTab] = useState("current")

  const currentSemesterGPA = (
    currentSemesterGrades.reduce((sum, course) => sum + course.gpa * course.credits, 0) /
    currentSemesterGrades.reduce((sum, course) => sum + course.credits, 0)
  ).toFixed(2)

  const previousSemesterGPA = (
    previousSemesterGrades.reduce((sum, course) => sum + course.gpa * course.credits, 0) /
    previousSemesterGrades.reduce((sum, course) => sum + course.credits, 0)
  ).toFixed(2)

  const cumulativeGPA = (
    (currentSemesterGrades.reduce((sum, course) => sum + course.gpa * course.credits, 0) +
      previousSemesterGrades.reduce((sum, course) => sum + course.gpa * course.credits, 0)) /
    (currentSemesterGrades.reduce((sum, course) => sum + course.credits, 0) +
      previousSemesterGrades.reduce((sum, course) => sum + course.credits, 0))
  ).toFixed(2)

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getGradeBadge = (grade: string) => {
    if (grade.startsWith("A")) {
      return <Badge className="bg-green-100 text-green-800">{grade}</Badge>
    } else if (grade.startsWith("B")) {
      return <Badge className="bg-blue-100 text-blue-800">{grade}</Badge>
    } else if (grade.startsWith("C")) {
      return <Badge className="bg-yellow-100 text-yellow-800">{grade}</Badge>
    } else {
      return <Badge variant="outline">{grade}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Academic Performance</h1>
        <p className="text-gray-600 mt-1">Track your grades and academic progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <Award className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentSemesterGPA}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cumulative GPA</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cumulativeGPA}</div>
            <p className="text-xs text-muted-foreground">Overall</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentSemesterGrades.reduce((sum, course) => sum + course.credits, 0) +
                previousSemesterGrades.reduce((sum, course) => sum + course.credits, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentSemesterGrades.length}</div>
            <p className="text-xs text-muted-foreground">Current courses</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="current">Current Semester</TabsTrigger>
          <TabsTrigger value="previous">Previous Semester</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-6">
            {currentSemesterGrades.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Badge variant="outline">{course.code}</Badge>
                        <span>{course.name}</span>
                      </CardTitle>
                      <CardDescription>{course.credits} credits</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(course.trend)}
                      {getGradeBadge(course.currentGrade)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-3">
                      {course.assignments.map((assignment, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{assignment.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{assignment.weight}%</span>
                            {assignment.score !== null ? (
                              <Badge variant="outline">
                                {assignment.score}/{assignment.maxScore}
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Pending</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Current Grade</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold">{course.currentGrade}</span>
                          <span className="text-sm text-gray-600">({course.gpa} GPA)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="previous" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fall 2024 Semester</CardTitle>
              <CardDescription>Completed courses and final grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previousSemesterGrades.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{course.code}</Badge>
                        <span className="font-medium">{course.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{course.credits} credits</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getGradeBadge(course.finalGrade)}
                      <span className="text-sm text-gray-600">({course.gpa} GPA)</span>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Semester GPA</span>
                    <span className="text-lg font-bold">{previousSemesterGPA}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>GPA Trend</CardTitle>
                <CardDescription>Your academic performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Previous Semester</span>
                    <span className="font-bold">{previousSemesterGPA}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Current Semester</span>
                    <span className="font-bold">{currentSemesterGPA}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span>Cumulative GPA</span>
                    <span className="text-lg font-bold">{cumulativeGPA}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Current semester grade breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>A Grades</span>
                    <span className="font-bold">
                      {currentSemesterGrades.filter((c) => c.currentGrade.startsWith("A")).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>B Grades</span>
                    <span className="font-bold">
                      {currentSemesterGrades.filter((c) => c.currentGrade.startsWith("B")).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>C Grades</span>
                    <span className="font-bold">
                      {currentSemesterGrades.filter((c) => c.currentGrade.startsWith("C")).length}
                    </span>
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
