import React, { Component } from "react";
// import Button from "react-bootstrap/Button";
import { loadSearch } from "../services/azulejo-api";
import AzulejoThumbnail from "../components/AzulejoThumbnail";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      azulejos: null
    };
  }

  loadAzulejos() {
    loadSearch(this.props.location.search.substr(1))
      .then(azulejos => {
        this.setState({
          loaded: true,
          azulejos
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadAzulejos();
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.location.search !== this.props.location.search) {
      this.loadAzulejos();
    }
  }

  render() {
    return (
      <div>
        <h1>Search</h1>
        <h2>Search results</h2>
        <div className="card-set">
          {this.state.azulejos &&
            this.state.azulejos.map(azulejo => {
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
      </div>
    );
  }
}
