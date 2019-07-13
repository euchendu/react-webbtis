import React, { Component } from 'react';
import './Rate.css';
import {MdStarBorder, MdStarHalf, MdStar} from 'react-icons/md';
import Rating from 'react-rating';

class Rate extends Component {
  render() {
    return (
      <div className='Rate' style={this.props.color}>
        <Rating
          emptySymbol={<MdStarBorder />}
          fullSymbol={<MdStar />}
          initialRating={parseFloat(this.props.rate)}
        />
        <span className="Votes" style={{color: this.props.textColor}}>{this.props.voters} voters</span>
      </div>
    );
  }
}

export default Rate;