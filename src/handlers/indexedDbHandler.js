// IndexedDB handler para receitas offline e último scraping
// Uso: await indexedDbHandler.addRecipe(recipe), etc.

const DB_NAME = "CookAI_DB";
const DB_VERSION = 1;
const RECIPES_STORE = "recipes";
const LAST_SCRAP_STORE = "lastScrap";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (event) => reject("Erro ao abrir IndexedDB");
    request.onsuccess = (event) => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(RECIPES_STORE)) {
        db.createObjectStore(RECIPES_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains(LAST_SCRAP_STORE)) {
        db.createObjectStore(LAST_SCRAP_STORE, { keyPath: "key" });
      }
    };
  });
}

export const indexedDbHandler = {
  async addRecipe(recipe) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([RECIPES_STORE], "readwrite");
      const store = tx.objectStore(RECIPES_STORE);
      const req = store.add(recipe);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject("Erro ao adicionar receita");
    });
  },

  async getAllRecipes() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([RECIPES_STORE], "readonly");
      const store = tx.objectStore(RECIPES_STORE);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject("Erro ao buscar receitas");
    });
  },

  async removeRecipe(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([RECIPES_STORE], "readwrite");
      const store = tx.objectStore(RECIPES_STORE);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject("Erro ao remover receita");
    });
  },

  async updateRecipe(recipe) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([RECIPES_STORE], "readwrite");
      const store = tx.objectStore(RECIPES_STORE);
      const req = store.put(recipe);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject("Erro ao atualizar receita");
    });
  },

  async clearRecipes() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([RECIPES_STORE], "readwrite");
      const store = tx.objectStore(RECIPES_STORE);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject("Erro ao limpar receitas");
    });
  },

  async saveLastScrap(data) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([LAST_SCRAP_STORE], "readwrite");
      const store = tx.objectStore(LAST_SCRAP_STORE);
      const req = store.put({ key: "last", data });
      req.onsuccess = () => resolve();
      req.onerror = () => reject("Erro ao salvar último scrap");
    });
  },

  async getLastScrap() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([LAST_SCRAP_STORE], "readonly");
      const store = tx.objectStore(LAST_SCRAP_STORE);
      const req = store.get("last");
      req.onsuccess = () => resolve(req.result ? req.result.data : null);
      req.onerror = () => reject("Erro ao buscar último scrap");
    });
  },

  async clearLastScrap() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([LAST_SCRAP_STORE], "readwrite");
      const store = tx.objectStore(LAST_SCRAP_STORE);
      const req = store.delete("last");
      req.onsuccess = () => resolve();
      req.onerror = () => reject("Erro ao limpar último scrap");
    });
  },
};
