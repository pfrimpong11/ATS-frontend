'use client'

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Upload, FileText, CheckCircle, BarChart, ChevronRight, Github, Twitter, Linkedin, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useParticleAnimation} from '@/hooks/useParticleAnimation'
import {Link} from 'react-router-dom'

const LandingPage: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const particleCanvasRef = useParticleAnimation();
  const { scrollYProgress } = useScroll();
  const yPosAnim = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <canvas ref={particleCanvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-3xl font-bold tracking-tighter">
              Jobfit <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">AI</span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="hover:text-blue-400 transition-colors">About</Link>
              <Link to="/" className="hover:text-blue-400 transition-colors">Features</Link>
              <Link to="/" className="hover:text-blue-400 transition-colors">Pricing</Link>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  About
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Features
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Pricing
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </header>

        <main className="container mx-auto px-4">
          <section className="py-20 text-center">
            <motion.h1 
              className="mb-6 text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              AI-Powered Career Acceleration
            </motion.h1>
            <motion.p 
              className="mb-8 text-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Jobfit AI: Revolutionizing your job search with cutting-edge artificial intelligence.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button onClick={() => navigate('/register')} size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                Get Started
              </Button>
            </motion.div>
          </section>

          <section className="mb-20">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Upload, title: "Smart Upload", description: "AI-powered resume parsing and analysis." },
                { icon: FileText, title: "Job Matching", description: "Intelligent job description compatibility scoring." },
                { icon: CheckCircle, title: "Skill Gap Analysis", description: "Identify and bridge your skill gaps effectively." },
                { icon: BarChart, title: "Career Insights", description: "Data-driven career path recommendations." },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="rounded-lg bg-white/10 p-6 backdrop-blur-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <item.icon className="mb-4 h-12 w-12 text-blue-400" />
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-8 text-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Why Jobfit AI Stands Out</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div 
                className="rounded-lg bg-white/10 p-8 backdrop-blur-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="mb-4 text-2xl font-semibold">Next-Gen AI Technology</h3>
                <p className="mb-4">Our state-of-the-art AI algorithms provide unparalleled accuracy in resume analysis and job matching.</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-5 w-5 text-blue-400" />
                    <span>Advanced natural language processing</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-5 w-5 text-blue-400" />
                    <span>Machine learning-powered skill assessment</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-5 w-5 text-blue-400" />
                    <span>Predictive career path modeling</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div 
                className="rounded-lg bg-white/10 p-8 backdrop-blur-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="mb-4 text-2xl font-semibold">Holistic Career Development</h3>
                <p className="mb-4">Jobfit AI goes beyond resume optimization, offering comprehensive career growth support.</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-5 w-5 text-blue-400" />
                    <span>Personalized skill development plans</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-5 w-5 text-blue-400" />
                    <span>Industry trend analysis and insights</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-5 w-5 text-blue-400" />
                    <span>AI-powered interview preparation</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-8 text-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                { question: "How does Jobfit AI's technology work?", answer: "Jobfit AI utilizes advanced machine learning and natural language processing to analyze resumes and job descriptions. It identifies key skills, experiences, and qualifications, then provides tailored recommendations for optimizing your application." },
                { question: "Is my data secure with Jobfit AI?", answer: "Absolutely. We employ state-of-the-art encryption and adhere to strict privacy policies. Your data is never shared or sold to third parties, and we are fully compliant with GDPR and other data protection regulations." },
                { question: "Can Jobfit AI guarantee job offers?", answer: "While we can't guarantee job offers, Jobfit AI significantly improves your chances by optimizing your application and providing valuable insights. Our AI-powered recommendations have helped thousands of users land their dream jobs." },
                { question: "How often should I use Jobfit AI?", answer: "We recommend using Jobfit AI for each job application to tailor your resume specifically to that role. Additionally, regular use can help you stay updated on industry trends and continuously improve your career prospects." },
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="mb-20 text-center">
            <motion.div
              style={{ y: yPosAnim }}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 backdrop-blur-lg"
            >
              <h2 className="mb-4 text-4xl font-bold">Ready to Accelerate Your Career?</h2>
              <p className="mb-8 text-xl">Join thousands of professionals who've transformed their careers with Jobfit AI.</p>
              <Button onClick={() => navigate('/register')} size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                Start Your Free Trial
              </Button>
            </motion.div>
          </section>
        </main>

        <footer className="bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Jobfit AI</h3>
                <p className="text-sm text-gray-400">Revolutionizing careers with AI</p>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase text-gray-400">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Features</Link></li>
                  <li><Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Pricing</Link></li>
                  <li><Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase text-gray-400">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">About</Link></li>
                  <li><Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Careers</Link></li>
                  <li><Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase text-gray-400">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-gray-800 pt-8">
              <p className="text-sm text-gray-400">&copy; {currentYear} Jobfit AI. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Github className="h-5 w-5" />
                </Link>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default LandingPage
