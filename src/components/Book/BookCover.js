import React, { Component } from 'react';
import './Book.css';

class BookCover extends Component{
  render() {
    return (
      <div className='BookCover'>
        <img src={require('../../../images/book/'+this.props.img)} />
      </div>
    );
  }
}

export default BookCover;