import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  state = {
    query: '',
    searchedBooks: [],
  };
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
    this.getSearchedBooks(query);
  };
  getSearchedBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((books) => {
        this.setState(() => ({
          searchedBooks: books,
        }));
      });
    } else {
      this.setState(() => ({
        searchedBooks: [],
      }));
    }
  };
  render() {
    const { query, searchedBooks } = this.state;
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <button
            className='close-search'
            onClick={() => this.setState({ showSearchPage: false })}
          >
            Close
          </button>
          <div className='search-books-input-wrapper'>
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input
              type='text'
              placeholder='Search by title or author'
              onChange={(e) => {
                this.updateQuery(e.target.value);
              }}
              value={query}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {searchedBooks.length && query !== ''
              ? searchedBooks.map((book) => (
                  <Book
                    key={book.id}
                    title={book.title}
                    authors={book.authors}
                    background={
                      book.imageLinks ? book.imageLinks.thumbnail : ''
                    }
                  />
                ))
              : ''}
            {searchedBooks.error && `No books found matching the "${query}" `}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
