"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { songsData } from "@/data/songs"


// Create context with a default undefined value, but with type
const MusicContext = createContext(undefined)


export function MusicProvider({ children }) {
  const [songs, setSongs] = useState(songsData)
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [favourites, setFavourites] = useState([])
  const [recentlyPlayed, setRecentlyPlayed] = useState([])

  // Load favourites from localStorage on mount
  useEffect(() => {
    try {
      const storedFavourites = localStorage.getItem("favourites")
      if (storedFavourites) {
        setFavourites(JSON.parse(storedFavourites))
      }

      const storedRecentlyPlayed = sessionStorage.getItem("recentlyPlayed")
      if (storedRecentlyPlayed) {
        setRecentlyPlayed(JSON.parse(storedRecentlyPlayed))
      }
    } catch (error) {
      console.error("Error loading data from storage:", error)
    }
  }, [])

  const playSong = (song) => {
    setCurrentSong(song)
    setIsPlaying(true)

    // Add to recently played
    const newRecentlyPlayed = [song.id, ...recentlyPlayed.filter((id) => id !== song.id)].slice(0, 10) // Keep only the last 10

    setRecentlyPlayed(newRecentlyPlayed)
    try {
      sessionStorage.setItem("recentlyPlayed", JSON.stringify(newRecentlyPlayed))
    } catch (error) {
      console.error("Error saving to sessionStorage:", error)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const playNext = () => {
    if (!currentSong) return

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % songs.length
    playSong(songs[nextIndex])
  }

  const playPrevious = () => {
    if (!currentSong) return

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length
    playSong(songs[previousIndex])
  }

  const toggleFavourite = (song) => {
    let newFavourites

    if (favourites.includes(song.id)) {
      newFavourites = favourites.filter((id) => id !== song.id)
    } else {
      newFavourites = [...favourites, song.id]
    }

    setFavourites(newFavourites)
    try {
      localStorage.setItem("favourites", JSON.stringify(newFavourites))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  const isFavourite = (song) => {
    return favourites.includes(song.id)
  }

  const getFavouriteSongs = ()=> {
    return songs.filter((song) => favourites.includes(song.id))
  }

  const getRecentlyPlayed = () => {
    return recentlyPlayed
      .map((id) => songs.find((song) => song.id === id))
      .filter((song) => song !== undefined)
  }

  const contextValue= {
    songs,
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
    playNext,
    playPrevious,
    toggleFavourite,
    isFavourite,
    getFavouriteSongs,
    getRecentlyPlayed,
  }

  return <MusicContext.Provider value={contextValue}>{children}</MusicContext.Provider>
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}

