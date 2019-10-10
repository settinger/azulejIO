import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const StarRating = props => {
  const rating = parseFloat(props.children);
  // Get number of definitely full stars
  const fullStars = Math.floor(rating);
  // Get number of definitely empty stars
  const emptyStars = 5 - Math.ceil(rating);
  // Get if the middle star should be empty, full, or half-full
  let middleStar;
  if (rating % 1 === 0) {
    middleStar = "";
  } else if (rating % 1 < 0.25) {
    middleStar = <FontAwesomeIcon icon={["far", "star"]} color={props.color} />;
  } else if (rating % 1 < 0.75) {
    middleStar = <FontAwesomeIcon icon={faStarHalfAlt} color={props.color} />;
  } else {
    middleStar = <FontAwesomeIcon icon={["fas", "star"]} color={props.color} />;
  }

  return (
    <div>
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon icon={["fas", "star"]} color={props.color} key={i} />
      ))}
      {middleStar}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesomeIcon icon={["far", "star"]} color={props.color} key={i} />
      ))}
    </div>
  );
};

export default StarRating;
