import axios from "axios";

const azulejoAPI = axios.create({
  baseURL: "/azulejo"
});

export const rate = (id, ratingData) => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .post(`/rate/${id}`, ratingData)
      .then(response => {
        resolve(response.data.review);
      })
      .catch(error => {
        reject(error);
      });
  });
};
