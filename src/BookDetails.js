import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get as getBook } from './BooksAPI';
import Loading from './Loading';

const BookDetails = () => {
  let navigate = useNavigate();
  const { bookId } = useParams();
  const [ book, setBook ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  useEffect(() => {
    getBook(bookId).then((bookDetails) => setBook(bookDetails)).then(() => setIsLoading(false));
  }, []);
  const { title, authors, categories, description, imageLinks, pageCount, publishedDate } = book;
  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className='book-details'>
          <img
            src='/static/media/arrow-back.20e8847d.svg'
            alt={title}
            className='close-search'
            onClick={() => navigate(-1)}
          />
          <div className='book-details__cover'>
            <img src={imageLinks && imageLinks.thumbnail} alt={title} />
          </div>
          <div className='book-details__content'>
            <p className='title'>{title}</p>
            <p>Authors: {authors && Array.from(authors).join(', ')}</p>
            <p>Categories: {categories}</p>
            <p>Description: {description}</p>
            <p>Number of pages: {pageCount}</p>
            <p>Published date: {publishedDate}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
