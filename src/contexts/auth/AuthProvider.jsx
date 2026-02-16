import { useState, useEffect } from "react";
import { AuthContext } from "../../constants/authContext";
import { api } from "../../constants/constants";
import { usersHandler } from "../../handlers/usersHandler";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { registerIn, login, loginWithToken, signOut } = usersHandler(
    user,
    setUser,
  );

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem("@CookAI:user");
      const storedToken = localStorage.getItem("@CookAI:token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));

        // Valida o token em background — se expirado, o interceptor
        // faz refresh automaticamente usando o refresh_token
        try {
          const profileResponse = await api.get("/cookai/users/me");
          const profile = profileResponse.data;
          localStorage.setItem("@CookAI:user", JSON.stringify(profile));
          setUser(profile);
        } catch {
          // Se mesmo o refresh falhou, o interceptor já deslogou
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, registerIn, login, loginWithToken, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
