import React, { Component } from 'react';
import './Book.css';
import TextTruncate from 'react-text-truncate';

class BookDescription extends Component{
  render() {
    return (
      <div className='BookDescription'>
        <TextTruncate
          line={5}
          text={this.props.text}
        />
      </div>
    );
  }
}

export default BookDescription;