import React, { Component } from 'react';
import './Books.css';
import Book from './Book';

class Books extends Component {
  render() {
    let bookCards = [];
    console.log(this.props.books.length);
    for (let i = 0; i < this.props.books.length; i++) {
      bookCards.push(
        <Book
          key={i}
          name={this.props.books[i].name}
          img={this.props.books[i].image} 
          author={this.props.books[i].author}
          rate={this.props.books[i].rate}
          voters={this.props.books[i].voters}
          people={this.props.books[i].people}
        >
        </Book>
      );
    }
    return (
      <div className='Books'>
        { bookCards }
      </div>
    );
  }
}

export default Books;