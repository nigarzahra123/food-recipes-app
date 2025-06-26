import React, { useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <View style={{ flex: 1 }}>
      {favorites.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 30 }}>No favorites yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}
            />
          )}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;
