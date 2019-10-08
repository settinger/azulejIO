import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fav, removeFav } from "../services/azulejo-api";

class AzulejoThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: null
    };
    this.addFav = this.addFav.bind(this);
    this.removeFav = this.removeFav.bind(this);
  }

  addFav() {
    fav(this.props.id)
      .then(fav => {
        this.setState({
          fav: fav
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  removeFav() {
    removeFav(this.props.id)
      .then(fav => {
        this.setState({
          fav: fav
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.setState({
      fav: this.props.fav
    });
    // this.props.loadAzulejosFav(this.props.user._id);
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      this.props.user &&
      (!this.state.fav || previousState.fav !== this.state.fav)
    ) {
      console.log("FAV STATE UPDATED", this.state.fav);
      this.setState({
        ...this.state
      });
      this.props.loadAzulejosFav(this.props.user._id);
    }
  }

  render() {
    const origUrl = this.props.img;
    const thumbIndex =
      origUrl.indexOf("/image/upload") + "/image/upload".length;
    const thumbUrl =
      origUrl.substring(0, thumbIndex) +
      "/c_thumb,w_300" +
      origUrl.substring(thumbIndex);

    return (
      <Card style={{ width: "18rem" }} className="shadow m-2 hoverCard">
        <Link className="link" to={`/azulejo/${this.props.id}`}>
          <Card.Img
            className="bgCardImg"
            src="/img/lukas-blazek-EWDvHNNfUmQ-unsplash.jpg"
            alt="Azulejo Thumbnail"
          />
          <Card.Img
            className="cardImg"
            src={thumbUrl}
            alt="Azulejo Thumbnail"
          />
        </Link>
        <div class="cardButton">View Azulejo</div>

        <div className="mask rgba-white-slight" />

        <Card.Body>
          <ul className="list-inline">
            {/* Favorites */}
            {(this.state.fav &&
              this.props.user &&
              !this.state.fav.includes(this.props.user._id) && (
                <li className="list-inline-item mr-4">
                  <span onClick={this.addFav} style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon icon={["far", "heart"]} color="#17a2b8" />
                    <span className="ml-2">
                      {this.state.fav && this.state.fav.length}
                    </span>
                  </span>
                </li>
              )) || (
              <li className="list-inline-item mr-4">
                <span onClick={this.removeFav} style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon="heart" color="#17a2b8" />
                  <span className="ml-2">
                    {this.state.fav && this.state.fav.length}
                  </span>
                </span>
              </li>
            )}

            {/* Comments */}
            <li className="list-inline-item mr-4">
              <FontAwesomeIcon icon="comments" color="#17a2b8" />
              <span className="ml-2">{this.props.reviews.length}</span>
            </li>
            {/* Average rating */}
            <li className="list-inline-item mr-4">
              <FontAwesomeIcon icon="star" color="#17a2b8" />
              <span className="ml-2">
                {this.props.reviews
                  .map(v => v.rating)
                  .reduce((acc, v, i, a) => {
                    acc += v;
                    return acc / a.length;
                  }, 0)
                  .toFixed(1)}
              </span>
            </li>
          </ul>

          {/* Azulejo name */}
          <Card.Title>
            <Link className="link" to={`/azulejo/${this.props.id}`}>
              <h2>{this.props.name}</h2>
            </Link>
          </Card.Title>
          <hr />

          <Card.Text>
            {/* Remix */}
            {this.props.remixedFromTitle && (
              <Fragment>
                Remixed from{" "}
                <i>
                  <Link
                    className="link"
                    to={`/azulejo/${this.props.remixedFromId}`}
                  >
                    {this.props.remixedFromTitle}
                  </Link>
                </i>{" "}
                by{" "}
                <Link
                  className="link"
                  to={`/profile/${this.props.remixedFromUser}`}
                >
                  {this.props.remixedFromUser}
                </Link>
              </Fragment>
            )}

            {/* Azulejo colors */}
            {[
              "Red",
              "Orange",
              "Yellow",
              "Green",
              "Blue",
              "Purple",
              "Black"
            ].map(color => {
              return (
                this.props.colors.includes(color) && (
                  <span key={color} style={{ color: color.toLowerCase() }}>
                    <Link to={`/search?color=${color}`} className="no-style">
                      ■
                    </Link>
                  </span>
                )
              );
            })}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default AzulejoThumbnail;
