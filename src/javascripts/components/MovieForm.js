import React, { useContext, useState } from "react";
import { MovieContext } from "./MovieList";
import { useHistory, useParams } from "react-router";
export default function MovieForm() {
    let {movies, setMovies} = useContext(MovieContext)

    let {mid} = useParams()

    let movie = mid ? movies.find(m => m.id == mid) : {}
    let [title, setTitle] = useState(movie.title)
    let [poster, setPoster] = useState(movie.poster)
    let [plot, setPlot] = useState(movie.plot)

    let [year, setYear] = useState(movie.year)
    let [rated, setRated] = useState(movie.rated)
    let [genre, setGenre] = useState(movie.genre)

    let [rating, setRating] = useState(movie.rating)
    let [votes, setVotes] = useState(movie.votes)
    let [imdbID, setimdbID] = useState(movie.imdbID)
    let [reviews, setReviews] = useState(movie.reviews)



    const history = useHistory()
    const submit = e => {
        e.preventDefault()
    }

    return (
        <form onSubmit={submit}>
            <h1>Adding/Edit</h1>
            <div className="field">
            
                <label htmlFor="title">Title</label>
                <div className="control">
                    <input type="text" name="title" value={title} onChange={e=> setTitle(e.target.value)} />
                    <p className="help">Title is required</p>
                </div>
            </div>
            <div className="field">
                <label htmlFor="poster">Poster</label>
                <div className="control">
                    <input type="text" name="poster" value={poster} onChange={e=> setPoster(e.target.value)} />
                    <p className="help">Poster is Required</p>
                </div>
            </div>
            <div className="field">
                <label htmlFor="plot">Plot</label>
                <div className="control">
                    <textarea name="plot" value={plot} onChange={e=> setPlot(e.target.value)} ></textarea>
                    <p className="help">Plot is Required</p>
                </div>
            </div>
            <div className="field">
                <label htmlFor="year">Year</label>
                <div className="control">
                    <input name="year" value={year} onChange={e=> setYear(e.target.value)} ></input>
                    <p className="help">Year is Required</p>
                </div>
            </div>

            <div className="field">
                <label htmlFor="rated">Rated</label>
                <div className="control">
                    <input type="text" name="rated" value={rated} onChange={e=> setRated(e.target.value)} />
                    <p className="help">Rated is Required</p>
                </div>
            </div>
            <div className="field">
                <label htmlFor="genre">Genre</label>
                <div className="control">
                    <input type="text" name="genre" value={genre} onChange={e=> setGenre(e.target.value)} />
                    <p className="help">Poster is Required</p>
                </div>
            </div>
            <div className="field">
                <label htmlFor="rating">Rating</label>
                <div className="control">
                    <input type="text" name="rating" value={rating} onChange={e=> setRating(e.target.value)} />
                    <p className="help">Poster is Required</p>
                </div>
            </div>
            <div className="field">
                <label htmlFor="votes">Votes</label>
                <div className="control">
                    <input type="text" name="votes" value={votes} onChange={e=> setVotes(e.target.value)} />
                    <p className="help">Poster is Required</p>
                </div>
            </div>
            <div className="field">
                <label htmlFor="imdbID">IMD</label>
                <div className="control">
                    <input type="text" name="imdbID" value={imdbID} onChange={e=> setimdbID(e.target.value)} />
                    <p className="help">Poster is Required</p>
                </div>
            </div>
            <div className="field">
                <label htmlFor="reviews">Reviews</label>
                <div className="control">
                    <input type="text" name="Reviews" value={reviews} onChange={e=> setReviews(e.target.value)} />
                    <p className="help">Poster is Required</p>
                </div>
            </div>

            <div className="field">
                <label htmlFor="plot"></label>
                <div className="control">
                    <button className="primary">submit</button>
                    <button className="primary" onClick={()=>history.push("/movies")}>cancel</button>
                </div>
            </div>
        </form>
    )
}