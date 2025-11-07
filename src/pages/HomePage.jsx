import React from "react";
import { useAuth } from "../contexts/auth/useAuth";

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <div>
      <h1>Bem-vindo{user ? `, ${user.username}` : ""}!</h1>
      <button onClick={signOut}>Sair</button>
    </div>
  );
}
