import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { loadSingle } from "../services/azulejo-api";

export default class SingleAzulejo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      azulejo: null
    };
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

  render() {
    const createdBy = this.state.azulejo._createdBy.username;
    return (
      this.state.azulejo && (
        <div>
          <h1>AZULEJO</h1>
          <h1>Azulejo: {this.state.azulejo.name}</h1>
          <img src={this.state.azulejo.imageUrl} alt="Azulejo" />
          <h3>
            Created by: <Link to={`/profile/${createdBy}`}>{createdBy}</Link>
          </h3>
        </div>
      )
    );
  }
}
