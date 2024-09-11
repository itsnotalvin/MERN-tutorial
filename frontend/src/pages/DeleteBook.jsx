import React, {useState} from 'react';
import BackButton from '../../components/BackButton'
import Spinner from '../../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteBook = () => {
  const [loading, setLoading] =useState(false)
  const navigate = useNavigate();
  const { id } = useParams()
  const handleDeleteBook = () => {
    setLoading(true)
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/')
      })
      .catch(() => {
        setLoading(false);
        alert('An error has occured. Please check the logs for more information')
        console.log(error)
      })
  }

  

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
    
    </div>
  )
}

export default DeleteBook