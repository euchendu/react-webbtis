import React, { Component } from 'react';
import './Books.css';
import Book from './Book';
import { AuthUserContext, withAuthentication } from '../../components/Session';

class Books extends Component {
  bookCards = (authUser) => {
    var cards = [];
    if (this.props.books !== null) {
      for (let i = 0; i < this.props.books.length; i++) {
        cards.push(
          <Book
            key={this.props.books[i].id}
            id={this.props.books[i].id}
            name={this.props.books[i].name}
            img={this.props.books[i].image} 
            author={this.props.books[i].author}
            rate={this.props.books[i].rate}
            voters={this.props.books[i].voters}
            people={this.props.books[i].people}
            description={this.props.books[i].description}
            uid={authUser === null ? null : authUser.uid}
          >
          </Book>
        );
      }
    }
    return cards;
  };

  render() {
    return (
      <div className='Books'>
        <AuthUserContext.Consumer>
          {authUser => this.bookCards(authUser)}
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

export default withAuthentication(Books);