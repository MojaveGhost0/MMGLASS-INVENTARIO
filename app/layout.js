import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'MMGlass C.A — Sistema de Inventario',
  description: 'Sistema de control de inventario para MMGlass C.A — Cristal, Aluminio, Acero Inoxidable',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
