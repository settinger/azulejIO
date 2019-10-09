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
    middleStar = <FontAwesomeIcon icon={["far", "star"]} />;
  } else if (rating % 1 < 0.75) {
    middleStar = <FontAwesomeIcon icon={faStarHalfAlt} />;
  } else {
    middleStar = <FontAwesomeIcon icon={["fas", "star"]} />;
  }

  return (
    <div>
      {[...Array(fullStars)].map(() => (
        <FontAwesomeIcon icon={["fas", "star"]} />
      ))}
      {middleStar}
      {[...Array(emptyStars)].map(() => (
        <FontAwesomeIcon icon={["far", "star"]} />
      ))}
    </div>
  );
};

export default StarRating;
