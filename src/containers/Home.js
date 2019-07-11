import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Home.css';
import {
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

class Home extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();

    this.props.history.push('/dashboard');
  }
  
  renderLander() {
    return (
      <div className="lander">
        <h1>Webbtis</h1>
        <p>Web Based Book Tracking Information System</p>
        <div>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="keyword" size="lg">
              <FormControl autoFocus type="text" placeholder="Enter title, author or ISBN" />
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
      </div>
    );
  }
}

export default withRouter(Home);
