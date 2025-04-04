export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }
  
  export function searchSongs(songs, query) {
    if (!query.trim()) return songs
  
    const lowerCaseQuery = query.toLowerCase()
    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(lowerCaseQuery) || song.artistName.toLowerCase().includes(lowerCaseQuery),
    )
  }
  
  export async function getAverageColor(imageUrl) {
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = imageUrl
  
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")
  
        if (!context) {
          resolve("rgba(0, 0, 0, 0.8)")
          return
        }
  
        const width = img.width
        const height = img.height
  
        canvas.width = width
        canvas.height = height
  
        context.drawImage(img, 0, 0, width, height)
  
        try {
          const imageData = context.getImageData(0, 0, width, height).data
  
          let r = 0,
            g = 0,
            b = 0
          const pixelCount = width * height
  
          for (let i = 0; i < imageData.length; i += 4) {
            r += imageData[i]
            g += imageData[i + 1]
            b += imageData[i + 2]
          }
  
          r = Math.floor(r / pixelCount)
          g = Math.floor(g / pixelCount)
          b = Math.floor(b / pixelCount)
  
          // Darken the color for better contrast with white text
          const darkenFactor = 0.6
          r = Math.floor(r * darkenFactor)
          g = Math.floor(g * darkenFactor)
          b = Math.floor(b * darkenFactor)
  
          resolve(`rgba(${r}, ${g}, ${b}, 0.8)`)
        } catch (error) {
          console.error("Error getting average color:", error)
          resolve("rgba(0, 0, 0, 0.8)")
        }
      }
  
      img.onerror = () => {
        resolve("rgba(0, 0, 0, 0.8)")
      }
    })
  }
  
  