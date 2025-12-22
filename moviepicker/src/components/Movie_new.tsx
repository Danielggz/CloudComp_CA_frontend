import { useState } from 'react'
import axios from 'axios'

function MovieNewForm({ onCreated }: { onCreated: (title: string) => void }){
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [duration, setDuration] = useState('')
    const [director, setDirector] = useState('')
    const [resultsAPI, setResultsAPI] = useState<any[]>([]) 

    // error on api info
    const [apiError, setApiError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        axios.post('http://localhost:3000/movies', {title, year, duration, director})
        .then(function(){
            onCreated(title)

            setTitle('')
            setYear('')
            setDuration('')
            setDirector('')
        })
        .catch(error => {
            console.error("error when creating new movie", error)
        })
    }

    const searchMovieAPI = (query: string, year: string) => {
        setApiError("") // clear previous errors

        axios.get(`http://localhost:3000/movies/searchAPI?title=${query}&year=${year}`)
        .then(response => {
            var data = response.data
            setResultsAPI(data)
            console.log(data)

            if(data){
                setTitle(data.Title || "")
                setYear(data.Year || "")
                setDirector(data.Director || "")

                //Stripe 'min' from duration
                if(data.Runtime){
                    var minutes = data.Runtime.replace(/\D/g, "")
                    setDuration(minutes)
                }
            }

            if (data.Response === "False") {
                setApiError("Movie not found, try another title or specify year to get better results") 
                return 
            }
        })
        .catch(error => console.error("Error on retrieving api info: " + error))
    }

    return(
        <form className="form" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Title</label>
                <input type="text" className="form-control" id="formTitle" aria-describedby="titleHelp" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                <div id="titleHelp" className="form-text">Title of the movie</div>
            </div>
            <div className="mb-3">
                <label htmlFor="formYear" className="form-label">Year</label>
                <input type="number" className="form-control" id="formYear" aria-describedby="yearHelp" value={year} onChange={(e)=> setYear(e.target.value)}/>
                <div id="yearHelp" className="form-text">Year of release</div>
            </div>
            <div className="mb-3">
                <button type='button' className='btn btn-primary' onClick={() => searchMovieAPI(title, year)}> Search Movie </button>
                <div id="searchHelp" className="form-text">Search for existing movies</div>
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
            {apiError && ( 
                <div className="alert alert-warning mt-2"> {apiError} </div> 
            )}
        </form>
    )
   
}

export default MovieNewForm