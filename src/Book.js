import React, { Component } from 'react';
import { update, get } from './BooksAPI';
import { Navigate } from 'react-router-dom';

class Book extends Component {
  state = {
    bookDetails: [],
    redirect: null
  };
  componentDidMount() {
    get(this.props.id).then((details) => {
      this.setState(() => ({
        bookDetails: details
      }));
    });
  }
  handleShelfChange = (e) => {
    const { value } = e.target;
    const book = this.state.bookDetails;
    this.setState({ redirect: '/' });
    update(book, value).then((shelves) => {
      return this.props.updateShelves(shelves);
    });
  };
  render() {
    const { imageLinks, title, authors, shelf } = this.state.bookDetails;
    return (
      <li>
        {window.location.pathname === '/search' && this.state.redirect && <Navigate to='/' />}
        <div className='book'>
          <div className='book-top'>
            <div
              className='book-cover'
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${imageLinks ? imageLinks.thumbnail : ''})`
              }}
            />
            <div className='book-shelf-changer'>
              <select value={shelf} onChange={this.handleShelfChange}>
                <option value='move' disabled>
                  Move to...
                </option>
                <option value='currentlyReading'>Currently Reading</option>
                <option value='wantToRead'>Want to Read</option>
                <option value='read'>Read</option>
                <option value='none'>None</option>
              </select>
            </div>
          </div>
          <div className='book-title'>{title}</div>
          <div className='book-authors'>{authors && Array.from(authors).join('\n')}</div>
        </div>
      </li>
    );
  }
}

export default Book;
