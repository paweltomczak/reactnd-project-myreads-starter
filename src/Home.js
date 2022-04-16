import React from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const Home = (props) => {
  const { currentlyReading, wantToRead, read } = props.shelves;
  const { updateShelves, isLoading } = props;

  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>myReads</h1>
      </div>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className='list-books-content'>
          <BookShelf
            key={'currRead'}
            title={'Currently Reading'}
            books={currentlyReading}
            updateShelves={updateShelves}
          />
          <BookShelf key={'wantRead'} title={'Want To Read'} books={wantToRead} updateShelves={updateShelves} />
          <BookShelf key={'read'} title={'Read'} books={read} updateShelves={updateShelves} />
        </div>
      )}
      <div className='open-search'>
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  );
};

export default Home;
