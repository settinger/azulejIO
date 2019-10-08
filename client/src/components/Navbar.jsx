import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NavbarView = props => {
  return (
    <header>
      <Navbar expand="lg" bg="light" variant="light" className="shadow-sm">
        <Navbar.Toggle
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            {(!props.user && (
              <Fragment>
                <Link to="/azulejo/create" className="nav-link">
                  + Create an Azulejo
                </Link>

                <Link to="/auth/signin" className="nav-link">
                  Sign In{" "}
                </Link>

                <Link to="/auth/signup" className="nav-link">
                  Sign Up{" "}
                </Link>
              </Fragment>
            )) || (
              <Fragment>
                <Link to={`/profile/${props.user.username}`}>
                  {props.user && props.user.username}
                </Link>

                <Link to="/azulejo/create" className="nav-link">
                  + Create an Azulejo
                </Link>

                <Form inline onSubmit={props.signOut}>
                  <Button
                    type="submit"
                    className="nav-link"
                    style={{ background: "none", border: "none" }}
                  >
                    Sign Out
                  </Button>
                </Form>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default NavbarView;
