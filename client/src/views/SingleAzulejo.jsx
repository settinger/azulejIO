import React, { Component, Fragment } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { rate, deleteDesign, loadSingle } from "./../services/azulejo-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class SingleAzulejo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: {
        comment: "",
        rating: ""
      },
      azulejo: null
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.addRate = this.addRate.bind(this);
    this.deleteDesign = this.deleteDesign.bind(this);
  }

  loadAzulejo() {
    loadSingle(this.props.match.params.id)
      .then(azulejo => {
        this.setState({
          azulejo
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadAzulejo();
  }

  componentDidUpdate(previousProps) {
    if (
      !this.state.azulejo ||
      previousProps.match.params.id !== this.props.match.params.id
    ) {
      this.loadAzulejo();
    }
  }
  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      review: { ...this.state.review, [name]: value }
    });
  }

  addRate() {
    const rating = this.state.review;
    rate(this.state.azulejo._id, rating)
      .then(review => {
        console.log(review);
        this.props.history.push(`/azulejo/${this.state.azulejo._id}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteDesign(event) {
    event.preventDefault();
    const id = this.state.azulejo._id;
    deleteDesign(id)
      .then(result => {
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const createdBy =
      this.state.azulejo && this.state.azulejo._createdBy.username;
    return (
      this.state.azulejo && (
        <Container>
          <Row>
            <Col sm={5}>
              <Carousel className="single-azulejo-carrousel">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={this.state.azulejo.imageUrl}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/img/lukas-blazek-EWDvHNNfUmQ-unsplash.jpg"
                    alt="First slide"
                  />
                  <img
                    className="d-block w-50 single-azulego-wood-azulejo"
                    src={this.state.azulejo.imageUrl}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <div
                    className="div-tile"
                    style={{
                      backgroundSize: "10%",
                      backgroundImage: `url(${this.state.azulejo.imageUrl})`
                    }}
                  >
                    <img
                      className="d-block w-100"
                      src="/img/tile_template_1.png"
                      alt="First slide"
                    />
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div
                    className="div-tile"
                    style={{
                      backgroundSize: "10%",
                      backgroundImage: `url(${this.state.azulejo.imageUrl})`
                    }}
                  >
                    <img
                      className="d-block w-100"
                      src="/img/tile_template_2.png"
                      alt="First slide"
                    />
                  </div>
                </Carousel.Item>
              </Carousel>
            </Col>

            {/* RIGTH COL

          ALL //

          UNSER INFO*/}

            <Col sm={3}>
              <div className="mb-4 pl-2 profile-user" id="header-content">
                <h1 style={{ paddingTop: "0px" }}>{this.state.azulejo.name}</h1>
                <p style={{ marginTop: "-30px" }}>
                  Created by:{" "}
                  <Link to={`/profile/${createdBy}`}>{createdBy}</Link>
                </p>
                {this.state.azulejo._remixedFrom && (
                  <h4>
                    Remixed from{" "}
                    <i>
                      <Link
                        to={`/azulejo/${this.state.azulejo._remixedFrom._id}`}
                      >
                        {this.state.azulejo._remixedFrom.name}
                      </Link>
                    </i>{" "}
                    by{" "}
                    <Link
                      to={`/profile/${this.state.azulejo._remixedFrom._createdBy.username}`}
                    >
                      {this.state.azulejo._remixedFrom._createdBy.username}
                    </Link>
                  </h4>
                )}
                <Row>
                  <Col>
                    <div className="d-flex justify-content-start">
                      <Link to={`/azulejo/remix/${this.state.azulejo._id}`}>
                        <span className="btn btn-primary mr-2">Remix it!</span>
                      </Link>
                      {this.props.user &&
                        this.props.user._id ===
                          this.state.azulejo._createdBy._id && (
                          <Form onSubmit={this.deleteDesign}>
                            <Form.Group>
                              <Button type="submit" className="btn btn-danger">
                                Delete Azulejo
                              </Button>
                            </Form.Group>
                          </Form>
                        )}
                    </div>
                    <p>
                      Rating:{" "}
                      {this.state.azulejo.reviews
                        .map(v => v.rating)
                        .reduce((acc, v, i, a) => {
                          acc += v;
                          return acc / a.length;
                        }, 0)
                        .toFixed(1)}
                    </p>{" "}
                  </Col>
                </Row>
                <div>
                  {this.props.user && (
                    <Form onSubmit={this.addRate}>
                      <hr />
                      <div className="mb-2">Leave a review?</div>
                      <Form.Group>
                        <Form.Label htmlFor="comment">Comment</Form.Label>
                        <Form.Control
                          name="comment"
                          placeholder="comment"
                          required
                          onChange={this.onValueChange}
                          value={this.state.review.comment}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="rating">Rating</Form.Label>
                        <Form.Control
                          name="rating"
                          placeholder="rating"
                          type="number"
                          min={1}
                          max={5}
                          required
                          onChange={this.onValueChange}
                          value={this.state.review.rating}
                        />
                      </Form.Group>
                      <Button type="submit">Rate</Button>
                    </Form>
                  )}
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="pl-2">
                <p>
                  Reviews:{" "}
                  {this.state.azulejo.reviews.map(v => (
                    <p> {v.comment}</p>
                  ))}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      )
    );
  }
}
