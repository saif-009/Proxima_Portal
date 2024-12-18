import { ThemeProvider } from 'next-themes'
import Header from '../(navbar)/Header'
import Navbar from '../(navbar)/Navbar'
import { Providers } from '../../../../providers/Providers'
import ProtectedRoute from '../(auth)/protectedRoute'

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex h-screen bg-gray-50 dark:bg-black">
        <Navbar />

        <main className="flex-1 w-full overflow-hidden flex flex-col">
          <Header />
          <div className="w-full overflow-x-hidden bg-gray-50 dark:bg-black -mt-4">
            <Providers>{children}</Providers>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}