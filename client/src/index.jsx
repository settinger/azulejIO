import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  fab,
  faFacebookF,
  faInstagram,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { faHeart, faComments, faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

library.add(
  fab,
  faFacebookF,
  faInstagram,
  faTwitter,
  faHeart,
  farHeart,
  faComments,
  faStar
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
