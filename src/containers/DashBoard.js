import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './DashBoard.css';
import Books from '../components/Book/Books';
import books from '../books.json';

class DashBoard extends Component {
  render() {
    return (
      <div className="DashBoard">
        <Books books={books} />
      </div>
    );
  }
}

export default withRouter(DashBoard);
