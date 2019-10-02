import axios from "axios";

const azulejoAPI = axios.create({
  baseURL: "/"
});

export const loadUser = username => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .get(`/profile/${username}`)
      .then(response => {
        resolve(response.data.data.post);
      })
      .catch(error => {
        reject(error);
      });
  });
};
