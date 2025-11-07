import React, { useEffect, useState, useRef } from "react";

export default function ScrapBar({ onScrap }) {
  const [inputText, setInputText] = useState("");
  const [recentLinks, setRecentLinks] = useState([]);
  const [showRecentLinks, setShowRecentLinks] = useState(false);
  const inputRef = useRef(null);

  // Carregar links recentes do localStorage ao montar o componente
  useEffect(() => {
    try {
      const storedLinks = localStorage.getItem("recentLinks");
      if (storedLinks) {
        setRecentLinks(JSON.parse(storedLinks));
      }
    } catch (error) {
      console.error("Erro ao carregar links recentes:", error);
    }
  }, []);

  // Função para salvar o link pesquisado
  const handleSearch = () => {
    if (inputText.trim() === "") return;

    try {
      const updatedLinks = [
        inputText,
        ...recentLinks.filter((link) => link !== inputText),
      ].slice(0, 4); // Limita a 4 links
      setRecentLinks(updatedLinks);
      localStorage.setItem("recentLinks", JSON.stringify(updatedLinks));
      if (onScrap) onScrap(inputText);
      setInputText(""); // Limpa o campo de entrada
      setShowRecentLinks(false);
    } catch (error) {
      console.error("Erro ao salvar link:", error);
    }
  };

  // Fecha a lista de links recentes ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowRecentLinks(false);
      }
    }
    if (showRecentLinks) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRecentLinks]);

  return (
    <div ref={inputRef}>
      <div style={styles.container}>
        <input
          style={styles.input}
          placeholder="Cole o link da receita aqui..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onFocus={() => setShowRecentLinks(true)}
        />
        <button onClick={handleSearch} style={styles.iconButton}>
          <span
            role="img"
            aria-label="search"
            style={{ fontSize: 22, color: "#ef9744ff" }}
          >
            🔍
          </span>
        </button>
      </div>
      {/* Exibir links recentes */}
      {showRecentLinks && recentLinks.length > 0 && (
        <div style={styles.recentLinksContainer}>
          {recentLinks.map((item, index) => (
            <div
              key={`${item}-${index}`}
              style={styles.recentLinkItem}
              onClick={() => {
                setInputText(item);
                setShowRecentLinks(false);
              }}
            >
              <span style={styles.recentLinkText}>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6d9d9ff",
    borderRadius: 24,
    padding: "0 16px",
    margin: 16,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#333",
    border: "none",
    outline: "none",
    background: "transparent",
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  recentLinksContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: "0 16px",
    padding: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    position: "absolute",
    zIndex: 10,
    width: "calc(100% - 32px)",
  },
  recentLinkItem: {
    padding: "8px 0",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },
  recentLinkText: {
    fontSize: 14,
    color: "#333",
  },
};
