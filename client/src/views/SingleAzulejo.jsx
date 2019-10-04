import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { loadSingle } from "../services/azulejo-api";
import { rate } from "./../services/rating-api";

export default class SingleAzulejo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      azulejo: null,
      rating: {
        comment: "",
        rating: ""
      }
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
      rating: { [name]: value }
    });
  }

  addRate(event) {
    event.preventDefault();
    const rating = this.state.rating;
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
          <h1>AZULEJO</h1>
          <h1>Azulejo: {this.state.azulejo.name}</h1>
          <img
            src={this.state.azulejo.imageUrl}
            alt="Azulejo"
            width="200"
            height="auto"
          />
          <h3>
            Created by: <Link to={`/profile/${createdBy}`}>{createdBy}</Link>
          </h3>
          <div>
            <Form onSubmit={this.signUp}>
              <Form.Group>
                <Form.Label htmlFor="sign-up-comment">comment</Form.Label>
                <Form.Control
                  name="comment"
                  placeholder="comment"
                  required
                  onChange={this.onValueChange}
                  value={this.state.rating.comment}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="sign-up-rating">Rating</Form.Label>
                <Form.Control
                  name="rating"
                  placeholder="rating"
                  type="number"
                  required
                  onChange={this.onValueChange}
                  value={this.state.rating.rating}
                />
              </Form.Group>
              <Button type="submit">Rate</Button>
            </Form>
          </div>
        </div>
      )
    );
  }
}
