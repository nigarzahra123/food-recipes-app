import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../styles/globalStyles';

const windowWidth = Dimensions.get('window').width;

const CategoryCard = ({ category }) => {
  return (
    <View style={styles.container}>
      <Image source={category.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{category.name}</Text>
        <Text style={styles.description}>{category.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.45, // 45% of screen width
    margin: windowWidth * 0.025, // 2.5% margin
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: windowWidth * 0.3, // Responsive height based on width
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: windowWidth * 0.04, // Responsive font size
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.primary,
  },
  description: {
    fontSize: windowWidth * 0.03, // Responsive font size
    color: '#666',
  },
});

export default CategoryCard;
