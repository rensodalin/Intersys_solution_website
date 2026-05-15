import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'

interface InsightsDetailProps {
  title: string
  category: string
  date: string
  image: string
  content: React.ReactNode
}

export function InsightsDetail({ title, category, date, image, content }: InsightsDetailProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header / Back Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            to="/insights" 
            className="flex items-center gap-2 text-sm font-bold hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Insights
          </Link>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <header className="pt-40 pb-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm">
                {category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] text-[#0A0A0A]">
                {title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-gray-500 font-medium border-t border-gray-200 pt-8">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-600" />
                  {date}
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-blue-600" />
                  By Intersys Engineering
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <section className="container mx-auto px-6 -mt-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="aspect-[21/9] rounded-sm overflow-hidden shadow-2xl"
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </motion.div>
      </section>

      {/* Content Area */}
      <main className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto prose prose-lg prose-blue">
          {content}
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to start your project?</h2>
          <Link 
            to="/contact"
            className="inline-block bg-black text-white px-10 py-4 font-bold text-sm hover:bg-blue-600 transition-all"
          >
            Contact Our Team
          </Link>
        </div>
      </footer>
    </div>
  )
}
