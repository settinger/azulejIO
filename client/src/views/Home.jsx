import React, { Component } from "react";
import AzulejoThumbnail from "./../components/AzulejoThumbnail";
import { loadAll } from "./../services/azulejo-api";

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      azulejos: []
    };
  }

  componentDidMount() {
    loadAll()
      .then(azulejos => {
        azulejos.reverse();
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
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {this.state.azulejos.map(azulejo => {
              return (
                <AzulejoThumbnail
                  name={azulejo.name}
                  img={azulejo.imageUrl}
                  createdBy={azulejo.createdBy}
                  colors={azulejo.colors}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
