import React from "react";

export default function Spinner() {
  return (
    <div
      className="spinner-border text-primary"
      role="status"
      style={{ width: "3rem", height: "3rem" }}
    >
      <span className="visually-hidden">Carregando...</span>
    </div>
  );
}
