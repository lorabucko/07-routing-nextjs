import type { ReactNode } from 'react'
import './globals.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import TanStackProvider from '../components/TanStackProvider/TanStackProvider'

export const metadata = {
  title: 'NoteHub',
  description: 'NoteHub – manage your personal notes efficiently',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  )
}
