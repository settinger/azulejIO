import axios from "axios";

const azulejoAPI = axios.create({
  baseURL: "/api/"
});

export const loadAll = () => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .get("/azulejos/all")
      .then(response => {
        resolve(response.data.azulejos);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const loadSearch = searchQuery => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .get(`/azulejos/search?${searchQuery}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const loadFavs = searchQuery => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .get(`/azulejos/search?${searchQuery}&n=999`)
      .then(response => {
        resolve(response.data.azulejos);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const loadRecent = n => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .get(`/azulejos/recent?n=${n}&p=0`)
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

export const rate = (id, ratingData) => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .post(`azulejo/${id}/rate`, ratingData)
      .then(response => {
        resolve(response.data.review);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const fav = id => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .post(`azulejo/${id}/fav`)
      .then(response => {
        resolve(response.data.azulejo.fav);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const removeFav = id => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .post(`azulejo/${id}/removefav`)
      .then(response => {
        resolve(response.data.azulejo.fav);
      })
      .catch(error => {
        reject(error);
      });
  });
};

//CREATE AZULEJO DESIGN
export const create = azulejoDesign => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .post("/azulejo/create", azulejoDesign)
      .then(response => {
        resolve(response.data.azulejo);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

//DELETE AZULEJO DESIGN
export const deleteDesign = id => {
  return new Promise((resolve, reject) => {
    azulejoAPI
      .post(`/azulejo/delete/${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
