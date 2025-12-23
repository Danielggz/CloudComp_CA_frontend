import { useEffect, useState } from "react"

function pickedMovie({ res, onClose }: { res: any, onClose: () => void }) {
    const isAPI = res.source === "omdb"
    const data = res.data

    // Delay state 
    const [revealed, setRevealed] = useState(false) 
    useEffect(() => { 
        const timer = setTimeout(() => setRevealed(true), 1500) 
        return () => clearTimeout(timer) 
    }, [])

    return (
        <div id="pickedModal" className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-xl">
            <div className="modal-content">

            <div className="modal-header">
                <h1 className="text-center modal-title ">PICK OF TODAY</h1>
                <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">

                {!revealed && (
                    <div className="text-center py-4">
                        <h4>The pick of today is...</h4>
                    </div>
                )}
                
                {revealed && (
                    <div className="fade-in">
                        {isAPI ? (
                        <>
                            {data.Poster && data.Poster !== "N/A" && (
                                <img alt="Poster" className="img-fluid d-block mx-auto mt-3"  width="300px" height="300px" src={data.Poster} />
                            )}
                        
                            <h2 className="pickedModalTitle">{data.Title}</h2>
                            <p className="text-center">{data.Plot}</p><br/>
                            <p><strong>Year:</strong> {data.Year}</p>
                            <p><strong>Runtime:</strong> {data.Runtime}</p>
                            <p><strong>Director:</strong> {data.Director}</p>
                            <p><strong>Actors:</strong> {data.Actors}</p>
                            <p><strong>IMDb Rating:</strong> {data.imdbRating}</p>

                            
                        </>
                        ) : (
                        <>
                            <h2 className="pickedModalTitle">{data.title}</h2>
                            <p><strong>Year:</strong> {data.year}</p>
                            <p><strong>Duration:</strong> {data.duration} min</p>
                            <p><strong>Director:</strong> {data.director}</p>

                            <div className="alert alert-warning mt-3">
                            No extra info found on OMDb
                            </div>
                        </>
                        )}
                    </div>
                )}

            </div>

            <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>

            </div>
        </div>
        </div>
    )
}

export default pickedMovie
