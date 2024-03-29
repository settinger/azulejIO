import axios from "axios";

const authAPI = axios.create({
  baseURL: "/api/auth"
});

export const signUp = ({ email, username, imageUrl, password }) => {
  return new Promise((resolve, reject) => {
    authAPI
      .post("/signup", { email, username, imageUrl, password })
      .then(response => {
        resolve(response.data.user);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const signIn = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    authAPI
      .post("/signin", { email, password })
      .then(response => {
        resolve(response.data.user);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const signOut = () => {
  return new Promise((resolve, reject) => {
    authAPI
      .post("/signout")
      .then(response => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const verify = () => {
  return new Promise((resolve, reject) => {
    authAPI
      .get("/verify")
      .then(response => {
        const user = response.data.user.user;
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const loadUser = username => {
  return new Promise((resolve, reject) => {
    authAPI
      .get(`/profile/${username}`)
      .then(response => {
        resolve(response.data.user);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const edit = (username, data) => {
  return new Promise((resolve, reject) => {
    authAPI
      .patch(`/profile/${username}/edit`, data)
      .then(response => {
        resolve(response.data.user);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const remove = username => {
  return new Promise((resolve, reject) => {
    authAPI
      .delete(`/profile/${username}`)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const handleUpload = theFile => {
  return new Promise((resolve, reject) => {
    authAPI
      .post("/upload", theFile)
      .then(res => resolve(res.data))
      .catch(error => {
        reject(error);
      });
  });
};
