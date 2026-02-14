import { toast } from "react-toastify";
import { api } from "../constants/constants";

export function apiHandler() {
  const getSavedRecipes = async () => {
    try {
      const response = await api.get(`/cookai/users/my_recipes`);
      if (!response) toast.promise("Carregando...");
      return response.data;
    } catch (error) {
      toast.error("Erro ao carregar receitas. Tente novamente mais tarde.");
      throw error;
    }
  };

  const saveRecipe = async (dados) => {
    try {
      const response = await api.post(`/cookai/users/save_recipe`, dados);
      toast.success("Receita salva com sucesso!");
      return response.data;
    } catch (error) {
      toast.error("Erro ao salvar receita. Tente novamente mais tarde.");
      throw error;
    }
  };

  const scrapRecipe = async (url) => {
    try {
      const response = await api.post(
        `/cookai/recipes/scrap?url=${encodeURIComponent(url)}`,
      );
      toast.success("Receita extraída com sucesso!");
      return response.data;
    } catch (error) {
      toast.error(
        "Erro ao extrair receita. Verifique a URL e tente novamente.",
      );
      throw error;
    }
  };

  const searchRecipes = async (query) => {
    try {
      const response = await api.post(
        `/cookai/recipes/search_web?query=${encodeURIComponent(query)}`,
      );
      return response.data;
    } catch (error) {
      toast.error("Erro ao buscar receitas. Tente novamente mais tarde.");
      throw error;
    }
  };

  const updateRecipe = async (recipeId, dados) => {
    try {
      const response = await api.put(
        `/cookai/users/update_recipe/${recipeId}`,
        dados,
      );
      toast.success("Receita atualizada com sucesso!");
      return response.data;
    } catch (error) {
      toast.error("Erro ao atualizar receita. Tente novamente mais tarde.");
      throw error;
    }
  };

  const deleteRecipe = async (recipeId) => {
    try {
      const response = await api.delete(
        `/cookai/users/delete_recipe/${recipeId}`,
      );
      toast.success("Receita excluída com sucesso!");
      return response.data;
    } catch (error) {
      toast.error("Erro ao excluir receita. Tente novamente mais tarde.");
      throw error;
    }
  };

  return {
    getSavedRecipes,
    saveRecipe,
    scrapRecipe,
    searchRecipes,
    updateRecipe,
    deleteRecipe,
  };
}
