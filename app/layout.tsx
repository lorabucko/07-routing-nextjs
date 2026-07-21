import type { ReactNode } from 'react'
import './globals.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import TanStackProvider from '../components/TanStackProvider/TanStackProvider'
type RootLayoutProps = {
  children: ReactNode
  modal: ReactNode
}

export const metadata = {
  title: 'NoteHub',
  description: 'NoteHub – manage your personal notes efficiently',
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  )
}
