"use client"

import { useState } from "react"
import { Users, Upload, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const mockCourses = [
  {
    id: "1",
    code: "CS101",
    name: "Introduction to Programming",
    faculty: "Computer Science",
    semester: "1st Semester",
    enrolled: 45,
    capacity: 50,
    assessments: {
      completed: 3,
      total: 5,
    },
    nextClass: "2025-01-10 09:00",
    room: "Lab A-101",
  },
  {
    id: "2",
    code: "CS201",
    name: "Data Structures",
    faculty: "Computer Science",
    semester: "1st Semester",
    enrolled: 38,
    capacity: 40,
    assessments: {
      completed: 2,
      total: 4,
    },
    nextClass: "2025-01-10 11:00",
    room: "Room B-205",
  },
  {
    id: "3",
    code: "CS301",
    name: "Database Systems",
    faculty: "Computer Science",
    semester: "1st Semester",
    enrolled: 32,
    capacity: 35,
    assessments: {
      completed: 4,
      total: 6,
    },
    nextClass: "2025-01-11 14:00",
    room: "Lab C-102",
  },
]

export default function MyCoursesPage() {
  const [courses] = useState(mockCourses)

  const totalEnrolled = courses.reduce((sum, course) => sum + course.enrolled, 0)
  const totalCapacity = courses.reduce((sum, course) => sum + course.capacity, 0)
  const totalAssessments = courses.reduce((sum, course) => sum + course.assessments.total, 0)
  const completedAssessments = courses.reduce((sum, course) => sum + course.assessments.completed, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-gray-600">Manage your teaching assignments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEnrolled}</div>
            <p className="text-xs text-gray-500">of {totalCapacity} capacity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedAssessments}/{totalAssessments}
            </div>
            <p className="text-xs text-gray-500">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((totalEnrolled / totalCapacity) * 100)}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <CardDescription>
                    {course.code} • {course.semester}
                  </CardDescription>
                </div>
                <Badge variant="outline">{course.faculty}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Enrollment</span>
                  <span>
                    {course.enrolled}/{course.capacity}
                  </span>
                </div>
                <Progress value={(course.enrolled / course.capacity) * 100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Assessments</span>
                  <span>
                    {course.assessments.completed}/{course.assessments.total}
                  </span>
                </div>
                <Progress value={(course.assessments.completed / course.assessments.total) * 100} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Next: {new Date(course.nextClass).toLocaleDateString()} at{" "}
                  {new Date(course.nextClass).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>

              <div className="text-sm text-gray-600">Room: {course.room}</div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Users className="mr-2 h-4 w-4" />
                  View Students
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Marks
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Assignment grades uploaded for CS101</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New student enrolled in CS201</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Midterm exam scheduled for CS301</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
