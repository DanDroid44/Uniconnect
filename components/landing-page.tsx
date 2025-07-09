"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"
import {
  BookOpen,
  Calendar,
  Users,
  BarChart3,
  Star,
  ArrowRight,
  Menu,
  X,
  GraduationCap,
  Shield,
  CheckCircle,
  Globe,
  Smartphone,
  MessageSquare,
  FileText,
  TrendingUp,
} from "lucide-react"

export function LandingPage() {
  const { t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: BookOpen,
      title: "Gestão Acadêmica",
      description: "Gerencie disciplinas, conteúdos e recursos educacionais de forma integrada e eficiente",
    },
    {
      icon: BarChart3,
      title: "Acompanhamento de Notas",
      description: "Monitore notas, frequência e desempenho acadêmico em tempo real com relatórios detalhados",
    },
    {
      icon: Calendar,
      title: "Gestão de Horários",
      description: "Organize horários de aulas, provas e eventos acadêmicos seguindo o calendário moçambicano",
    },
    {
      icon: Users,
      title: "Gestão de Usuários",
      description: "Sistema completo para estudantes, professores e coordenadores com perfis personalizados",
    },
    {
      icon: Shield,
      title: "Segurança de Dados",
      description: "Proteção avançada de informações acadêmicas e pessoais com criptografia de ponta",
    },
    {
      icon: Globe,
      title: "Multilíngue",
      description: "Interface disponível em português e inglês para melhor acessibilidade",
    },
  ]

  const benefits = [
    "Redução de 80% no tempo de gestão administrativa",
    "Acesso instantâneo a informações acadêmicas",
    "Comunicação eficiente entre todos os usuários",
    "Relatórios automáticos e análises detalhadas",
    "Interface intuitiva e fácil de usar",
    "Suporte técnico especializado",
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Estudante de Ciências da Computação",
      content:
        "O UniConnect transformou completamente minha experiência universitária. Agora consigo acompanhar todas as minhas disciplinas, notas e horários em um só lugar. É incrível!",
      rating: 5,
      avatar: "MS",
    },
    {
      name: "Prof. João Santos",
      role: "Coordenador de Gestão de Negócios",
      content:
        "Como coordenador, o UniConnect me permite ter uma visão completa do desempenho dos estudantes e facilita muito a gestão do curso. Ferramenta indispensável!",
      rating: 5,
      avatar: "JS",
    },
    {
      name: "Ana Costa",
      role: "Administradora Acadêmica",
      content:
        "A plataforma reduziu significativamente nosso trabalho administrativo. Os relatórios automáticos e a gestão de usuários são excepcionais.",
      rating: 5,
      avatar: "AC",
    },
  ]

  const stats = [
    { number: "3", label: "Faculdades Atendidas" },
    { number: "500+", label: "Estudantes Ativos" },
    { number: "50+", label: "Professores" },
    { number: "99.9%", label: "Tempo de Atividade" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                UniConnect
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Recursos
              </a>
              <a
                href="#benefits"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Benefícios
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Depoimentos
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Contato
              </a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <LanguageSwitcher />
              <Link href="/auth/login">
                <Button variant="ghost" className="font-medium">
                  {t("signIn")}
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-medium">
                  {t("getStarted")}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-10 w-10"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t bg-white/95 backdrop-blur-md">
              <nav className="flex flex-col py-4 space-y-2">
                <a
                  href="#features"
                  className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-md mx-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Recursos
                </a>
                <a
                  href="#benefits"
                  className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-md mx-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Benefícios
                </a>
                <a
                  href="#testimonials"
                  className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-md mx-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Depoimentos
                </a>
                <a
                  href="#contact"
                  className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-md mx-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contato
                </a>
                <div className="flex flex-col space-y-2 pt-4 border-t mx-2">
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start font-medium">
                      {t("signIn")}
                    </Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-medium">
                      {t("getStarted")}
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm sm:text-base">
              🎓 Plataforma Universitária Oficial da UST
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Conecte, Aprenda,
              </span>
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Tenha Sucesso
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Sua plataforma completa de gestão universitária para a{" "}
              <span className="font-semibold text-blue-600">Universidade São Tomás de Moçambique</span>. Gerencie
              acadêmicos, comunicação e recursos educacionais em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto text-lg px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {t("getStarted")} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/80 backdrop-blur-sm border-2 text-lg px-8 py-3 font-medium hover:bg-white transition-all duration-200"
              >
                <Smartphone className="mr-2 w-5 h-5" />
                Ver Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 lg:mb-6">Recursos Principais</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubra todas as funcionalidades que fazem do UniConnect a escolha ideal para gestão universitária
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 group"
              >
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <CardTitle className="text-lg lg:text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8">
                Por que escolher o UniConnect?
              </h2>
              <div className="space-y-4 lg:space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-base lg:text-lg leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6 lg:space-y-8">
              <Image
                src="/images/dashboard-main.png"
                alt="Dashboard Principal UniConnect"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              <div className="text-center">
                <h3 className="text-lg lg:text-xl font-semibold mb-2">Interface Moderna e Intuitiva</h3>
                <p className="text-gray-600">Design responsivo que funciona perfeitamente em qualquer dispositivo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">Interface Responsiva</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Design moderno e adaptável para uma experiência excepcional em qualquer dispositivo
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <Image
                src="/images/dashboard-progress.png"
                alt="Dashboard de Progresso Acadêmico"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl w-full h-auto hover:scale-105 transition-transform duration-300"
              />
              <div className="text-center lg:text-left">
                <h3 className="text-lg lg:text-xl font-semibold mb-2">Dashboard Personalizado</h3>
                <p className="text-gray-600 leading-relaxed">
                  Visão geral completa com informações relevantes para cada tipo de usuário
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <Image
                src="/images/sidebar-mobile.png"
                alt="Interface Mobile Responsiva"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl w-full h-auto hover:scale-105 transition-transform duration-300"
              />
              <div className="text-center lg:text-left">
                <h3 className="text-lg lg:text-xl font-semibold mb-2">Design Mobile-First</h3>
                <p className="text-gray-600 leading-relaxed">
                  Navegação otimizada para smartphones e tablets com menu hamburger intuitivo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Features */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">Funcionalidades por Função</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cada função tem acesso a ferramentas específicas para suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Students */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-green-500">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-green-700">Estudantes</CardTitle>
                    <Badge className="mt-1 bg-green-100 text-green-700 hover:bg-green-200">Estudantes</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 text-green-600" />
                  <span>Acompanhamento de notas e progresso</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span>Horários de aulas e prazos</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-green-600" />
                  <span>Grupos de estudo e projetos</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FileText className="w-4 h-4 text-green-600" />
                  <span>Materiais de estudo e recursos</span>
                </div>
              </CardContent>
            </Card>

            {/* Lecturers */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-blue-500">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-blue-700">Professores</CardTitle>
                    <Badge className="mt-1 bg-blue-100 text-blue-700 hover:bg-blue-200">Professores</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Gestão de horários e aulas</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Correção de trabalhos e provas</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Relatórios de desempenho</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span>Comunicação com estudantes</span>
                </div>
              </CardContent>
            </Card>

            {/* Coordinators */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-violet-500">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-violet-700">Coordenadores</CardTitle>
                    <Badge className="mt-1 bg-violet-100 text-violet-700 hover:bg-violet-200">Coordenadores</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-violet-600" />
                  <span>Gestão de professores e estudantes</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 text-violet-600" />
                  <span>Aprovação de disciplinas e horários</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 text-violet-600" />
                  <span>Relatórios administrativos</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MessageSquare className="w-4 h-4 text-violet-600" />
                  <span>Comunicados em massa</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">O que nossos usuários dizem</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Depoimentos reais de estudantes, professores e administradores da UST
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription className="text-sm">{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            Pronto para transformar sua experiência universitária?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Junte-se aos estudantes, professores e administradores da UST que já utilizam o UniConnect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto text-lg px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Criar Conta Gratuita <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 bg-transparent w-full sm:w-auto text-lg px-8 py-3 font-medium transition-all duration-200"
              >
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4 lg:mb-6">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <span className="text-xl lg:text-2xl font-bold">UniConnect</span>
              </div>
              <p className="text-gray-400 mb-4 lg:mb-6 leading-relaxed">
                Plataforma oficial de gestão universitária da Universidade São Tomás de Moçambique, desenvolvida para
                otimizar a experiência acadêmica de toda a comunidade universitária.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Atendendo as faculdades de Ciências da Computação, Gestão de Negócios e Contabilidade com soluções
                tecnológicas inovadoras.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 lg:mb-6 text-lg">Plataforma</h3>
              <ul className="space-y-2 lg:space-y-3 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors duration-200">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="hover:text-white transition-colors duration-200">
                    Benefícios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Segurança
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Suporte Técnico
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 lg:mb-6 text-lg">Universidade</h3>
              <ul className="space-y-2 lg:space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Sobre a UST
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors duration-200">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Faculdades
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Calendário Acadêmico
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 lg:mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © 2024 UniConnect - Universidade São Tomás de Moçambique. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
