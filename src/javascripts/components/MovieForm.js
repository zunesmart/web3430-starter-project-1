import React, { useContext, useState } from "react";
import { MovieContext } from "./MovieList";
import { useHistory, useParams } from "react-router";
import { useFormik } from "formik";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import * as yup from 'yup'



toast.configure()

export function VHelp({message}){
    return <p className="help">{message}</p>
}

const validationSchema = yup.object({
    year: yup.number().required().min(1900, "min year 1900").max(new Date().getFullYear()),
    poster: yup.string().url().required(),
    plot: yup.string().required(),
    title: yup.string().required(),
    rating: yup.number().positive().max(10).required(),
    genre: yup.string().required(),
    rated: yup.string().required(),
    votes: yup.number().positive().integer().required(),
    reviews: yup.string().required(),
    imdbID: yup.string().required(),
    reviews: yup.string().required() 


})

export default function MovieForm() {
    let {movies, setMovies} = useContext(MovieContext)

    let {mid} = useParams()

    let movie = mid ? movies.find(m => m.id == mid) : {}
    let is_new = mid === undefined
    let {handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: is_new ? {
            title: "",
            poster: "",
            plot: "",
            year: new Date().getFullYear(),
            rated: "",
            genre: "",
            rating: "",
            votes: "",
            reviews: "",
            imdbID: ""
        } : {...movie},
        validationSchema,
        onSubmit (values) {
            fetch(`/api/movies${is_new ? '' : '/' + movie.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
              }).then(() => {
                toast('Success!', {
                  onClose: () => {
                    document.location = "/movies"
                    }
                })
              }).catch((error) => {
                toast('Failed to Submit!', {
                    onClose: () => {
                        document.location = "/movies"
                }
            })
          })
          if(is_new){
            let id = movies.length
            while(true){ 
                let mv = movies.find(m => m.id == id++)
                if(mv === undefined)break }
            values.id = id
            movies.push(values)
            } else {
                let mv = movies.find(m => m.id == movies.id)
                Object.assign(mv, values)
            }
            setMovies([...movies])
            history.push('/movies')
            toast(is_new) ? "Sucessfully added" : "Sucessfully Updated"
            }

    })




    const history = useHistory()
    const submit = e => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} >
            <h1>Adding/Edit</h1>
            <div className="field">

                <label htmlFor="title">Title</label>
                <div className="control">
                    <input type="text" name="title" value={values.title} onChange={handleChange} />
                    <VHelp message={errors.title}/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="poster">Poster</label>
                <div className="control">
                    <input type="text" name="poster" value={values.poster} onChange={handleChange} />
                    <VHelp message={errors.poster}/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="plot">Plot</label>
                <div className="control">
                    <textarea name="plot" value={values.plot} onChange={handleChange} ></textarea>
                    <VHelp message={errors.plot}/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="year">Year</label>
                <div className="control">
                    <input name="year" value={values.year} onChange={handleChange} ></input>
                    <VHelp message={errors.year}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="rated">Rated</label>
                <div className="control">
                    <input type="text" name="rated" value={values.rated} onChange={handleChange} />
                    <VHelp message={errors.rated}/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="genre">Genre</label>
                <div className="control">
                    <input type="text" name="genre" value={values.genre} onChange={handleChange} />
                    <VHelp message={errors.genre}/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="rating">Rating</label>
                <div className="control">
                    <input type="text" name="rating" value={values.rating} onChange={handleChange} />
                    <VHelp message={errors.rating}/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="votes">Votes</label>
                <div className="control">
                    <input type="text" name="votes" value={values.votes} onChange={handleChange} />
                    <VHelp message={errors.votes}/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="imdbID">IMD</label>
                <div className="control">
                    <input type="text" name="imdbID" value={values.imdbID} onChange={handleChange} />
                    <VHelp message={errors.imdbID}/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="reviews">Reviews</label>
                <div className="control">
                    <input type="text" name="reviews" value={values.reviews} onChange={handleChange} />
                    <VHelp message={errors.reviews}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="plot"></label>
                <div className="control">
                    <button className="primary" type="button">submit</button>
                    <button className="primary" onClick={()=>history.push("/movies")}>cancel</button>
                </div>
            </div>
        </form>
    )
}