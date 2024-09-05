import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton.jsx';
import Spinner from '../../components/Spinner.jsx';


const ShowBook = () => {
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        console.log(`API RESPONSE:`, response.data)
        setBook(response.data.book);
        setLoading(false);

      })
      .catch((error) => {
        console.log(`Error occured during GET request`, error)
        setLoading(false)
      })
  }, [id])

  console.log('book ID:', book)

  if(loading) return <Spinner />
  if (error) return <p className='text-red-500'>{error}</p>

  if (!book) return <p>No book details available</p>
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>ID</span>            
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Created</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last change</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
      </div>

    </div>
  )
}

export default ShowBook