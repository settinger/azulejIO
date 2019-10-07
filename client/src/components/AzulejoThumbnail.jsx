import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fav, removeFav } from "./../services/azulejo-api";

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
        // console.log(this.state);
      })
      .catch(error => {
        console.log(error);
      });
  }
  removeFav() {
    removeFav(this.props.id)
      .then(fav => {
        // console.log("FAV", fav);
        this.setState({
          fav: fav
        });
        console.log(this.state);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.setState({
      fav: this.props.fav
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (!this.state.fav || previousState.fav !== this.state.fav) {
      this.setState({
        ...this.state
      });
    }
  }

  render() {
    // console.log(this.props);
    const origUrl = this.props.img;
    const thumbIndex =
      origUrl.indexOf("/image/upload") + "/image/upload".length;
    const thumbUrl =
      origUrl.substring(0, thumbIndex) +
      "/c_thumb,w_300" +
      origUrl.substring(thumbIndex);
    return (
      <Card style={{ width: "18rem" }} className="shadow m-2">
        <Link className="link" to={`/azulejo/${this.props.id}`}>
          <Card.Img
            className="card-img-top"
            src={thumbUrl}
            alt="Azulejo Thumbnail"
          />
        </Link>

        <div className="mask rgba-white-slight" />

        <Card.Body>
          <ul className="list-inline">
            {(this.state.fav &&
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

            <li className="list-inline-item mr-4">
              <FontAwesomeIcon icon="comments" color="#17a2b8" />
              <span className="ml-2">{this.props.reviews.length}</span>
            </li>
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
          <Card.Title>
            <Link className="link" to={`/azulejo/${this.props.id}`}>
              {this.props.name}
            </Link>
          </Card.Title>
          <hr />

          <Card.Text>
            {this.props.createdBy && (
              <Fragment>
                By{" "}
                <Link className="link" to={`/profile/${this.props.createdBy}`}>
                  {this.props.createdBy}
                </Link>
              </Fragment>
            )}
            <br />
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
            <br />
            <Button className="btn-info">View Azulejo</Button>
          </Card.Text>
        </Card.Body>
      </Card>

      // <div className="card" style={{ width: "330px" }}>
      //   <Link to={`/azulejo/${props.id}`}>
      //     <img src={thumbUrl} alt="Azulejo thumbnail" className="card-img-top" />
      //   </Link>
      //   <div className="card-body">
      //     <h5 className="card-title">
      //       <Link to={`/azulejo/${props.id}`}>{props.name}</Link>
      //     </h5>
      //     {props.createdBy && (
      //       <p className="card-text">
      //         By <Link to={`/profile/${props.createdBy}`}>{props.createdBy}</Link>
      //       </p>
      //     )}
      //     <p className="card-text">
      //       Rating:{" "}
      //       {props.reviews
      //         .map(v => v.rating)
      //         .reduce((acc, v, i, a) => {
      //           acc += v;
      //           return acc / a.length;
      //         }, 0)
      //         .toFixed(1)}
      //     </p>{" "}
      //     <p className="card-text">
      //       {["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Black"].map(
      //         color => {
      //           return (
      //             props.colors.includes(color) && (
      //               <span key={color} style={{ color: color.toLowerCase() }}>
      //                 <Link to={`/search?color=${color}`} className="no-style">
      //                   ■
      //                 </Link>
      //               </span>
      //             )
      //           );
      //         }
      //       )}
      //     </p>
      //   </div>
      // </div>
    );
  }
}

export default AzulejoThumbnail;
