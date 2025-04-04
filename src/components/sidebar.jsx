"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <div className="bg-black h-full p-6">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-black"
            >
              <path d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" />
            </svg>
          </div>
          <span className="text-xl font-bold">Music</span>
        </Link>
      </div>

      <nav className="space-y-1">
        <Link
          href="/"
          className={`block py-2 px-4 rounded-md transition-colors ${
            isActive("/") ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          For You
        </Link>
        <Link
          href="#"
          className={`block py-2 px-4 rounded-md transition-colors ${
            isActive("/top-tracks") ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          Top Tracks
        </Link>
        <Link
          href="/favourites"
          className={`block py-2 px-4 rounded-md transition-colors ${
            isActive("/favourites") ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          Favourites
        </Link>
        <Link
          href="/recently-played"
          className={`block py-2 px-4 rounded-md transition-colors ${
            isActive("/recently-played") ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          Recently Played
        </Link>
      </nav>
    </div>
  )
}

