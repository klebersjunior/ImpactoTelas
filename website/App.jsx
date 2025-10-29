import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Brain, 
  Heart, 
  Eye, 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Clock,
  Smartphone,
  BookOpen,
  ExternalLink,
  Download,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'overview', 'impacts', 'data', 'recommendations', 'sources']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const impactData = [
    {
      icon: Brain,
      title: "Desenvolvimento Cognitivo",
      description: "Impactos na linguagem, memória e funções executivas",
      stats: "7% redução na participação em aulas",
      color: "text-blue-600"
    },
    {
      icon: Heart,
      title: "Saúde Mental",
      description: "Depressão, ansiedade e problemas emocionais",
      stats: "Risco dobrado com >3h/dia",
      color: "text-red-600"
    },
    {
      icon: Eye,
      title: "Saúde Física",
      description: "Obesidade, problemas de sono e visão",
      stats: "46% pioram imagem corporal",
      color: "text-green-600"
    },
    {
      icon: Shield,
      title: "Segurança Online",
      description: "Cyberbullying e exposição a conteúdo inadequado",
      stats: "Brasil é 2º no ranking mundial",
      color: "text-orange-600"
    }
  ]

  const keyStats = [
    { label: "Fontes Científicas Analisadas", value: "28+", description: "Meta-análises, estudos longitudinais e relatórios oficiais" },
    { label: "Adolescentes Usam Redes Sociais", value: "95%", description: "Dos jovens de 13-17 anos usam pelo menos uma plataforma" },
    { label: "Tempo Médio Diário", value: "3.5h", description: "Acima do limite seguro de 3 horas recomendado" },
    { label: "Cyberbullying no Brasil", value: "30%", description: "Dos pais relatam filhos vítimas de cyberbullying" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-slate-900">Pesquisa Digital</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'hero', label: 'Início' },
                { id: 'overview', label: 'Visão Geral' },
                { id: 'impacts', label: 'Impactos' },
                { id: 'data', label: 'Dados' },
                { id: 'recommendations', label: 'Recomendações' },
                { id: 'sources', label: 'Fontes' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    activeSection === item.id ? 'text-blue-600' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { id: 'hero', label: 'Início' },
                { id: 'overview', label: 'Visão Geral' },
                { id: 'impacts', label: 'Impactos' },
                { id: 'data', label: 'Dados' },
                { id: 'recommendations', label: 'Recomendações' },
                { id: 'sources', label: 'Fontes' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-md"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Pesquisa Científica • Agosto 2025
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              O Impacto de Telas e Redes Sociais em{' '}
              <span className="text-blue-600">Crianças e Adolescentes</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Uma análise abrangente da evidência científica sobre os efeitos do tempo de tela 
              e uso de redes sociais no desenvolvimento infantil e adolescente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('overview')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Explorar Pesquisa
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('data')}
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Ver Dados
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Visão Geral da Pesquisa</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Esta pesquisa consolida evidências de mais de 28 fontes científicas de alta qualidade, 
              incluindo meta-análises, estudos longitudinais e relatórios de organizações como WHO, UNESCO e UNICEF.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {keyStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl font-bold text-blue-600">{stat.value}</CardTitle>
                  <CardDescription className="font-medium">{stat.label}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertTitle className="text-orange-800">Conclusão Principal</AlertTitle>
            <AlertDescription className="text-orange-700">
              <strong>Não há evidências suficientes para concluir que as redes sociais são seguras para crianças e adolescentes.</strong> 
              {' '}O parecer oficial do Cirurgião Geral dos EUA é categórico sobre esta questão.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Impacts Section */}
      <section id="impacts" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Principais Impactos Identificados</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              A pesquisa identificou impactos significativos em quatro domínios principais do desenvolvimento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactData.map((impact, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <impact.icon className={`h-8 w-8 ${impact.color}`} />
                    <div>
                      <CardTitle className="text-xl">{impact.title}</CardTitle>
                      <CardDescription>{impact.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-700 mb-1">Estatística Chave:</p>
                    <p className={`text-lg font-bold ${impact.color}`}>{impact.stats}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Section */}
      <section id="data" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Dados e Estatísticas</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Principais descobertas baseadas em evidências científicas robustas.
            </p>
          </div>

          <Tabs defaultValue="usage" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="usage">Uso</TabsTrigger>
              <TabsTrigger value="mental-health">Saúde Mental</TabsTrigger>
              <TabsTrigger value="cyberbullying">Cyberbullying</TabsTrigger>
              <TabsTrigger value="guidelines">Diretrizes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="usage" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Padrões de Uso de Redes Sociais</CardTitle>
                  <CardDescription>Dados sobre como adolescentes usam redes sociais</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Adolescentes que usam redes sociais</span>
                      <span className="text-sm text-slate-600">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Uso diário</span>
                      <span className="text-sm text-slate-600">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Uso "quase constante"</span>
                      <span className="text-sm text-slate-600">33%</span>
                    </div>
                    <Progress value={33} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mental-health" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Impactos na Saúde Mental</CardTitle>
                  <CardDescription>Estatísticas sobre efeitos psicológicos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="border-red-200 bg-red-50">
                    <Heart className="h-4 w-4 text-red-600" />
                    <AlertTitle className="text-red-800">Risco Dobrado</AlertTitle>
                    <AlertDescription className="text-red-700">
                      Adolescentes que passam mais de 3 horas por dia em redes sociais enfrentam 
                      <strong> o dobro do risco</strong> de problemas de saúde mental.
                    </AlertDescription>
                  </Alert>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">46%</p>
                      <p className="text-sm text-slate-600">Adolescentes relatam que redes sociais pioram sua imagem corporal</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">3.5h</p>
                      <p className="text-sm text-slate-600">Tempo médio diário que adolescentes passam em redes sociais</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cyberbullying" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cyberbullying no Brasil</CardTitle>
                  <CardDescription>Dados alarmantes sobre violência online</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="border-orange-200 bg-orange-50">
                    <Shield className="h-4 w-4 text-orange-600" />
                    <AlertTitle className="text-orange-800">Brasil em 2º Lugar Mundial</AlertTitle>
                    <AlertDescription className="text-orange-700">
                      O Brasil ocupa a segunda posição no ranking mundial de cyberbullying, 
                      segundo pesquisa do instituto Ipsos.
                    </AlertDescription>
                  </Alert>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-orange-600">30%</p>
                      <p className="text-sm text-slate-600">Pais relatam filhos vítimas</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-red-600">13.2%</p>
                      <p className="text-sm text-slate-600">Adolescentes ofendidos online (IBGE)</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-purple-600">20%</p>
                      <p className="text-sm text-slate-600">Faltam à escola por cyberbullying</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guidelines" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Diretrizes da OMS</CardTitle>
                  <CardDescription>Recomendações oficiais para tempo de tela</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <p className="font-medium text-red-800">Menores de 1 ano</p>
                        <p className="text-sm text-red-600">Tempo de tela sedentário NÃO é recomendado</p>
                      </div>
                      <Badge variant="destructive">0 horas</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div>
                        <p className="font-medium text-yellow-800">2-5 anos</p>
                        <p className="text-sm text-yellow-600">Máximo recomendado por dia</p>
                      </div>
                      <Badge variant="secondary">1 hora</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-blue-800">Adolescentes</p>
                        <p className="text-sm text-blue-600">Limite seguro para redes sociais</p>
                      </div>
                      <Badge variant="outline">3 horas</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Recommendations Section */}
      <section id="recommendations" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Recomendações</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Baseadas nas evidências científicas consolidadas, estas são as principais recomendações 
              para diferentes atores sociais.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Para Pais e Cuidadores</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-600">Seguir diretrizes da OMS: zero telas para menores de 1 ano, máximo 1h para 2-5 anos</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-600">Criar zonas livres de telas (quartos, refeições)</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-600">Priorizar sono adequado e atividade física</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-600">Manter diálogo aberto sobre vida online</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Para Políticas Públicas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-600">Fortalecer regulamentação de plataformas</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-600">Exigir transparência das empresas de tecnologia</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-600">Promover letramento digital nas escolas</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-600">Implementar Safety by Design</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-purple-600" />
                  <span>Para Profissionais</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-600">Incluir avaliação de mídia digital na rotina clínica</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-600">Fornecer orientação baseada em evidências</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-600">Criar ambientes escolares saudáveis</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-600">Promover atividades sem telas</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sources Section */}
      <section id="sources" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Fontes e Metodologia</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Esta pesquisa foi baseada em fontes científicas de alta qualidade e organizações 
              internacionais de referência.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Meta-análises</CardTitle>
                <CardDescription>Estudos que consolidam múltiplas pesquisas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600 mb-2">8+</p>
                <p className="text-sm text-slate-600">Incluindo JAMA Pediatrics, APA, Cureus</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estudos Longitudinais</CardTitle>
                <CardDescription>Pesquisas de acompanhamento de longo prazo</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600 mb-2">6+</p>
                <p className="text-sm text-slate-600">Até 8 anos de seguimento</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Relatórios Oficiais</CardTitle>
                <CardDescription>Organizações internacionais</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-purple-600 mb-2">14+</p>
                <p className="text-sm text-slate-600">WHO, UNESCO, UNICEF, HHS, SBP</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Principais Organizações Consultadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-900">WHO</p>
                  <p className="text-xs text-slate-600">Organização Mundial da Saúde</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-900">UNESCO</p>
                  <p className="text-xs text-slate-600">Educação e Cultura</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-900">UNICEF</p>
                  <p className="text-xs text-slate-600">Direitos da Criança</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-900">HHS</p>
                  <p className="text-xs text-slate-600">Saúde dos EUA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Smartphone className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">Pesquisa Digital</span>
            </div>
            <p className="text-slate-400 mb-6">
              Pesquisa científica sobre o impacto de telas e redes sociais em crianças e adolescentes
            </p>
            <div className="flex justify-center space-x-4 mb-6">
              <Badge variant="secondary">Manus AI</Badge>
              <Badge variant="secondary">Agosto 2025</Badge>
              <Badge variant="secondary">28+ Fontes Científicas</Badge>
            </div>
            <p className="text-sm text-slate-500">
              © 2025 Pesquisa Digital. Baseado em evidências científicas robustas para promover 
              o uso seguro e saudável da tecnologia por crianças e adolescentes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

