import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { colors } from '../styles/globalStyles';

const RecipeListScreen = ({ route, navigation }) => {
  const { categoryName } = route.params;
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        
        const response = await fetch(`http://192.168.30.59:3000/recipes?category=${categoryName}`);

        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [categoryName]);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderRecipe = ({ item }) => (
    <RecipeCard
      recipe={item}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    />
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoryName} Recipes</Text>
      <SearchBar searchText={searchText} onSearchChange={setSearchText} />
      {filteredRecipes.length === 0 ? (
        <Text style={styles.emptyText}>No recipes found.</Text>
      ) : (
        <FlatList
          data={filteredRecipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.primary,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
  list: {
    paddingBottom: 20,
  },
});

export default RecipeListScreen;
