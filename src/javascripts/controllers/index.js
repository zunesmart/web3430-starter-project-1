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