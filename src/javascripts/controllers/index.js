// creates the api
import {Movie} from '../models/movies'

export const allMoviesAPI = (req, res, next) => {
    Movie.find().select('-revies').exec((err, movies)=> {
        if(err){
            res.json({success: false, message: "Query failed"})
            res.end()
        }else {
            res.write(JSON.stringify(movies))
            res.end()
        }
        }
    )
}

export const oneMovieAPI = (req, res, next) => {
    Movie.find({_id: req.params.id}).select('-revies').exec((err, movies)=> {
        if(err){
            res.json({success: false, message: "Query failed"})
            res.end()
        }else {
            res.write(JSON.stringify(movie))
            res.end()
        }
        }
    )
}

export const createMovieAPI = (req, res, next) => {
    let movie = new Movie(req.body)
    movie.add_at = new Date()
    movie.updated_at = new Date()
    Movie.save( err => {
        if(err){
            res.json({success: false, message: "Movie Create failed"})
            res.end()
        }else {
            res.end()
        }
        }
    )
}

export const updateMovieAPI = (req, res, next) => {
    Movie.find({_id: req.params.id}).select('-revies').exec((err, movies)=> {
        if(err){
            res.json({success: false, message: "Unable to update"})
            res.end()
        }else {
            Object.assign(movie, req.body)
            movie.updated_at = new Date()
            Movie.save( err => {
                if(err){
                    res.json({success: false, message: "Movie update failed"})
                    res.end()
                }else {
                    res.end()
                }
                })
        }
        }
    )
}

export const deleteMovieAPI = (req, res, next) => {
    Movie.find({_id: req.params.id}).select('-revies').exec((err, movies)=> {
        if(err){
            res.json({success: false, message: "Unable to delete"})
            res.end()
        }else {
            Movie.findByIdAndDelete(req.params.id,  err => {
                if(err){
                    res.json({success: false, message: "Movie update delete"})
                    res.end()
                }else {
                    res.end()
                }
                })
        }
        }
    )
}