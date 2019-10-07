import React, { Component } from "react";
import AzulejoThumbnail from "./../components/AzulejoThumbnail";
import { loadRecent } from "./../services/azulejo-api";
import CardGroup from "react-bootstrap/CardGroup";

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      azulejos: []
    };
  }

  componentDidMount() {
    loadRecent(20)
      .then(azulejos => {
        this.setState({ azulejos, loaded: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>AZULEJ.IO</h1>
        <p>Here are some recent designs by users:</p>
        {this.state.loaded && (
          <CardGroup className="card-set">
            <div className="card-set">
              {this.state.azulejos.map(azulejo => {
                return (
                  <AzulejoThumbnail
                    key={azulejo._id}
                    id={azulejo._id}
                    name={azulejo.name}
                    img={azulejo.imageUrl}
                    createdBy={azulejo._createdBy.username}
                    colors={azulejo.colors}
                    reviews={azulejo.reviews}
                  />
                );
              })}
            </div>
          </CardGroup>
        )}
      </div>
    );
  }
}
