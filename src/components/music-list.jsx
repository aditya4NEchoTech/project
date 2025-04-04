"use client"

import { useState } from "react"
import Image from "next/image"
import { useMusic } from "@/providers/music-provider"
import { formatTime } from "@/lib/utils"
import { MoreVertical, Heart } from "lucide-react"

export default function MusicList({ songs }) {
  const { currentSong, playSong, toggleFavourite, isFavourite } = useMusic()
  const [menuOpen, setMenuOpen] = useState(null)

  const handlePlay = (song) => {
    playSong(song)
  }

  const toggleMenu = (index) => {
    if (menuOpen === index) {
      setMenuOpen(null)
    } else {
      setMenuOpen(index)
    }
  }

  return (
    <div className="space-y-2 animate-fade-in">
      {songs.map((song, index) => (
        <div
          key={song.id}
          className={`song-item flex items-center p-2 rounded-md ${currentSong?.id === song.id ? "active" : ""}`}
        >
          <div className="flex-shrink-0 mr-4 w-12 h-12 relative">
            <Image
              src={song.thumbnail || "/placeholder.svg"}
              alt={song.title}
              width={48}
              height={48}
              className="rounded-md object-cover"
            />
            {currentSong?.id === song.id && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
          <div className="flex-1 cursor-pointer" onClick={() => handlePlay(song)}>
            <h3 className="font-medium">{song.title}</h3>
            <p className="text-sm text-gray-400">{song.artistName}</p>
          </div>
          <div className="text-gray-400 mr-4">{formatTime(song.duration)}</div>
          <div className="relative">
            <button onClick={() => toggleMenu(index)} className="p-2 text-gray-400 hover:text-white">
              <MoreVertical size={18} />
            </button>
            {menuOpen === index && (
              <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-md shadow-lg z-10 animate-fade-in">
                <button
                  onClick={() => {
                    toggleFavourite(song)
                    setMenuOpen(null)
                  }}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700"
                >
                  <Heart size={16} className={`mr-2 ${isFavourite(song) ? "fill-red-500 text-red-500" : ""}`} />
                  {isFavourite(song) ? "Remove from Favourites" : "Add to Favourites"}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      {songs.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <p>No songs found.</p>
        </div>
      )}
    </div>
  )
}

