import { Link } from "react-router-dom";
import React, { Fragment } from "react";

import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NavbarView = props => {
  console.log(props);
  return (
    <Navbar>
      <Link className="btn" to="/">
        Home
      </Link>
      {(!props.user && (
        <Fragment>
          <Link className="btn" to="/auth/signin">
            Sign In
          </Link>
          <Link className="btn" to="/auth/signup">
            Sign Up
          </Link>
        </Fragment>
      )) || (
        <Fragment>
          <span className="btn">
            Hello {props.user && props.user.username}!
          </span>
          <Link className="btn" to="/azulejo/create">
            + Create an Azulejo
          </Link>

          <Form onSubmit={props.signOut}>
            <Button type="submit">Sign Out</Button>
          </Form>
        </Fragment>
      )}
    </Navbar>
  );
};

export default NavbarView;
