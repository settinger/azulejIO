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
  }
  loadAzulejo() {
    loadSingle(this.props.match.params.id)
      .then(azulejo => {
        // console.log("THIS IS AZULEJO LOADED", azulejo);
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
    console.log(this.props.user);
    this.setState({
      review: { ...this.state.review, user: this.props.user, [name]: value }
    });
  }

  addRate() {
    const rating = this.state.review;
    rate(this.state.azulejo._id, rating)
      .then(review => {
        console.log(review);
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

  render() {
    // console.log(this.state.average && this.state.average);
    const createdBy =
      this.state.azulejo && this.state.azulejo._createdBy.username;
    return (
      this.state.azulejo && (
        <Container>
          <Row className="py-5">
            <Col sm={5}>
              <Carousel>
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
                    <StarRating>
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
                    <Col md={2}>
                      <img
                        width="50px"
                        height="auto"
                        src="data:image/png;base64,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"
                        alt={`${v._createdBy.username} profile image`}
                      />
                    </Col>
                    <Col md={10}>
                      <Row>{v.rating}</Row>
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
