export const sendLoginForm = async (nickname, password) => {
  try {
    let loginFormJson = await fetch("http://localhost:3000/api/auth/login", {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: `${nickname}`,
        password: `${password}`,
      }),
    });
    let reponse = await loginFormJson.json();
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const sendSignUpForm = async (
  nickname,
  lastName,
  firstName,
  email,
  password
) => {
  try {
    let signUpFormJson = await fetch("http://localhost:3000/api/auth/signup", {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: `${nickname}`,
        lastName: `${lastName}`,
        firstName: `${firstName}`,
        email: `${email}`,
        password: `${password}`,
      }),
    });
    let reponse = await signUpFormJson.json();
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const requestUserInfos = async (id) => {
  try {
    let userInfosJson = await fetch(
      `http://localhost:3000/api/auth/users/${id}`,
      { method: "GET" }
    );
    let reponse = await userInfosJson.json();
    if (reponse.error) {
      return reponse.error;
    }
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const requestDeleteUserFromAPI = async (id) => {
  try {
    let userInfosJson = await fetch(
      `http://localhost:3000/api/auth/users/${id}`,
      { method: "DELETE" }
    );
    let reponse = await userInfosJson.json();
    if (reponse.error) {
      return reponse.error;
    }
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const sendProfilePictureToAPI = async (id, newFile, oldFile) => {
  try {
    let formData = new FormData();
    formData.append("file", newFile); // clé 'file' doit correspondre au single('file') du middleware multer-config dans le backend
    formData.append("oldfile", oldFile);
    let modifyReponseJson = await fetch(
      `http://localhost:3000/api/auth/users/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      }
    );
    let reponse = await modifyReponseJson.json();
    if (reponse.error) {
      return reponse.error;
    }
    return reponse;
  } catch (err) {
    let message = `Impossible de trouver l'API`;
    throw new Error(message);
  }
};

export const userLogged = () => {
  return localStorage.length != 0;
};
