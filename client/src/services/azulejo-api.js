import axios from "axios";

const azulejoAPI = axios.create({
  baseURL: "/"
});

export const loadAll = () => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .get("/")
      .then(response => {
        resolve(response.data.azulejos);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const loadSingle = id => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .get(`/azulejo/${id}`)
      .then(response => {
        resolve(response.data.azulejo);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const rate = ratingData => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .post("/azulejo/rate/:id", ratingData)
      .then(response => {
        resolve(response.data.data.post);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// //CREATE AZULEJO DESIGN
// export const rate = azulejoDesign => {
//   return new Promise((resolve, reject) => {
//     azulejoAPI
//       .post("/azulejo/create", azulejoDesign)
//       .then(response => {
//         resolve(response.data.data.post);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const remove = id => {
//   return new Promise((resolve, reject) => {
//     postApi
//       .delete(`/azulejo/delete/${id}`)
//       .then(() => {
//         resolve();
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };
