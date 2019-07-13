import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Home.css';
import {
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import bookAPI from 'google-books-search';
import Books from '../components/Book/Books';

const INITIAL_STATE = {
  keyword: '',
  result: [],
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    bookAPI.search(this.state.keyword, function(error, results) {
      if ( ! error ) {
        for (let i = 0; i < results.length; i++) {
          results[i].name = results[i].title;
          results[i].image = results[i].thumbnail;
          var author = 'N/A';
          var authors = results[i].authors;
          if (authors !== null && authors.length > 0) {
            author = authors[0];
          }
          results[i].author = author;
          const voters = ((100 - 1) * Math.random() + 1).toFixed(0);
          results[i].voters = voters;
          const rate = (Math.random() * (5.0 - 1.0) + 1.0).toFixed(1);
          results[i].rate = rate;
          results[i].people=[
            "Carolina Peters",
            "Samantha William",
            "Peter Brown"
          ];
        }
        this.setState({ result: results });
      } else {
        this.setState({ result: null });
      }
    }.bind(this));
  }
  
  renderLander() {
    return (
      <div className="lander">
        <h1>Webbtis</h1>
        <p>Web Based Book Tracking Information System</p>
        <div>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="keyword" size="lg">
              <FormControl autoFocus type="text" placeholder="Enter title, author or ISBN"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button size="sm" type="submit">Search</Button>
          </form>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        { this.renderLander() }
        <Books books={this.state.result} />
      </div>
    );
  }
}

export default withRouter(Home);
