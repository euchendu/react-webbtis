import React, { Component } from 'react';
import './Book.css';

class BookCover extends Component{
  render() {
    return (
      <div className='BookCover'>
        <img alt={this.props.img} src={this.props.img} />
      </div>
    );
  }
}

export default BookCover;