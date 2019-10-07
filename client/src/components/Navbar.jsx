import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NavbarView = props => {
  return (
    <header>
      <Navbar expand="lg" bg="light" variant="light" className="shadow-sm">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link href="/" className="nav-link">
              Home
            </Nav.Link>
            {(!props.user && (
              <Fragment>
                <Nav.Link href="/auth/signin" className="nav-link">
                  Sign In{" "}
                </Nav.Link>

                <Nav.Link href="/auth/signup" className="nav-link">
                  Sign Up{" "}
                </Nav.Link>
              </Fragment>
            )) || (
              <Fragment>
                <Nav.Link href={`/profile/${props.user.username}`}>
                  {props.user && props.user.username}
                </Nav.Link>

                <Nav.Link href="/azulejo/create" className="nav-link">
                  + Create an Azulejo
                </Nav.Link>

                <Form inline onSubmit={props.signOut}>
                  <Button type="submit">Sign Out</Button>
                </Form>
              </Fragment>
            )}
          </Nav>
          <Nav className="nav-flex-icons">
            <Nav.Link href="#">
              <FontAwesomeIcon icon={["fab", "facebook-f"]} color="#17a2b8" />
            </Nav.Link>
            <Nav.Link href="#">
              <FontAwesomeIcon icon={["fab", "twitter"]} color="#17a2b8" />
            </Nav.Link>
            <Nav.Link href="#">
              <FontAwesomeIcon icon={["fab", "instagram"]} color="#17a2b8" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>

    // <Navbar>
    //   <Link className="btn" to="/">
    //     Home
    //   </Link>
    //   {(!props.user && (
    //     <Fragment>
    //       <Link className="btn" to="/auth/signin">
    //         Sign In
    //       </Link>
    //       <Link className="btn" to="/auth/signup">
    //         Sign Up
    //       </Link>
    //     </Fragment>
    //   )) || (
    //     <Fragment>
    //       <Link className="btn" to={`/profile/${props.user.username}`}>
    //         <span className="btn">{props.user && props.user.username}</span>
    //       </Link>
    //       <Link className="btn" to="/azulejo/create">
    //         + Create an Azulejo
    //       </Link>

    //       <Form onSubmit={props.signOut}>
    //         <Button type="submit">Sign Out</Button>
    //       </Form>
    //     </Fragment>
    //   )}
    // </Navbar>
  );
};

export default NavbarView;
