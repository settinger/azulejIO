import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import { loadSearch, loadFavs } from "../services/azulejo-api";
import AzulejoThumbnail from "../components/AzulejoThumbnail";
import queryString from "query-string";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      azulejos: null,
      queries: null,
      otherQueries: null
    };
    this.loadAzulejosFav = this.loadAzulejosFav.bind(this);
    this.OlderNewerButtons = this.OlderNewerButtons.bind(this);
  }

  loadAzulejos() {
    loadSearch(this.props.location.search.substr(1))
      .then(response => {
        this.setState({
          loaded: true,
          azulejos: response.azulejos,
          response: response
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  loadAzulejosFav(userId) {
    loadFavs(`fav=${userId}`)
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
    this.loadAzulejos();
    this.setState({ queries: queryString.parse(this.props.location.search) });
    let otherQueries = "";
    for (let query in this.state.queries) {
      if (query !== "n" && query !== "p") {
        console.log(`Query is ${query}, value is ${this.state.queries[query]}`);
        otherQueries = otherQueries.concat(
          `${query}=${this.state.queries[query]}`
        );
      }
    }
    this.setState({ otherQueries });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.location.search !== this.props.location.search) {
      this.loadAzulejos();
    }
  }

  OlderNewerButtons() {
    return (
      <Fragment>
        {this.state.response && this.state.response.color && (
          <p>Filtering by color: {this.state.response.color}</p>
        )}
        {this.state.response && (
          <Fragment>
            <p>
              Showing results{" "}
              {this.state.response.n * this.state.response.p + 1} &ndash;{" "}
              {this.state.response.n * this.state.response.p +
                this.state.azulejos.length}
              .
            </p>
            {this.state.response.p > 0 && (
              <p>
                <Link
                  to={`/search?p=${this.state.response.p - 1}&n=${
                    this.state.response.n
                  }&color=${this.state.response.color}`}
                >
                  &larr; Newer azulejos
                </Link>
              </p>
            )}
            {this.state.azulejos.length === 20 && (
              <p>
                <Link
                  to={`/search?p=${this.state.response.p + 1}&n=${
                    this.state.response.n
                  }&color=${this.state.response.color}`}
                >
                  Older azulejos &rarr;
                </Link>
              </p>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Search</h1>
        <h2>Search results</h2>
        {this.OlderNewerButtons()}
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
        {this.OlderNewerButtons()}
      </div>
    );
  }
}
