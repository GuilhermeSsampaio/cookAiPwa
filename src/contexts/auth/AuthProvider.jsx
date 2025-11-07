import { useState, useEffect } from "react";
import { AuthContext } from "../../constants/authContext";
import { BASE_URL } from "../../constants/constants";
import { userApiHandler } from "../../handlers/userApiHandler";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { registerIn, login, signOut } = userApiHandler(user, setUser);

  useEffect(() => {
    const storedUser = localStorage.getItem("@CookAI:user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, registerIn, login, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
