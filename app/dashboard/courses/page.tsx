"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, MapPin, Calendar, CheckCircle, AlertCircle } from "lucide-react"

const currentCourses = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    credits: 3,
    instructor: "Prof. Maria Santos",
    schedule: "Mon/Wed 09:30-11:00",
    room: "Building A, Room 203",
    progress: 75,
    status: "active",
    nextClass: "Tomorrow at 09:30",
    assignments: 3,
    announcements: 2,
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    credits: 4,
    instructor: "Dr. João Silva",
    schedule: "Mon/Thu 14:00-15:30",
    room: "Building B, Room 105",
    progress: 68,
    status: "active",
    nextClass: "Thursday at 14:00",
    assignments: 2,
    announcements: 1,
  },
  {
    id: 3,
    code: "ENG202",
    name: "Technical Writing",
    credits: 2,
    instructor: "Prof. Ana Costa",
    schedule: "Tue/Thu 10:00-11:30",
    room: "Building C, Room 301",
    progress: 82,
    status: "active",
    nextClass: "Thursday at 10:00",
    assignments: 1,
    announcements: 0,
  },
  {
    id: 4,
    code: "PSYC101",
    name: "Introduction to Psychology",
    credits: 3,
    instructor: "Dr. Carlos Mendes",
    schedule: "Tue/Fri 15:00-16:30",
    room: "Building A, Room 150",
    progress: 71,
    status: "active",
    nextClass: "Friday at 15:00",
    assignments: 4,
    announcements: 1,
  },
  {
    id: 5,
    code: "HIST105",
    name: "World History",
    credits: 3,
    instructor: "Prof. Isabel Rodrigues",
    schedule: "Wed/Fri 13:00-14:30",
    room: "Building D, Room 201",
    progress: 64,
    status: "active",
    nextClass: "Friday at 13:00",
    assignments: 2,
    announcements: 3,
  },
  {
    id: 6,
    code: "PHIL101",
    name: "Introduction to Philosophy",
    credits: 2,
    instructor: "Dr. Antonio Pereira",
    schedule: "Mon/Wed 16:00-17:30",
    room: "Building C, Room 205",
    progress: 78,
    status: "active",
    nextClass: "Wednesday at 16:00",
    assignments: 1,
    announcements: 0,
  },
]

export default function CoursesPage() {
  const totalCredits = currentCourses.reduce((sum, course) => sum + course.credits, 0)
  const averageProgress = Math.round(
    currentCourses.reduce((sum, course) => sum + course.progress, 0) / currentCourses.length,
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <p className="text-gray-600 mt-1">Your current semester courses - Spring 2025</p>
      </div>

      {/* Course Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentCourses.length}</div>
            <p className="text-xs text-muted-foreground">6 subjects per semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCredits}</div>
            <p className="text-xs text-muted-foreground">Credit hours enrolled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageProgress}%</div>
            <Progress value={averageProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentCourses.reduce((sum, course) => sum + course.assignments, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Assignments due</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Badge variant="outline">{course.code}</Badge>
                    <span className="text-lg">{course.name}</span>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {course.credits} credit{course.credits !== 1 ? "s" : ""} • {course.instructor}
                  </CardDescription>
                </div>
                <Badge variant={course.status === "active" ? "default" : "secondary"}>{course.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Course Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{course.room}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Next Class:</span>
                <span className="font-medium">{course.nextClass}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex space-x-4 text-sm">
                  <span className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1 text-blue-600" />
                    {course.assignments} assignments
                  </span>
                  {course.announcements > 0 && (
                    <span className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 text-orange-600" />
                      {course.announcements} new
                    </span>
                  )}
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
