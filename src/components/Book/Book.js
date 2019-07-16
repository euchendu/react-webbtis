import React, { Component } from 'react';
import './Book.css';
import BookCover from './BookCover';
import BookInfo from './BookInfo';
import Likes from './Likes';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { withFirebase } from '../../components/Firebase';

class Book extends Component{
  constructor(props) {
		super(props);
		this.state = {
			liked: false,
		};
	}
  
  componentDidMount() {
    this.props.firebase.book(this.props.id).on('value', function(snapshot) {
      var people = (snapshot.val() && snapshot.val().people) || [];
      if (people.length > 0) {
        var idx = people.indexOf(this.props.uid);
        if (idx >= 0) {
          this.setState({ liked: true });
        }
      }
    }.bind(this));
  }

  like = () => {
    this.props.firebase.book(this.props.id).once('value').then(function(snapshot) {
      var bookExists = snapshot.exists();
      if (bookExists) {
        var people = (snapshot.val().people) || [];
        if (!people.includes(this.props.uid)) {
          people.push(this.props.uid);
          this.props.firebase
            .book(this.props.id)
            .update({
              people: people,
            });
        }
        this.setState({ liked: true });
      }
      else {
        this.props.firebase
          .book(this.props.id)
          .set({
            name: this.props.name,
            author: this.props.author,
            people: [this.props.uid],
          });
        this.setState({ liked: true });
      }
    }.bind(this));
	}
  
  unlike = () => {
    this.props.firebase
      .book(this.props.id)
      .once('value').then(function(snapshot) {
        var people = (snapshot.val() && snapshot.val().people) || [];
        if (people.length > 0) {
          var idx = people.indexOf(this.props.uid);
          if (idx >= 0) {
            people.splice(idx,1);
            this.props.firebase
              .book(this.props.id)
              .update({
                people: people,
              });
          }
        }
        this.setState({ liked: false });
      }.bind(this));
	}

  render() {
    let like = null;
    if (this.state.liked) {
      like = <FaHeart className='icon' onClick={()=>{this.unlike()}} />
    }
    else {
      like = <FaRegHeart className='icon' onClick={()=>{this.like()}} />
    }
    return (
      <div className='Book'>
        <BookCover img={this.props.img} />
        <BookInfo
          name={this.props.name}
          author={this.props.author}
          rate={this.props.rate}
          voters={this.props.voters}
          description={this.props.description}
        />
        { like }
        <Likes people={this.props.people} />
      </div>
    );
  }
}

export default withFirebase(Book);