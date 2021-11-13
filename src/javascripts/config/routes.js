import express from 'express'

// import {indexPage} from '../controllers/index'
// import {allMoviesAPI} from '../controllers/movies'
import {indexPage} from '../controllers/movies'
import {allMoviesAPI} from '../controllers/index'

let router = express.Router()

export function configureRoutes(app){
    router.get('/', indexPage)
    // router.get('/', about)
    //this fixes refresh problems
    router.get('/movies*', indexPage)
    router.get('/api/movies', allMoviesAPI)

    app.use('/', router)
}

