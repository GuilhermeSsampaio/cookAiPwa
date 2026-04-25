export const getMealType = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "café";
  if (hour >= 12 && hour < 14) return "almoço";
  if (hour >= 14 && hour < 17) return "lanche";
  if (hour >= 17 && hour < 21) return "janta";
  return "café";
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Bom dia";
  if (hour >= 12 && hour < 18) return "Boa tarde";
  return "Boa noite";
};

export const mockRecipes = {
  café: [
    {
      id: 1,
      name: "Panquecas de Aveia",
      mealType: "café da manhã",
      prepTime: 15,
      servings: 2,
      description:
        "Panquecas fofas feitas com aveia integral, ovos frescos e um toque de mel. Perfeitas para começar o dia com energia.",
      image:
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop",
    },
  ],
  almoço: [
    {
      id: 2,
      name: "Frango ao Alho",
      mealType: "almoço",
      prepTime: 30,
      servings: 4,
      description:
        "Peito de frango marinado em alho e limão, grelhado na perfeição com um lado de arroz fluffy.",
      image:
        "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
    },
  ],
  lanche: [
    {
      id: 3,
      name: "Bolo de Chocolate",
      mealType: "lanche",
      prepTime: 40,
      servings: 8,
      description:
        "Um delicioso bolo de chocolate caseiro com calda derretida e toque de café.",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    },
  ],
  janta: [
    {
      id: 4,
      name: "Salmão Assado",
      mealType: "janta",
      prepTime: 25,
      servings: 2,
      description:
        "Filé de salmão com ervas frescas, assado com vegetais coloridos no forno.",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    },
  ],
};

export const getRandomRecipe = () => {
  const mealType = getMealType();
  const recipes = mockRecipes[mealType] || mockRecipes.café;
  return recipes[Math.floor(Math.random() * recipes.length)];
};
