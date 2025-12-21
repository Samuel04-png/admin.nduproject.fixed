import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Sparkles, Code, Smartphone, Briefcase, Building2, Zap, Shield, Globe, Users, TrendingUp, FileCheck, UserCheck, GitBranch, History, Filter, Settings, ExternalLink } from 'lucide-react'
import { caseStudies } from '@/data/caseStudies'
import { getImagePath } from '@/utils/imageUtils'

export function HomePage() {
  const featuredCaseStudies = caseStudies.slice(0, 3)

  const services = [
    {
      icon: Globe,
      title: 'Website Development',
      description: 'Responsive, fast, secure websites—from landing pages to portals.',
      link: '/services',
      color: 'text-blue-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native iOS & Android with clean UI/UX and offline capability.',
      link: '/services',
      color: 'text-green-500'
    },
    {
      icon: Briefcase,
      title: 'IT & Digital Consultancy',
      description: 'Tech stack advisory, project roadmapping, cloud & security reviews.',
      link: '/services',
      color: 'text-purple-500'
    },
    {
      icon: Building2,
      title: 'Enterprise Systems',
      description: 'ERP, POS, HR, or School Management Systems.',
      link: '/services',
      color: 'text-orange-500'
    },
  ]

  const features = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Agile development process ensuring quick time-to-market'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and 99.9% uptime guarantee'
    },
    {
      icon: Code,
      title: 'Modern Tech Stack',
      description: 'Built with cutting-edge technologies and best practices'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Experienced developers and strategists at your service'
    },
    {
      icon: TrendingUp,
      title: 'Scalable Solutions',
      description: 'Solutions that grow with your business needs'
    },
    {
      icon: Sparkles,
      title: 'Custom Solutions',
      description: 'Tailored to your unique business requirements'
    },
  ]

  return (
    <div className="min-h-screen relative">
      {/* Particle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 particle-background"></div>
      </div>
      
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background/95 via-background/95 to-primary/10 py-12 sm:py-16 md:py-20 lg:py-32 backdrop-blur-sm">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/15 border-2 border-primary/30 text-xs sm:text-sm font-semibold text-primary mb-2 sm:mb-4 shadow-sm">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="whitespace-nowrap">PACRA Certified • Trusted by 50+ Businesses</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Digital Solutions That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-purple-600">
                Drive Growth
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
              We build custom websites, mobile apps, and enterprise systems that help African businesses 
              digitize operations, improve efficiency, and scale sustainably.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4 px-4">
              <Button 
                asChild 
                size="lg" 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-200 text-base px-8 py-6"
              >
                <Link to="/services" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 text-base px-8 py-6 font-semibold"
              >
                <Link to="/case-studies" className="flex items-center gap-2">
                  View Our Work
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 sm:pt-12 mt-8 sm:mt-12 border-t px-4">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground mt-1">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground mt-1">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground mt-1">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground mt-1">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 animate-fade-in"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${service.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" className="w-full group-hover:text-primary font-semibold">
                      <Link to={service.link} className="flex items-center justify-center gap-2">
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl hover:shadow-primary/50"
            >
              <Link to="/services" className="flex items-center gap-2">
                View All Services & Pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Why Choose <span className="text-primary">Byte&Berry</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              We combine technical expertise with business acumen to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors shadow-sm">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* TengaLoans Product Showcase */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary/5 via-muted/30 to-primary/5 overflow-hidden">
        {/* Floating Watermark Badge */}
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 animate-fade-in">
          <a 
            href="https://tengaloans.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 animate-pulse hover:animate-none"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="font-bold text-xs sm:text-sm md:text-base whitespace-nowrap">Try TengaLoans</span>
            <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-80 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Hero Header */}
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border-2 border-primary/30 text-sm font-semibold text-primary mb-4 shadow-sm">
              <Sparkles className="h-4 w-4" />
              <span>Our Flagship SaaS Product</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-purple-600">TengaLoans</span>
              <span className="block sm:inline"> – Smart Loan Management</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
              A modern, automated loan processing platform built by Byte & Berry.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              TengaLoans revolutionizes loan management with comprehensive tracking, automated status updates, and seamless customer integration. 
              Our platform enables businesses to manage the complete loan lifecycle—from application to settlement—with intelligent workflow automation, 
              real-time payment history tracking, and powerful admin controls. Experience a clean, intuitive dashboard that simplifies complex loan operations 
              while maintaining full visibility and control over every transaction.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-2xl mx-auto italic">
              TengaLoans is proudly built by Byte & Berry as part of our mission to create modern business automation software.
            </p>
          </div>

          {/* Creative Screenshot Gallery */}
          <div className="mb-12 sm:mb-16">
            <div className="relative max-w-6xl mx-auto">
              {/* Main Featured Image - Center */}
              <div className="mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <Card className="group relative overflow-hidden border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 shadow-2xl hover:shadow-primary/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <div className="relative">
                    <img 
                      src={getImagePath('tengaloans/thumbnail.png')} 
                      alt="TengaLoans Dashboard Preview"
                      className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.currentTarget
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-64 flex items-center justify-center text-muted-foreground">Image not available</div>'
                        }
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">Dashboard Preview</h3>
                      <p className="text-sm sm:text-base opacity-90">Clean, intuitive dashboard with real-time loan overview</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Side-by-Side Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {[
                  {
                    image: 'tengaloans/loanspage.png',
                    caption: 'Loans Page',
                    description: 'Comprehensive loan management with smart filtering',
                    rotation: 'rotate-[-2deg]',
                    delay: '0.2s'
                  },
                  {
                    image: 'tengaloans/loandetails.png',
                    caption: 'Loan Details Page',
                    description: 'Detailed loan information and payment tracking',
                    rotation: 'rotate-[2deg]',
                    delay: '0.3s'
                  }
                ].map((screenshot, index) => (
                  <Card 
                    key={index}
                    className={`group relative overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-primary/10 animate-fade-in ${screenshot.rotation} hover:rotate-0`}
                    style={{ animationDelay: screenshot.delay }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <div className="relative">
                      <img 
                        src={getImagePath(screenshot.image)} 
                        alt={screenshot.caption}
                        className="w-full h-auto object-cover group-hover:scale-[1.05] transition-transform duration-700"
                        loading="lazy"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          const target = e.currentTarget
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = '<div class="w-full h-48 flex items-center justify-center text-muted-foreground">Image not available</div>'
                          }
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6 text-white">
                        <h3 className="text-lg sm:text-xl font-bold mb-1">{screenshot.caption}</h3>
                        <p className="text-xs sm:text-sm opacity-90">{screenshot.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 animate-fade-in">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">TengaLoans</span>?
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
                Powerful features designed to streamline your loan management process
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: FileCheck,
                  title: 'Automated Loan Status Tracking',
                  description: 'Real-time status updates with intelligent workflow automation',
                  gradient: 'from-blue-500/20 to-primary/20'
                },
                {
                  icon: UserCheck,
                  title: 'Integrated Customer Profiles',
                  description: 'Seamless customer linkage with comprehensive profile management',
                  gradient: 'from-green-500/20 to-primary/20'
                },
                {
                  icon: GitBranch,
                  title: 'Full Loan Lifecycle Management',
                  description: 'Complete control from application to settlement and beyond',
                  gradient: 'from-purple-500/20 to-primary/20'
                },
                {
                  icon: History,
                  title: 'Payment History & Updates',
                  description: 'Track every payment with detailed history and automated notifications',
                  gradient: 'from-orange-500/20 to-primary/20'
                },
                {
                  icon: Filter,
                  title: 'Smart Filtering',
                  description: 'Filter loans by status: Active, Settled, Rejected, or Defaulted',
                  gradient: 'from-cyan-500/20 to-primary/20'
                },
                {
                  icon: Settings,
                  title: 'Admin Tools & CRUD Support',
                  description: 'Comprehensive admin controls with full create, read, update, and delete capabilities',
                  gradient: 'from-pink-500/20 to-primary/20'
                }
              ].map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card 
                    key={index} 
                    className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-in border-2 hover:border-primary/50 bg-gradient-to-br hover:from-primary/5 hover:to-transparent"
                    style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <CardHeader className="relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-primary/10 to-purple-600/10 border-2 border-primary/30 shadow-2xl animate-fade-in">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
            
            {/* Built by Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 text-xs sm:text-sm text-muted-foreground font-semibold shadow-sm">
              <Sparkles className="h-3 w-3 text-primary" />
              <span>Built by Byte & Berry</span>
            </div>

            <CardContent className="relative z-10 pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-8">
              <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                    Experience how modern businesses manage loans.
                  </h3>
                  <p className="text-lg sm:text-xl text-muted-foreground">
                    Try TengaLoans for free and transform your loan management process.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-2xl hover:shadow-primary/50 transition-all duration-300 text-base px-10 py-7 hover:scale-105 hover:-translate-y-1"
                  >
                    <a 
                      href="https://tengaloans.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Sparkles className="h-5 w-5" />
                      Try TengaLoans Free
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </Button>
                  <p className="text-xs sm:text-sm text-muted-foreground/70">
                    No credit card required • Instant access
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              See how we've helped businesses transform their digital presence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {featuredCaseStudies.map((study, index) => (
              <Card 
                key={study.id} 
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  {study.images[0] && (
                    <img 
                      src={getImagePath(study.images[0])} 
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.currentTarget
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-muted-foreground">Image not available</div>'
                        }
                      }}
                    />
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors font-bold">
                    {study.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {study.shortDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white font-semibold">
                    <Link to={`/case-studies/${study.id}`} className="flex items-center justify-center gap-2">
                      View Case Study
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              asChild 
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
            >
              <Link to="/case-studies" className="flex items-center gap-2">
                View All Case Studies
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-2">
              Ready to Transform Your Business?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-2">
              Let's discuss how we can help you achieve your digital goals. Get started with a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4 px-4">
              <Button 
                asChild 
                size="lg" 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-200 text-base px-8 py-6"
              >
                <Link to="/services" className="flex items-center gap-2">
                  Get Started Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 text-base px-8 py-6 font-semibold"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Contact Us
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}

