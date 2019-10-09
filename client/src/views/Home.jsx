import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AzulejoThumbnail from "./../components/AzulejoThumbnail";
import { loadRecent } from "./../services/azulejo-api";
import CardGroup from "react-bootstrap/CardGroup";
import { loadSearch } from "../services/azulejo-api";

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      azulejos: []
    };
    this.loadAzulejosFav = this.loadAzulejosFav.bind(this);
  }
  loadAzulejosFav(userId) {
    loadSearch(`fav=${userId}`)
      .then(azulejosFav =>
        this.setState({
          ...this.state,
          azulejosFav
        })
      )
      .catch(error => {
        console.log("BIG ERROR", error);
      });
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
      <div className="py-5">
        {/* <h1 id="h1">AZULEJ.IO</h1>
        <p>Here are some recent designs by users:</p> */}
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
                    fav={azulejo.fav}
                    remixedFromTitle={
                      azulejo._remixedFrom && azulejo._remixedFrom.name
                    }
                    remixedFromId={
                      azulejo._remixedFrom && azulejo._remixedFrom._id
                    }
                    remixedFromUser={
                      azulejo._remixedFrom &&
                      azulejo._remixedFrom._createdBy.username
                    }
                    user={this.props.user}
                    loadAzulejosFav={this.loadAzulejosFav}
                  />
                );
              })}
            </div>
          </CardGroup>
        )}
        <Link to="/search?p=1&n=20">Browse older designs</Link>
      </div>
    );
  }
}
