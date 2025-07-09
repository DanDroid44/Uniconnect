"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Camera, Save, Loader2, GraduationCap, Building, Users } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface Profile {
  id: string
  email: string
  full_name: string | null
  role: string
  student_number: string | null
  employee_number: string | null
  phone: string | null
  address: string | null
  date_of_birth: string | null
  gender: string | null
  nationality: string | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  avatar_url: string | null
  bio: string | null
  academic_year: number | null
  gpa: number | null
  office_hours: string | null
  research_interests: string[] | null
  faculty_id: string | null
  department_id: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const supabase = createClient()

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError) throw userError

      setUser(user)

      if (user) {
        // Get profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError) {
          // If profile doesn't exist, create a basic one
          if (profileError.code === "PGRST116") {
            const { data: newProfile, error: createError } = await supabase
              .from("profiles")
              .insert({
                id: user.id,
                email: user.email || "",
                full_name: user.user_metadata?.full_name || "",
                role: user.user_metadata?.role || "student",
              })
              .select()
              .single()

            if (createError) throw createError
            setProfile(newProfile)
          } else {
            throw profileError
          }
        } else {
          setProfile(profileData)
        }
      }
    } catch (err) {
      console.error("Error loading profile:", err)
      setError(err instanceof Error ? err.message : "Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !profile) return

    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      setProfile({ ...profile, ...updates })
      setSuccess("Perfil atualizado com sucesso!")

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      console.error("Error updating profile:", err)
      setError(err instanceof Error ? err.message : "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const updates: Partial<Profile> = {
      full_name: formData.get("full_name") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      date_of_birth: formData.get("date_of_birth") as string,
      gender: formData.get("gender") as string,
      nationality: formData.get("nationality") as string,
      emergency_contact_name: formData.get("emergency_contact_name") as string,
      emergency_contact_phone: formData.get("emergency_contact_phone") as string,
      bio: formData.get("bio") as string,
    }

    // Add role-specific fields
    if (profile?.role === "student") {
      const academicYear = formData.get("academic_year")
      if (academicYear) updates.academic_year = Number.parseInt(academicYear as string)
    } else if (profile?.role === "lecturer" || profile?.role === "coordinator") {
      updates.office_hours = formData.get("office_hours") as string
      const interests = formData.get("research_interests") as string
      if (interests) {
        updates.research_interests = interests
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      }
    }

    updateProfile(updates)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "student":
        return "bg-green-100 text-green-700"
      case "lecturer":
        return "bg-blue-100 text-blue-700"
      case "coordinator":
        return "bg-violet-100 text-violet-700"
      case "admin":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "student":
        return "Estudante"
      case "lecturer":
        return "Professor"
      case "coordinator":
        return "Coordenador"
      case "admin":
        return "Administrador"
      default:
        return role
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Perfil não encontrado</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Perfil</h1>
        <p className="text-gray-600 mt-1">Gerencie suas informações pessoais e acadêmicas</p>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Summary */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto w-24 h-24 mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {profile.full_name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-transparent"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <CardTitle>{profile.full_name || "Nome não informado"}</CardTitle>
            <CardDescription>{profile.email}</CardDescription>
            <Badge className={getRoleColor(profile.role)}>{getRoleLabel(profile.role)}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.student_number && (
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Nº: {profile.student_number}</span>
              </div>
            )}

            {profile.employee_number && (
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Funcionário: {profile.employee_number}</span>
              </div>
            )}

            {profile.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{profile.phone}</span>
              </div>
            )}

            {profile.role === "student" && profile.gpa && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Média: {profile.gpa.toFixed(2)}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Atualize suas informações pessoais e de contato</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Pessoal</TabsTrigger>
                  <TabsTrigger value="contact">Contato</TabsTrigger>
                  <TabsTrigger value="academic">Acadêmico</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="full_name" className="text-sm font-medium">
                        Nome Completo
                      </label>
                      <Input
                        id="full_name"
                        name="full_name"
                        defaultValue={profile.full_name || ""}
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="date_of_birth" className="text-sm font-medium">
                        Data de Nascimento
                      </label>
                      <Input
                        id="date_of_birth"
                        name="date_of_birth"
                        type="date"
                        defaultValue={profile.date_of_birth || ""}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="gender" className="text-sm font-medium">
                        Gênero
                      </label>
                      <Select name="gender" defaultValue={profile.gender || ""}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Masculino</SelectItem>
                          <SelectItem value="female">Feminino</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="nationality" className="text-sm font-medium">
                        Nacionalidade
                      </label>
                      <Input
                        id="nationality"
                        name="nationality"
                        defaultValue={profile.nationality || "Moçambicana"}
                        placeholder="Sua nacionalidade"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium">
                      Biografia
                    </label>
                    <Textarea
                      id="bio"
                      name="bio"
                      defaultValue={profile.bio || ""}
                      placeholder="Conte um pouco sobre você..."
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Telefone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        defaultValue={profile.phone || ""}
                        placeholder="+258 84 123 4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" value={profile.email} disabled className="bg-gray-50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium">
                      Endereço
                    </label>
                    <Textarea
                      id="address"
                      name="address"
                      defaultValue={profile.address || ""}
                      placeholder="Seu endereço completo"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="emergency_contact_name" className="text-sm font-medium">
                        Contato de Emergência
                      </label>
                      <Input
                        id="emergency_contact_name"
                        name="emergency_contact_name"
                        defaultValue={profile.emergency_contact_name || ""}
                        placeholder="Nome do contato"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="emergency_contact_phone" className="text-sm font-medium">
                        Telefone de Emergência
                      </label>
                      <Input
                        id="emergency_contact_phone"
                        name="emergency_contact_phone"
                        defaultValue={profile.emergency_contact_phone || ""}
                        placeholder="+258 84 123 4567"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="academic" className="space-y-4">
                  {profile.role === "student" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="academic_year" className="text-sm font-medium">
                            Ano Acadêmico
                          </label>
                          <Select name="academic_year" defaultValue={profile.academic_year?.toString() || ""}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o ano" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1º Ano</SelectItem>
                              <SelectItem value="2">2º Ano</SelectItem>
                              <SelectItem value="3">3º Ano</SelectItem>
                              <SelectItem value="4">4º Ano</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Média Atual</label>
                          <Input value={profile.gpa ? profile.gpa.toFixed(2) : "N/A"} disabled className="bg-gray-50" />
                        </div>
                      </div>
                    </div>
                  )}

                  {(profile.role === "lecturer" || profile.role === "coordinator") && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="office_hours" className="text-sm font-medium">
                          Horário de Atendimento
                        </label>
                        <Textarea
                          id="office_hours"
                          name="office_hours"
                          defaultValue={profile.office_hours || ""}
                          placeholder="Ex: Segunda a Sexta, 14:00-16:00"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="research_interests" className="text-sm font-medium">
                          Áreas de Interesse/Pesquisa
                        </label>
                        <Textarea
                          id="research_interests"
                          name="research_interests"
                          defaultValue={profile.research_interests?.join(", ") || ""}
                          placeholder="Separe as áreas por vírgula"
                          rows={2}
                        />
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Informações do Sistema</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Membro desde</p>
                        <p>{new Date(profile.created_at).toLocaleDateString("pt-BR")}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Última atualização</p>
                        <p>{new Date(profile.updated_at).toLocaleDateString("pt-BR")}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
