import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NubiHab Inmobiliaria',
  description: 'Descubre departamentos en venta con excelentes ubicaciones, modernas amenidades y opciones para todos los estilos de vida. Encuentra el hogar ideal para ti en NubiHab Inmobiliaria.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
