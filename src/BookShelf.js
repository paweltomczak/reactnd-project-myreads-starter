import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class BookShelf extends Component {
  componentDidMount() {
    const { books, shelfTag } = this.props;
    this.setState(() => ({
      [shelfTag]: books.filter((book) => book.shelf === shelfTag),
    }));
  }
  render() {
    const { shelfName, shelfTag } = this.props;
    return (
      <div>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>{shelfName}</h2>
          <div className='bookshelf-books'>
            <ul className='books-grid'>
              {this.state &&
                this.state[shelfTag].map((book) => (
                  <Book
                    key={book.id}
                    title={book.title}
                    authors={book.authors}
                    background={
                      book.imageLinks ? book.imageLinks.thumbnail : ''
                    }
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default BookShelf;
