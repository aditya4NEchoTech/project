import { Inter } from "next/font/google"
import "./globals.css"
import { MusicProvider } from "@/providers/music-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Music Player",
  description: "A custom music player application",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  )
}

