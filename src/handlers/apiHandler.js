import { toast } from "react-toastify";
import { api } from "../constants/constants";

export function apiHandler() {
  const getSavedRecipes = async (cookaiUserId) => {
    try {
      const response = await api.get(
        `/cook_ai/recipes/cookai_user/${cookaiUserId}`
      );
      if (!response) toast.promise("Carregando...");
      return response.data;
    } catch (error) {
      toast.error("Erro ao carregar receitas. Tente novamente mais tarde.");
      throw error;
    }
  };

  const saveRecipe = async (cookaiUserId, dados) => {
    try {
      const response = await api.post(
        `/cook_ai/recipes/cookai_user/${cookaiUserId}/save`,
        dados
      );
      toast.success("Receita salva com sucesso!");
      return response.data;
    } catch (error) {
      toast.error("Erro ao salvar receita. Tente novamente mais tarde.");
      throw error;
    }
  };

  const scrapRecipe = async (url) => {
    console.log(url);
    try {
      const response = await api.post(
        `cook_ai/recipes/scrap?url=${encodeURIComponent(url)}`
      );
      toast.success("Receita extraída com sucesso!");
      return response.data;
    } catch (error) {
      toast.error(
        "Erro ao extrair receita. Verifique a URL e tente novamente."
      );
      throw error;
    }
  };

  const searchRecipes = async (query) => {
    try {
      const response = await api.post("cook_ai/recipes/search", { query });
      return response.data;
    } catch (error) {
      toast.error("Erro ao buscar receitas. Tente novamente mais tarde.");
      throw error;
    }
  };

  const updateRecipe = async (cookaiUserId, recipeId, dados) => {
    try {
      const response = await api.put(
        `/cook_ai/recipes/cookai_user/${cookaiUserId}/${recipeId}`,
        dados
      );
      toast.success("Receita atualizada com sucesso!");
      return response.data;
    } catch (error) {
      toast.error("Erro ao atualizar receita. Tente novamente mais tarde.");
      throw error;
    }
  };

  const deleteRecipe = async (cookaiUserId, recipeId) => {
    try {
      const response = await api.delete(
        `/cook_ai/recipes/cookai_user/${cookaiUserId}/${recipeId}`
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
