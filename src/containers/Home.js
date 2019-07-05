import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  renderLander() {
    return (
      <div className="lander">
        <h1>Webbtis</h1>
        <p>Web Based Book Tracking Information System</p>
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
