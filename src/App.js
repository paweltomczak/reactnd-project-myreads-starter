import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';
import { Route, Routes, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  };

  bookByShelf = (books) => {
    const shelves = this.state.shelves;
    const newShelf = {};
    for (let shelf in shelves) {
      Object.assign(newShelf, {
        [shelf]: books.filter((book) => book.shelf.includes(shelf)).flatMap((book) => [ book.id ])
      });
    }
    return newShelf;
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        shelves: this.bookByShelf(books)
      }));
    });
  }

  updateShelves = (shelves) => {
    this.setState(() => ({
      shelves
    }));
  };

  render() {
    const { currentlyReading, wantToRead, read } = this.state.shelves;
    return (
      <div className='app'>
        <Routes>
          <Route path='search' element={<SearchBooks updateShelves={this.updateShelves} />} />
          <Route
            path='/'
            element={
              <div className='list-books'>
                <div className='list-books-title'>
                  <h1>myReads</h1>
                </div>
                <div className='list-books-content'>
                  <BookShelf
                    key={'currRead'}
                    title={'Currently Reading'}
                    books={currentlyReading}
                    updateShelves={this.updateShelves}
                  />
                  <BookShelf
                    key={'wantRead'}
                    title={'Want To Read'}
                    books={wantToRead}
                    updateShelves={this.updateShelves}
                  />
                  <BookShelf key={'read'} title={'Read'} books={read} updateShelves={this.updateShelves} />
                </div>
                <div className='open-search'>
                  <Link to='/search'>Add a book</Link>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
