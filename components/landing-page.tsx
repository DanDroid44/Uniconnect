"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, CreditCard } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"

export function LandingPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">UniConnect</span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Link href="/auth/login">
                <Button variant="ghost">{t("signIn")}</Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-blue-600 hover:bg-blue-700">{t("getStarted")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            {t("welcome")} <span className="text-blue-600">UniConnect</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {t("description")}
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/auth/register">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  {t("createAccount")}
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  {t("signIn")}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="text-center">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto" />
                <CardTitle className="text-lg">{t("academicManagement")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{t("academicDescription")}</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CreditCard className="h-8 w-8 text-green-600 mx-auto" />
                <CardTitle className="text-lg">{t("financialTracking")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{t("financialDescription")}</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-purple-600 mx-auto" />
                <CardTitle className="text-lg">{t("communication")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{t("communicationDescription")}</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <GraduationCap className="h-8 w-8 text-orange-600 mx-auto" />
                <CardTitle className="text-lg">{t("multiRole")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{t("multiRoleDescription")}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* University Info */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900">{t("universityName")}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{t("universityDescription")}</p>
        </div>
      </main>
    </div>
  )
}
