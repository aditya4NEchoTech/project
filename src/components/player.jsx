"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useMusic } from "@/providers/music-provider"
import { formatTime, getAverageColor } from "@/lib/utils"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"

export default function Player() {
  const { currentSong, playNext, playPrevious, isPlaying, togglePlay } = useMusic()
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [bgColor, setBgColor] = useState("rgba(0, 0, 0, 0.8)")
  const audioRef = useRef(null)

  useEffect(() => {
    if (currentSong?.thumbnail) {
      getAverageColor(currentSong.thumbnail).then((color) => {
        setBgColor(color)
      })
    }
  }, [currentSong])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      playNext()
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("ended", handleEnded)

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error)
      })
    } else {
      audio.pause()
    }

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [isPlaying, playNext])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return

    // Reset current time when song changes
    setCurrentTime(0)

    // Play the new song if we were already playing
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error)
      })
    }
  }, [currentSong, isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const handleProgressChange = (e) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  if (!currentSong) return null

  return (
    <div
      className="bg-gradient p-4 flex flex-col md:flex-row items-center animate-slide-up"
      style={{
        background: `linear-gradient(to bottom, ${bgColor}, rgba(0, 0, 0, 0.9))`,
        backdropFilter: "blur(10px)",
      }}
    >
      <audio ref={audioRef} src={currentSong.musicUrl} preload="auto" />

      <div className="flex items-center mb-4 md:mb-0 md:w-1/3">
        <div className="w-12 h-12 mr-4">
          <Image
            src={currentSong.thumbnail || "/placeholder.svg"}
            alt={currentSong.title}
            width={48}
            height={48}
            className="rounded-md object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{currentSong.title}</h3>
          <p className="text-sm text-gray-300">{currentSong.artistName}</p>
        </div>
      </div>

      <div className="flex flex-col items-center md:w-1/3">
        <div className="player-controls flex items-center space-x-4 mb-2">
          <button onClick={playPrevious} className="text-white p-2">
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button onClick={playNext} className="text-white p-2">
            <SkipForward size={20} />
          </button>
        </div>

        <div className="w-full flex items-center space-x-2">
          <span className="text-xs text-gray-300 w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={currentSong.duration}
            value={currentTime}
            onChange={handleProgressChange}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-300 w-10">{formatTime(currentSong.duration)}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-4 md:mt-0 md:w-1/3 md:justify-end">
        <button onClick={toggleMute} className="text-white">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  )
}

