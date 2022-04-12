import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {
  render() {
    const { books, title, updateShelves } = this.props;
    return (
      <div>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>{title}</h2>
          <div className='bookshelf-books'>
            <ul className='books-grid'>
              {books.map((book) => <Book updateShelves={updateShelves} key={book} id={book} />)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default BookShelf;
