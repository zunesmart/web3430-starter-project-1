let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')

// import { Server } from 'http'
// connect to the database
import {Movie} from './src/javascripts/models/movies'

import {connect} from './src/javascripts/config/db/connect'
connect("mongodb://localhost:27017/topMovies")

// web server express
export let app = express()

app.set('views', path.join(__dirname, 'src', 'javascripts', 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Routing
import {configureRoutes} from './src/javascripts/config/routes'
configureRoutes(app)


// Handling errors
app.use(function(req, res, next){
    res.render('layout',{content:'error',err: createError(404), title: 'Top 10 Movies'})
})

app.use(function(err,req,res,next){
    res.status(err.status || 500)
    //redering page error as object
    res.render('layout',{content:'error', err: err, title: 'Top 10 Movies'})
})

//create the web Server
let http = require('http')
let server = http.createServer(app)
server.listen(process.env.PORT || '8080')
server.on('error', err => {
    throw err 
})

server.on('listening', () => {
    let address = server.address()
    let bind = typeof address === 'string' ? address : address.port 
    console.log("Listening on " + bind)
})

Movie.find().exec((err, movies) => {
    if(err){
        console.log(err)
    }
    else{
        console.log(movies)
    }
})

