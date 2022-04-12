import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';

const shelves = [
  { name: 'Currently Reading', tag: 'currentlyReading' },
  { name: 'Want to Read', tag: 'wantToRead' },
  { name: 'Read', tag: 'read' },
];

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books,
      }));
    });
  }

  render() {
    return (
      <div className='app'>
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <div className='list-books'>
            <div className='list-books-title'>
              <h1>MyReads</h1>
            </div>
            <div className='list-books-content'>
              {!!this.state.books.length &&
                shelves.map((shelf) => (
                  <BookShelf
                    key={shelf.name}
                    shelfName={shelf.name}
                    shelfTag={shelf.tag}
                    books={this.state.books}
                  />
                ))}
            </div>
            <div className='open-search'>
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
