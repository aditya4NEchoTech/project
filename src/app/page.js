"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/components/sidebar"
import MusicList from "@/components/music-list"
import Player from "@/components/player"
import { useMusic } from "@/providers/music-provider"
import { searchSongs } from "@/lib/utils"

export default function Home() {
  const { currentSong, songs } = useMusic()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredSongs, setFilteredSongs] = useState(songs)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    setFilteredSongs(searchSongs(songs, searchQuery))
  }, [searchQuery, songs])

  return (
    <main className="flex min-h-screen flex-col md:flex-row bg-gradient-to-br from-gray-900 to-black text-white">
      <div className={`md:block ${showMenu ? "block" : "hidden"} md:w-64 w-full`}>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">For You</h1>
            <button className="md:hidden block p-2" onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? "✕" : "☰"}
            </button>
          </div>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Song, Artist"
                className="w-full bg-gray-800 rounded-full py-2 px-4 pl-10 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <MusicList songs={filteredSongs} />
        </div>
      </div>
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <Player />
        </div>
      )}
    </main>
  )
}

