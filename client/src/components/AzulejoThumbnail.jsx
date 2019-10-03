import React from "react";
import { Link } from "react-router-dom";

const AzulejoThumbnail = props => {
  return (
    <div className="card" style={{ width: "330px" }}>
      <img src={props.img} alt="Azulejo thumbnail" className="card-img-top" />
      <div className="card-body">
        <h5 class="card-title">{props.name}</h5>
        <p class="card-text">By {props.createdBy}</p>
        <p class="card-text">
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
