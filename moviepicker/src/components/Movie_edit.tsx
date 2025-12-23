import { useState, useEffect } from 'react'
import axios from 'axios'

function MovieEditForm({
  movieId,
  onUpdated
}: {
  movieId: number
  onUpdated: (title: string) => void
}) {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [duration, setDuration] = useState('')
  const [director, setDirector] = useState('')
  const [loading, setLoading] = useState(true)

  // Load movie data when modal opens
  useEffect(() => {
    axios
      .get(`http://100.52.28.229/movies/${movieId}`)
      .then(res => {
        const m = res.data
        setTitle(m.title)
        setYear(m.year)
        setDuration(m.duration)
        setDirector(m.director)
        setLoading(false)
      })
      .catch(err => console.error("Error loading movie:", err))
  }, [movieId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    axios
      .put(`http://100.52.28.229/movies/${movieId}`, {
        title,
        year,
        duration,
        director
      })
      .then(() => {
        onUpdated(title)
      })
      .catch(err => console.error("Error updating movie:", err))
  }

  if (loading) return <div>Loading...</div>

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Year</label>
        <input
          type="number"
          className="form-control"
          value={year}
          onChange={e => setYear(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Duration</label>
        <input
          type="number"
          className="form-control"
          value={duration}
          onChange={e => setDuration(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Director</label>
        <input
          type="text"
          className="form-control"
          value={director}
          onChange={e => setDirector(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>
    </form>
  )
}

export default MovieEditForm
