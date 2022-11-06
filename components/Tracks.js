import { getTopTracks } from "../lib/spotify"
import { useEffect, useState } from "react"
export default function Track() {
  const [tracks, setTracks] = useState([])
  useEffect(() => {
    getTopTracks().then((response) => {
      const { items } = response.json()
      const tracks = items.slice(0, 10).map((track) => ({
        artist: track.artists.map((_artist) => _artist.name).join(", "),
        songUrl: track.external_urls.spotify,
        title: track.name,
      }))
      setTracks(tracks)
    })
  }, [])
  return (
    <div>
      <h1>Top Tracks</h1>
      <ul>
        {tracks.map((track) => (
          <li key={track.songUrl}>
            <a href={track.songUrl}>{track.title}</a> by {track.artist}
          </li>
        ))}
      </ul>
    </div>
  )
}
