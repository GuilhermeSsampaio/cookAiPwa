import { api } from "../constants/constants";

export const userApiHandler = (user, setUser) => {
  const registerIn = async (username, email, password) => {
    const userData = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const response = await api.post("auth/users/register", userData);
      const data = response.data; // Corrigido: axios já retorna o JSON parseado
      console.log(data);
      localStorage.setItem("@CookAI:user", JSON.stringify(data));
      setUser(data);
      return data;
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
      const response = await api.post("auth/users/login", userData);
      const data = response.data; // Corrigido: axios já retorna o JSON parseado

      localStorage.setItem("@CookAI:user", JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
      throw new Error("Erro ao fazer login: " + error.message);
    }
  };

  const signOut = () => {
    console.log("saindo..");
    localStorage.removeItem("@CookAI:user");
    setUser(null);
  };

  const getUserData = async () => {
    try {
      const userData = localStorage.getItem("@CookAI:user");
      if (!userData) return null;
      const userDataObject = JSON.parse(userData);
      if (!userDataObject || typeof userDataObject !== "object") return null;
      return userDataObject;
    } catch (error) {
      console.error("Erro ao recuperar os dados do usuário:", error);
      return null;
    }
  };

  return { registerIn, login, getUserData, signOut };
};
