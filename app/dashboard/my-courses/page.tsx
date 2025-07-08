"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Upload, Calendar, Clock, MapPin } from "lucide-react"

const lecturerCourses = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    credits: 3,
    semester: "Spring 2025",
    schedule: "Mon/Wed 09:30-11:00",
    room: "Building A, Room 203",
    enrolledStudents: 45,
    maxCapacity: 50,
    faculty: "Computer Science",
    description: "Basic concepts of programming and computer science fundamentals",
    assessments: [
      { type: "Test 1", weight: 20, completed: true },
      { type: "Test 2", weight: 20, completed: true },
      { type: "Assignment 1", weight: 10, completed: true },
      { type: "Assignment 2", weight: 10, completed: false },
      { type: "Final Exam", weight: 40, completed: false },
    ],
  },
  {
    id: 2,
    code: "CS201",
    name: "Data Structures and Algorithms",
    credits: 4,
    semester: "Spring 2025",
    schedule: "Tue/Thu 14:00-15:30",
    room: "Building A, Room 205",
    enrolledStudents: 38,
    maxCapacity: 45,
    faculty: "Computer Science",
    description: "Advanced programming concepts including data structures and algorithm design",
    assessments: [
      { type: "Test 1", weight: 20, completed: true },
      { type: "Test 2", weight: 20, completed: false },
      { type: "Assignment 1", weight: 15, completed: true },
      { type: "Assignment 2", weight: 15, completed: false },
      { type: "Final Exam", weight: 30, completed: false },
    ],
  },
  {
    id: 3,
    code: "CS301",
    name: "Software Engineering",
    credits: 3,
    semester: "Spring 2025",
    schedule: "Wed/Fri 10:00-11:30",
    room: "Building A, Room 207",
    enrolledStudents: 32,
    maxCapacity: 40,
    faculty: "Computer Science",
    description: "Software development methodologies and project management",
    assessments: [
      { type: "Test 1", weight: 25, completed: true },
      { type: "Test 2", weight: 25, completed: false },
      { type: "Project", weight: 30, completed: false },
      { type: "Final Exam", weight: 20, completed: false },
    ],
  },
]

export default function MyCoursesPage() {
  const totalStudents = lecturerCourses.reduce((sum, course) => sum + course.enrolledStudents, 0)
  const totalCredits = lecturerCourses.reduce((sum, course) => sum + course.credits, 0)
  const averageEnrollment = Math.round(
    lecturerCourses.reduce((sum, course) => sum + (course.enrolledStudents / course.maxCapacity) * 100, 0) /
      lecturerCourses.length,
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600 mt-1">Manage your teaching assignments and course materials</p>
      </div>

      {/* Course Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lecturerCourses.length}</div>
            <p className="text-xs text-muted-foreground">Active this semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Hours</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCredits}</div>
            <p className="text-xs text-muted-foreground">Teaching load</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Enrollment</CardTitle>
            <Upload className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageEnrollment}%</div>
            <p className="text-xs text-muted-foreground">Capacity utilization</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Cards */}
      <div className="space-y-6">
        {lecturerCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Badge variant="outline">{course.code}</Badge>
                    <span className="text-lg">{course.name}</span>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {course.credits} credit{course.credits !== 1 ? "s" : ""} • {course.semester} • {course.faculty}
                  </CardDescription>
                </div>
                <Badge variant="default" className="bg-blue-100 text-blue-800">
                  {course.enrolledStudents}/{course.maxCapacity} students
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{course.description}</p>

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

              <Tabs defaultValue="assessments" className="w-full">
                <TabsList>
                  <TabsTrigger value="assessments">Assessments</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                </TabsList>

                <TabsContent value="assessments" className="space-y-3">
                  <div className="grid gap-2">
                    {course.assessments.map((assessment, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{assessment.type}</span>
                          <span className="text-sm text-gray-600">({assessment.weight}%)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {assessment.completed ? (
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          ) : (
                            <Badge variant="secondary">Pending</Badge>
                          )}
                          {!assessment.completed && (
                            <Button size="sm" variant="outline">
                              <Upload className="h-3 w-3 mr-1" />
                              Upload Marks
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="students">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{course.enrolledStudents} students enrolled</span>
                    <Button size="sm" variant="outline">
                      <Users className="h-3 w-3 mr-1" />
                      View All Students
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Users className="h-4 w-4 mr-1" />
                    View Enrollment
                  </Button>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-1" />
                    Upload Marks
                  </Button>
                </div>
                <Button size="sm">Course Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
