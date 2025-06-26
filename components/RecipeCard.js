import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';
import { FavoritesContext } from '../context/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';

const RecipeCard = ({ recipe, onPress }) => {
  const imageSource = typeof recipe.image === 'number'
    ? recipe.image
    : { uri: recipe.image };

  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={imageSource} style={styles.image} />

      {/* Heart Icon */}
      <TouchableOpacity
        style={styles.favoriteIcon}
        onPress={() => toggleFavorite(recipe)}
      >
        <Ionicons
          name={isFavorite(recipe.id) ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite(recipe.id) ? 'red' : '#999'}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{recipe.name}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>⏱️ {recipe.time}</Text>
          <Text style={styles.metaText}>⚡ {recipe.difficulty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffffffcc',
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
  textContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.primary,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
});

export default RecipeCard;
