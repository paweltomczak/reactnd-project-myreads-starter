import React, { Component } from 'react';
import { update, get } from './BooksAPI';
import { Navigate, Link } from 'react-router-dom';
import Loading from './Loading';

class Book extends Component {
  state = {
    bookDetails: [],
    redirect: null,
    isLoading: true
  };
  componentDidMount() {
    get(this.props.id).then((details) => {
      this.setState(() => ({
        bookDetails: details,
        isLoading: false
      }));
    });
  }
  handleShelfChange = (e) => {
    const { value } = e.target;
    const book = this.state.bookDetails;
    this.setState({ redirect: '/', isLoading: true });
    update(book, value).then((shelves) => {
      return this.props.updateShelves(shelves);
    });
  };
  render() {
    const { imageLinks, title, authors, shelf, id } = this.state.bookDetails;
    const { isLoading } = this.state;
    return (
      <li>
        {window.location.pathname === '/search' && this.state.redirect && <Navigate to='/' />}
        {isLoading && <Loading />}
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
            <Link to={`/book/${id}`}>
              <div className='book-cover-details'>
                <div className='book-cover-text'>View Details</div>
              </div>
            </Link>
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
