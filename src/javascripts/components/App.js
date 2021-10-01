import React from "react"
import MovieList from "./MovieList"
import { BrowserRouter as Router } from "react-router-dom"


export default function Main() {
    return (
        <Router>
        <div className="container">
            <header>
            <MovieList />
            <h1>Top 10 Movies : <i>Jason Ure</i></h1>
            </header>
        </div>
        <footer>@copy: All rights reserved</footer>
        </Router>
    )
}