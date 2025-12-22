import {useState, useEffect} from 'react'
import axios from 'axios'
import Movie from './Movie'
import Movie_new from './Movie_new'
import Movie_edit from './Movie_edit'

function Movielist(){

    const [movieList, setMovieList] = useState([]);
    const [editingId, setEditingId] = useState<number | null>(null)
    const [showModal, setShowModal] = useState(false)

    // message and fading in and out
    const [successMessage, setSuccessMessage] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(getMovies, []);

    function getMovies(){
        axios.get("http://localhost:3000/movies",
            {headers: {Accept: "application/json"}}).then(response => {
                console.log("The data: " + response.data);
                setMovieList(response.data);
            })
            .catch(error => {
                console.error("Error fetching results from movies", error);
            })
    }

    function deleteMovie(id: number){
        axios.delete(`http://localhost:3000/movies/${id}`)
        .then(getMovies)
        .catch(error => {console.error("Error deleting movie", error)})
    }

    return ( 
        <div className="container">

            <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add New Movie </button>
            </div>

            {/* CREATE MODAL */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }} >
                    <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                        <h5 className="modal-title">Add a New Movie</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}
                        ></button>
                        </div>

                        <div className="modal-body">
                        <Movie_new onCreated={(title: string) => {
                            getMovies()
                            setShowModal(false)

                            setSuccessMessage(`${title} added to the list!`)
                            setShowSuccess(true)

                            // Fade out after 3 seconds 
                            setTimeout(() => setShowSuccess(false), 3000) 
                            // Remove message entirely after fade-out completes 
                            setTimeout(() => setSuccessMessage(""), 3600)
                            }}
                        />
                        </div>

                    </div>
                    </div>
                </div>
            )}
            
            {/* EDIT MODAL */}
            {editingId && (
                <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                        <h5 className="modal-title">Edit Movie</h5>
                        <button type="button" className="btn-close" onClick={() => setEditingId(null)}></button>
                        </div>

                        <div className="modal-body">
                        <Movie_edit
                            movieId={editingId}
                            onUpdated={(title: string) => {
                            getMovies()
                            setEditingId(null)

                            setSuccessMessage(`${title} updated successfully`)
                            setShowSuccess(true)

                            setTimeout(() => setShowSuccess(false), 3000)
                            setTimeout(() => setSuccessMessage(""), 3600)
                            }}
                        />
                        </div>

                    </div>
                    </div>
                </div>
            )}



            {/* Show success message*/}
            {successMessage && ( 
                <div className={`alert alert-success alert-fade ${showSuccess ? "show" : ""}`}> {successMessage} </div>
            )}
            
            <table className="table table-stripped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Duration</th>
                        <th>Director</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    movieList.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center text-muted py-4">
                                No movies to display yet
                            </td>
                        </tr>
                    ) : (
                    movieList.map((movie: any) => (
                        <tr key={movie.id}>
                            <td> {movie.title} </td>
                            <td> {movie.year} </td>
                            <td> {movie.duration} </td>
                            <td> {movie.director} </td>
                            <td>
                                <>
                                    <button className="btn btn-sm btn-primary me-2" onClick={() => setEditingId(movie.id)}>Edit</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => {
                                        if(window.confirm(`Are you sure you want to delete ${movie.title}?`)){
                                            deleteMovie(movie.id)
                                        }
                                    }}>Delete </button>
                                </>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </div>
    )
}

export default Movielist