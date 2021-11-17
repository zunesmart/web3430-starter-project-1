import express from 'express'

// import {indexPage} from '../controllers/index'
// import {allMoviesAPI} from '../controllers/movies'

import {indexPage, aboutPage, cForm} from '../controllers/movies'
import { contactAPI } from '../controllers/contact'
import {allMoviesAPI, oneMovieAPI,createMovieAPI,deleteMovieAPI,udateMovieAPI} from '../controllers/index'

let router = express.Router()

export function configureRoutes(app){
    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', cForm)
    //this fixes refresh problems
    router.get('/movies*', indexPage)
    router.get('/api/movies', allMoviesAPI)

    router.get('/api/movies/:id', oneMovieAPI)
    router.get('/api/movies', createMovieAPI)
    router.get('/api/movies:/id', udateMovieAPI)
    router.get('/api/movies/:id', deleteMovieAPI)

    router.post('/api/contact', contactAPI)
    app.use('/', router)
}

