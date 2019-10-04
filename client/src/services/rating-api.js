import axios from "axios";

const azulejoAPI = axios.create({
  baseURL: "/azulejo"
});

export const rate = (id, ratingData) => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .post(`/${id}/rate`, ratingData)
      .then(response => {
        resolve(response.data.review);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const loadSingle = id => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .get(`/${id}`)
      .then(response => {
        console.log(response);
        resolve(response.data.azulejo);
      })
      .catch(error => {
        reject(error);
      });
  });
};
