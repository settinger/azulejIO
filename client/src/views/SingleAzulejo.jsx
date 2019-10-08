import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Figure from "react-bootstrap/Figure";
import { Link } from "react-router-dom";
import { loadSingle } from "../services/azulejo-api";
import { rate } from "./../services/azulejo-api";

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
    console.dir(this.state);
    console.log(this.props);
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

  render() {
    const createdBy =
      this.state.azulejo && this.state.azulejo._createdBy.username;
    return (
      this.state.azulejo && (
        <div>
          <div
            className="mb-4"
            id="header-content"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <h1>
              <i>{this.state.azulejo.name}</i>
            </h1>
            <h3>
              Created by: <Link to={`/profile/${createdBy}`}>{createdBy}</Link>
            </h3>
            {this.state.azulejo._remixedFrom && (
              <h4>
                Remixed from{" "}
                <i>
                  <Link to={`/azulejo/${this.state.azulejo._remixedFrom._id}`}>
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
            <div>
              <Link to={`/azulejo/remix/${this.state.azulejo._id}`}>
                <span className="btn btn-primary">Remix it!</span>
              </Link>
            </div>
          </div>
          <Figure className="container px-5">
            <Figure.Image
              src={this.state.azulejo.imageUrl}
              alt="Azulejo"
              className="img-fluid"
            />
          </Figure>
          {this.props.user._id === this.state.azulejo._createdBy._id && (
            <div className="col-md-2 offset-md-5">
              <Form>
                <Form.Group>
                  <Button className="btn btn-danger">Delete Azulejo</Button>
                </Form.Group>
              </Form>
            </div>
          )}
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
          <p>
            Reviews:{" "}
            {this.state.azulejo.reviews.map(v => (
              <p> {v.comment}</p>
            ))}
          </p>
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
      )
    );
  }
}
