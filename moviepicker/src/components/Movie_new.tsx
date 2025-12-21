import { useState } from 'react'
import axios from 'axios'

function MovieNewForm({ onCreated }: { onCreated: () => void }){
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [duration, setDuration] = useState('')
    const [director, setDirector] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        axios.post('http://localhost:3000/movies', {title, year, duration, director})
        .then(function(){
            setTitle('')
            setYear('')
            setDuration('')
            setDirector('')
        })
        .catch(error => {
            console.error("error when creating new movie", error)
        })
    }

    return(
        <form className="form">
            <div className="mb-3">
                <label htmlFor="" className="form-label">Title</label>
                <input type="text" className="form-control" id="formTitle" aria-describedby="titleHelp" value={title} onChange={(e)=> setTitle(e.target.value)}/>
                <div id="titleHelp" className="form-text">Title of the movie</div>
            </div>
            <div className="mb-3">
                <label htmlFor="formYear" className="form-label">Year</label>
                <input type="number" className="form-control" id="formYear" aria-describedby="yearHelp" value={year} onChange={(e)=> setYear(e.target.value)}/>
                <div id="yearHelp" className="form-text">Year of release</div>
            </div>
            <div className="mb-3">
                <label htmlFor="formDuration" className="form-label">Duration</label>
                <input type="number" className="form-control" id="formDuration" aria-describedby="durationHelp" value={duration} onChange={(e)=> setDuration(e.target.value)}/>
                <div id="durationHelp" className="form-text">Duration in minutes</div>
            </div>
            <div className="mb-3">
                <label htmlFor="formDirector" className="form-label">Director</label>
                <input type="text" className="form-control" id="formDirector" aria-describedby="directorHelp" value={director} onChange={(e)=> setDirector(e.target.value)}/>
                <div id="directorHelp" className="form-text">Director of the movie</div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
   
}

export default MovieNewForm