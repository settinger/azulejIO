import React from "react";
import { Link } from "react-router-dom";

const AzulejoThumbnail = props => {
  const origUrl = props.img;
  const thumbIndex = origUrl.indexOf("/image/upload") + "/image/upload".length;
  const thumbUrl =
    origUrl.substring(0, thumbIndex) +
    "/c_thumb,w_300" +
    origUrl.substring(thumbIndex);

  return (
    <div className="card" style={{ width: "330px" }}>
      <Link to={`/azulejo/${props.id}`}>
        <img src={thumbUrl} alt="Azulejo thumbnail" className="card-img-top" />
      </Link>
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/azulejo/${props.id}`}>{props.name}</Link>
        </h5>
        {props.createdBy && (
          <p className="card-text">
            By <Link to={`/profile/${props.createdBy}`}>{props.createdBy}</Link>
          </p>
        )}
        <p className="card-text">
          {["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Black"].map(
            color => {
              return (
                props.colors.includes(color) && (
                  <span key={color} style={{ color: color.toLowerCase() }}>
                    ■
                  </span>
                )
              );
            }
          )}
        </p>
      </div>
    </div>
  );
};

export default AzulejoThumbnail;
