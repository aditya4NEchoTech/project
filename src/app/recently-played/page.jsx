"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/components/sidebar"
import MusicList from "@/components/music-list"
import Player from "@/components/player"
import { useMusic } from "@/providers/music-provider"

export default function RecentlyPlayed() {
  const { currentSong, getRecentlyPlayed } = useMusic()
  const [recentSongs, setRecentSongs] = useState([])
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    setRecentSongs(getRecentlyPlayed())
  }, [getRecentlyPlayed])

  return (
    <main className="flex min-h-screen flex-col md:flex-row bg-gradient-to-br from-gray-900 to-black text-white">
      <div className={`md:block ${showMenu ? "block" : "hidden"} md:w-64 w-full`}>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Recently Played</h1>
            <button className="md:hidden block p-2" onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? "✕" : "☰"}
            </button>
          </div>
          {recentSongs.length > 0 ? (
            <MusicList songs={recentSongs} />
          ) : (
            <div className="text-center py-10 text-gray-400">
              <p>No recently played songs.</p>
              <p className="mt-2">Play some songs to see them here.</p>
            </div>
          )}
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

