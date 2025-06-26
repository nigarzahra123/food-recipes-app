import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  StyleSheet,
  TouchableOpacity // Add this import
} from 'react-native';
import TimerComponent from '../components/TimerComponent';
import { colors } from '../styles/globalStyles';

const RecipeDetailScreen = ({ route }) => {
  const { recipe } = route.params;
  const [activeTab, setActiveTab] = useState('ingredients');

  // Handle image source properly
  const imageSource = typeof recipe.image === 'number' 
    ? recipe.image 
    : { uri: recipe.image };

  return (
    <ScrollView style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{recipe.name}</Text>
      
      <View style={styles.metaContainer}>
        <Text style={styles.metaText}>⏱️ {recipe.time}</Text>
        <Text style={styles.metaText}>⚡ {recipe.difficulty}</Text>
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ingredients' && styles.activeTab]}
          onPress={() => setActiveTab('ingredients')}
        >
          <Text style={styles.tabText}>Ingredients</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'steps' && styles.activeTab]}
          onPress={() => setActiveTab('steps')}
        >
          <Text style={styles.tabText}>Steps</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'nutrition' && styles.activeTab]}
          onPress={() => setActiveTab('nutrition')}
        >
          <Text style={styles.tabText}>Nutrition</Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'ingredients' && (
        <View style={styles.content}>
          <Text style={styles.subtitle}>Ingredients:</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.listItem}>• {ingredient}</Text>
          ))}
        </View>
      )}
      
      {activeTab === 'steps' && (
        <View style={styles.content}>
          <Text style={styles.subtitle}>Steps:</Text>
          {recipe.steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <Text style={styles.stepNumber}>{index + 1}.</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
          <TimerComponent duration={recipe.time} />
        </View>
      )}
      
      {activeTab === 'nutrition' && (
        <View style={styles.content}>
          <Text style={styles.subtitle}>Nutritional Information:</Text>
          <Text style={styles.listItem}>
            Calories: {recipe.nutrition.calories}
          </Text>
          <Text style={styles.listItem}>
            Protein: {recipe.nutrition.protein}
          </Text>
          <Text style={styles.listItem}>
            Carbs: {recipe.nutrition.carbs}
          </Text>
          <Text style={styles.listItem}>
            Fat: {recipe.nutrition.fat}
          </Text>
          <Text style={styles.subtitle}>Allergens:</Text>
          <Text style={styles.listItem}>
            {recipe.allergens.join(', ')}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

// ... keep the existing styles ...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15,
    color: colors.primary,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  metaText: {
    fontSize: 16,
    color: '#666',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 24,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  stepNumber: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default RecipeDetailScreen;