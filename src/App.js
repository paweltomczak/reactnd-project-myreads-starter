import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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
        {this.state.showSearchPage ? (
          <SearchBooks updateShelves={this.updateShelves} />
        ) : (
          <div className='list-books'>
            <div className='list-books-title'>
              <h1>MyReads</h1>
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
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
