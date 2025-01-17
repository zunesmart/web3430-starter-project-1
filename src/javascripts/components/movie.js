import React, { useContext, useState } from "react"
import {FaThumbsUp} from 'react-icons/fa'
import { useHistory } from "react-router-dom"
import {format} from 'date-fns'
import Modal from 'react-modal'
import { MovieContext } from './MovieList'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


export default function Movie(props) {
    let { movies, setMovies } = useContext(MovieContext)
    let [modalOpen, setModalOpen] = useState(false)

    const history = useHistory() 
    const onLike = props.onLike
    const m = props.movie
    const deleteMovie = () => {
      for(let i in movies){
        if(movies[i].id === m.id){
          movies.splice(+i,1)
        }
      }
      setMovies([...movies])
      setModalOpen(false)
      history.push('./movies')
      toast('Movies successfully deleted')
    }
    return (
      <>
        <div className="card"> 
          <img src={m.poster} alt={m.title}/>
          <h2>{m.title}</h2>
          <p>{m.plot}</p><strong>Release date</strong>: 
          {/* {format(m.releaseDate, "MM/dd/yyyy")} */}
          <p>{m.year}</p>
          <ul className="extra">
            

              <li><strong>{m.votes}</strong> Votes</li>
              <li><strong>{m.rating}</strong> Rating</li> 
              
              <li>
                <FaThumbsUp color="maroon" onClick={onLike}/><small> {m.likes ? m.likes : 0}</small>
              </li>
          </ul>
          <div className="text-center">
          <button className="primary" onClick={()=> history.push(`/movies/${m.id}/edit`)}>Edit</button>
          <button className="primary" onClick={() => setModalOpen(true)}>Delete</button>
          </div>
        </div>

        <Modal isOpen={modalOpen} onRequestClose={()=> setModalOpen(false)} style={customStyles} contentLable="Are You Sure?">
          <p>Are you sure you wan to delete?</p>
          <button className="primary " onClick={deleteMovie}>Confirm Delete</button>
          <button className="primary" onClick={() => setModalOpen(false)}>Cancel</button>
        </Modal>
      </>

    )  
  }