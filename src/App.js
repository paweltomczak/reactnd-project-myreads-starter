import React, { Component } from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import Home from './Home';
import SearchBooks from './SearchBooks';
import BookDetails from './BookDetails';
import { getAll as getAllBooks } from './BooksAPI';
import { Route, Routes } from 'react-router-dom';

class BooksApp extends Component {
  state = {
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    isLoading: true
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
    getAllBooks().then((books) => {
      this.setState(() => ({
        shelves: this.bookByShelf(books),
        isLoading: false
      }));
    });
  }

  updateShelves = (shelves) => {
    this.setState(() => ({
      shelves
    }));
  };

  render() {
    return (
      <div className='app'>
        <Routes>
          <Route
            path='/'
            element={
              <Home shelves={this.state.shelves} updateShelves={this.updateShelves} isLoading={this.state.isLoading} />
            }
          />
          <Route path='/search' element={<SearchBooks updateShelves={this.updateShelves} />} />
          <Route path='/book/:bookId' element={<BookDetails />} />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
