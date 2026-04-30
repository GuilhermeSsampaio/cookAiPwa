import { api } from "../constants/constants";

export const usersHandler = (user, setUser) => {
  const registerIn = async (username, email, password) => {
    const userData = {
      username: username,
      email: email,
      password: password,
    };
    try {
      // 1. Cria o usuario
      await api.post("/auth/register", userData);

      // 2. Faz login para obter os tokens JWT
      const loginResponse = await api.post("/auth/login", {
        email,
        password,
      });
      const { access_token, refresh_token } = loginResponse.data;
      localStorage.setItem("@CookAI:token", access_token);
      localStorage.setItem("@CookAI:refresh_token", refresh_token);

      // 3. Busca o perfil completo do usuario
      const profileResponse = await api.get("/users/me");
      const profile = profileResponse.data;
      localStorage.setItem("@CookAI:user", JSON.stringify(profile));
      setUser(profile);
      return profile;
    } catch (error) {
      throw new Error("Erro ao fazer registro: " + error.message);
    }
  };

  const login = async (email, password) => {
    const userData = {
      email: email,
      password: password,
    };
    try {
      // 1. Faz login e obtem os tokens JWT
      const response = await api.post("/auth/login", userData);
      const { access_token, refresh_token } = response.data;
      localStorage.setItem("@CookAI:token", access_token);
      localStorage.setItem("@CookAI:refresh_token", refresh_token);

      // 2. Busca o perfil completo do usuario
      const profileResponse = await api.get("/users/me");
      const profile = profileResponse.data;
      localStorage.setItem("@CookAI:user", JSON.stringify(profile));
      setUser(profile);
      return profile;
    } catch (error) {
      throw new Error("Erro ao fazer login: " + error.message);
    }
  };

  const signOut = () => {
    console.log("saindo..");
    localStorage.removeItem("@CookAI:user");
    localStorage.removeItem("@CookAI:token");
    localStorage.removeItem("@CookAI:refresh_token");
    setUser(null);
  };

  /**
   * Completa login usando tokens ja obtidos (ex: Google OAuth).
   * Armazena os tokens e busca o perfil do usuario.
   */
  const loginWithToken = async (accessToken, refreshToken) => {
    try {
      localStorage.setItem("@CookAI:token", accessToken);
      if (refreshToken) {
        localStorage.setItem("@CookAI:refresh_token", refreshToken);
      }

      const profileResponse = await api.get("/users/me");
      const profile = profileResponse.data;
      localStorage.setItem("@CookAI:user", JSON.stringify(profile));
      setUser(profile);
      return profile;
    } catch (error) {
      localStorage.removeItem("@CookAI:token");
      localStorage.removeItem("@CookAI:refresh_token");
      throw new Error("Erro ao completar login: " + error.message);
    }
  };

  const getUserData = async () => {
    try {
      const userData = localStorage.getItem("@CookAI:user");
      if (!userData) return null;
      const userDataObject = JSON.parse(userData);
      if (!userDataObject || typeof userDataObject !== "object") return null;
      return userDataObject;
    } catch (error) {
      console.error("Erro ao recuperar os dados do usuario:", error);
      return null;
    }
  };

  return { registerIn, login, loginWithToken, getUserData, signOut };
};
