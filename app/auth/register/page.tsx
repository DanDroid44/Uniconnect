"use client"

import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">UniConnect</h1>
          <p className="text-gray-600">Your University Management Platform</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
