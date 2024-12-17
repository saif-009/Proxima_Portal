'use client'

import { Montserrat, Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'

const montserrat = Montserrat({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

export default function ComingSoonPage() {
  const router=useRouter()
  return (
    <div
      className={`${inter.className} flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100`}
    >
      <main className="text-center">
        <h1
          className={`${montserrat.className} text-4xl md:text-6xl font-bold mb-6 text-purple-300`}
        >
          Coming Soon
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-md mx-auto text-gray-300">
          We're working hard to bring you something amazing. Stay tuned!
        </p>
      </main>
       <button
      onClick={() => router.back()}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Go Back
    </button>
      <footer className="mt-12 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Your Company Name. All rights
        reserved.
      </footer>
    </div>
  )
}
