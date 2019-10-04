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
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">By {props.createdBy}</p>
        <p className="card-text">
          {props.colors.includes("Red") && (
            <span style={{ color: "red" }}>■</span>
          )}
          {props.colors.includes("Orange") && (
            <span style={{ color: "orange" }}>■</span>
          )}
          {props.colors.includes("Yellow") && (
            <span style={{ color: "yellow" }}>■</span>
          )}
          {props.colors.includes("Green") && (
            <span style={{ color: "green" }}>■</span>
          )}
          {props.colors.includes("Blue") && (
            <span style={{ color: "blue" }}>■</span>
          )}
          {props.colors.includes("Purple") && (
            <span style={{ color: "purple" }}>■</span>
          )}
          {props.colors.includes("Black") && (
            <span style={{ color: "black" }}>■</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default AzulejoThumbnail;
