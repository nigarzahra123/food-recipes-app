import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Toggle favorite: add if not present, remove if already in favorites
  const toggleFavorite = (recipe) => {
    const exists = favorites.find((item) => item.id === recipe.id);
    if (exists) {
      setFavorites(favorites.filter((item) => item.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  // Check if a recipe is in favorites
  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
