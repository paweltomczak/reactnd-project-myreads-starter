import React from 'react';
import Book from './Book';

const BookShelf = (props) => {
  const { books, title, updateShelves } = props;
  return (
    <div>
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{title}</h2>
        <div className='bookshelf-books'>
          <ul className='books-grid'>
            {books.length ? (
              books.map((book) => <Book updateShelves={updateShelves} key={book} id={book} />)
            ) : (
              'No books in shelf'
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookShelf;
