import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { ArrowLeft, GraduationCap } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>

          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UniConnect
            </h1>
          </div>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Footer */}
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
              Criar conta
            </Link>
          </p>

          <div className="text-xs text-gray-500">
            <p>Universidade São Tomás de Moçambique</p>
            <p>Sistema de Gestão Universitária</p>
          </div>
        </div>
      </div>
    </div>
  )
}
