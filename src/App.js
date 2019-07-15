import React, { Component, Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './App.css';
import Routes from './Routes';

import { AuthUserContext, withAuthentication } from './components/Session';
import { withFirebase } from './components/Firebase';

class App extends Component {
  handleLogout = async event => {
    this.props.firebase.doSignOut();
    this.props.history.push("/login");
  }
  
  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Webbtis</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <AuthUserContext.Consumer>
                {authUser => authUser
                  ? <Fragment>
                      <NavItem>{authUser.username}</NavItem>
                      <NavItem onClick={this.handleLogout}>Logout</NavItem>
                    </Fragment>
                  : <Fragment>
                      <LinkContainer to="/signup">
                        <NavItem>Signup</NavItem>
                      </LinkContainer>
                      <LinkContainer to="/login">
                        <NavItem>Login</NavItem>
                      </LinkContainer>
                    </Fragment>
                }
              </AuthUserContext.Consumer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
}

export default withAuthentication(withRouter(withFirebase(App)));
