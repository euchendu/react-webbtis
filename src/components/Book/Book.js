import React, { Component } from 'react';
import './Book.css';
import BookCover from './BookCover';
import BookInfo from './BookInfo';
import Likes from './Likes';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

class Book extends Component{
  constructor(props) {
		super(props);
		this.state = {
			liked: false,
		};
	}
  
  isLiked = () => {
		this.setState({ liked: !this.state.liked });
	}

  render() {
    let like = null;
    if (this.state.liked) {
      like = <FaHeart className='icon' onClick={()=>{this.isLiked()}} />
    }
    else {
      like = <FaRegHeart className='icon' onClick={()=>{this.isLiked()}} />
    }
    return (
      <div className='Book'>
        <BookCover img={this.props.img} />
        <BookInfo
          name={this.props.name}
          author={this.props.author}
          rate={this.props.rate}
          voters={this.props.voters}
        />
        { like }
        <Likes people={this.props.people} />
      </div>
    );
  }
}

export default Book;