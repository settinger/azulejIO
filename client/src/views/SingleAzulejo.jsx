import React, { Component, Fragment } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import {
  rate,
  deleteDesign,
  loadSingle,
  fav,
  removeFav
} from "./../services/azulejo-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRating from "./../components/StarRating";

export default class SingleAzulejo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: {
        comment: "",
        rating: "",
        user: ""
      },
      azulejo: null,
      average: null
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.addRate = this.addRate.bind(this);
    this.deleteDesign = this.deleteDesign.bind(this);
    this.addFav = this.addFav.bind(this);
    this.removeFav = this.removeFav.bind(this);
  }
  loadAzulejo() {
    loadSingle(this.props.match.params.id)
      .then(azulejo => {
        console.log(azulejo);
        this.setState({
          azulejo
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      review: { ...this.state.review, user: this.props.user, [name]: value }
    });
  }

  addRate() {
    const rating = this.state.review;
    rate(this.state.azulejo._id, rating)
      .then(review => {
        this.props.history.push(`/azulejo/${this.state.azulejo._id}`);
        this.setState({
          review
        });
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

  addFav() {
    fav(this.state.azulejo._id)
      .then(fav => {
        this.setState({
          ...this.state,
          azulejo: { ...this.state.azulejo, fav: fav }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  removeFav() {
    removeFav(this.state.azulejo._id)
      .then(fav => {
        this.setState({
          ...this.state,
          azulejo: { ...this.state.azulejo, fav: fav }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadAzulejo();
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      !this.state.azulejo ||
      previousProps.match.params.id !== this.props.match.params.id
    ) {
      this.loadAzulejo();
    }
    if (
      this.props.user &&
      (!this.state.azulejo || previousState.azulejo !== this.state.azulejo)
    ) {
      this.setState({
        ...this.state
      });
    }
  }

  render() {
    const createdBy =
      this.state.azulejo && this.state.azulejo._createdBy.username;
    return (
      this.state.azulejo && (
        <Container>
          <Row className="py-5">
            <Col sm={5}>
              <Carousel interval="3000" pauseOnHover="true">
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
                    src="/img/wood-bg.png"
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

            <Col sm={7}>
              <div className="mb-4 pl-2 profile-user" id="header-content">
                <Row>
                  <Col sm={6}>
                    <h1 style={{ paddingTop: "0px" }}>
                      {this.state.azulejo.name}
                    </h1>
                  </Col>
                  <Col sm={6}>
                    <Row>
                      {/* REMIX IT!!! */}
                      <Link to={`/azulejo/remix/${this.state.azulejo._id}`}>
                        <span className="btn btn-primary mr-2">Remix it!</span>
                      </Link>
                      {/* DELETE!!! */}
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
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col sm={3}>
                    {/* RATING   */}
                    {/* <FontAwesomeIcon icon="star" color="#17a2b8" />
                    <FontAwesomeIcon icon={["far", "star"]} color="#17a2b8" /> */}
                    <StarRating color="#17a2b8">
                      {this.state.azulejo.reviews
                        .map(v => v.rating)
                        .reduce((acc, v, i, arr) => {
                          acc += v / arr.length;
                          return acc;
                        }, 0)
                        .toFixed(1)}
                    </StarRating>
                  </Col>
                  <Col>
                    {(this.state.azulejo.fav &&
                      this.props.user &&
                      !this.state.azulejo.fav.includes(this.props.user._id) && (
                        <li className="list-inline-item mr-4">
                          <span
                            onClick={this.addFav}
                            style={{ cursor: "pointer" }}
                          >
                            <FontAwesomeIcon
                              icon={["far", "heart"]}
                              color="#17a2b8"
                            />
                            <span className="ml-2">
                              {this.state.azulejo.fav &&
                                this.state.azulejo.fav.length}
                            </span>
                          </span>
                        </li>
                      )) || (
                      <li className="list-inline-item mr-4">
                        <span
                          onClick={this.removeFav}
                          style={{ cursor: "pointer" }}
                        >
                          <FontAwesomeIcon icon="heart" color="#17a2b8" />
                          <span className="ml-2">
                            {this.state.azulejo.fav &&
                              this.state.azulejo.fav.length}
                          </span>
                        </span>
                      </li>
                    )}
                  </Col>
                  <Col>
                    {/* CREATED BY */} Created by:{" "}
                    <Link to={`/profile/${createdBy}`}>{createdBy}</Link>
                  </Col>
                  <Col>
                    {/* REMIXED FROM!!! */}
                    {this.state.azulejo._remixedFrom && (
                      <Fragment>
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
                      </Fragment>
                    )}
                  </Col>
                </Row>
                {this.props.user && (
                  <Form onSubmit={this.addRate}>
                    <hr />
                    <div className="mb-2">Leave a review?</div>
                    <Row>
                      <Col sm={2}>
                        <Form.Group>
                          <Form.Control
                            name="rating"
                            placeholder="0"
                            type="number"
                            min={1}
                            max={5}
                            required
                            onChange={this.onValueChange}
                            value={this.state.review.rating}
                          />
                        </Form.Group>
                        <Button type="submit">Rate</Button>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Control
                            as="textarea"
                            rows="4"
                            name="comment"
                            placeholder="Comment something"
                            required
                            onChange={this.onValueChange}
                            value={this.state.review.comment}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                )}
              </div>
              {this.state.azulejo.reviews.map(v => (
                <div className="comments-box my-2 p-3">
                  <Row>
                    <Col md={3}>
                      <img
                        width="100em"
                        height="auto"
                        src={v._createdBy.imageUrl}
                        alt={`${v._createdBy.username} profile image`}
                      />
                    </Col>
                    <Col md={8}>
                      <Row>
                        <StarRating color="#17a2b8">{v.rating}</StarRating>
                      </Row>
                      <Row>
                        <strong>{v._createdBy.username}</strong> &nbsp; posted:
                      </Row>
                      <Row>
                        <i> {v.comment}</i>
                      </Row>
                      {/* <strong> {v.user.username}</strong> */}
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      )
    );
  }
}
