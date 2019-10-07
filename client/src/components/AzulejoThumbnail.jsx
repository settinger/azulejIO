import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fav } from "./../services/azulejo-api";

class AzulejoThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addFav = this.addFav.bind(this);
  }

  addFav() {
    fav(this.props.id)
      .then(azulejo => {
        console.log(azulejo);
        this.props.history.push(`/azulejo/${azulejo._id}`);
      })
      .catch(error => {
        console.log(error);
      });
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
            <li className="list-inline-item mr-4">
              <FontAwesomeIcon icon="heart" color="#17a2b8" />
              <span className="ml-2">
                <Link onClick={this.addFav}>{this.props.fav}</Link>
              </span>
            </li>
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
                By
                <Link className="link" to={`/profile/${this.props.createdBy}`}>
                  {this.props.createdBy}
                </Link>
              </Fragment>
            )}
            <p className="card-text">
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
            </p>
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
