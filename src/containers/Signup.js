import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import './Signup.css';
import { withFirebase } from '../components/Firebase';

const INITIAL_STATE = {
  isLoading: false,
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: null,
};

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  validateForm() {
    return this.state.email.length > 0
      && this.state.username.length > 0
      && this.state.password.length > 0
      && this.state.password === this.state.confirmPassword;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });
    this.setState({ error: null });

    try {
      await this.signup(this.state.username, this.state.email, this.state.password);
    }
    catch(e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  
  signup(username, email, password) {
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // Create a user in Firebase realtime database
        this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/login');
      })
      .catch(error => {
        this.setState({ error });
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <div className="Signup">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password" />
          </FormGroup>
          <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password" />
          </FormGroup>
          {this.state.error && <p>{this.state.error.message}</p>}
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Signup"
            loadingText="Signing up…" />
        </form>
      </div>
    );
  }
}

export default withRouter(withFirebase(Signup));
