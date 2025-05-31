import axios from "axios";

export async function register({ username, password, passwordConfirm }) {
  try {
    const response = await axios.post("/api/auth/users", {
      username,
      password,
      passwordConfirm,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export async function login({ username, password }) {
  try {
    const response = await axios.post("/api/auth/sessions", {
      username,
      password,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export async function checkAuth() {
  try {
    const response = await axios.get("/api/auth/sessions", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    await axios.delete("/api/auth/sessions", {
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
}

export default {
  register,
  login,
  checkAuth,
  logout,
};
