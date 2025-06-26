import React from 'react';
import { 
  View, 
  Text, 
  FlatList, Image,
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Platform 
} from 'react-native';
import { categories } from '../constants/fakeApi';
import CategoryCard from '../components/CategoryCard';
import { colors } from '../styles/globalStyles';

const windowWidth = Dimensions.get('window').width;

const CategoryScreen = ({ navigation }) => {
  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('RecipeList', { 
        categoryId: item.id, // Pass category ID instead of name
        categoryName: item.name 
      })}
      activeOpacity={0.7}
    >
      <CategoryCard category={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.tagline}>Cheezy Food</Text>
      </View>
      
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: windowWidth * 0.03,
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    width: windowWidth * 0.3,   // ✅ Responsive width
    height: windowWidth * 0.3,  // ✅ Responsive height (square)
    resizeMode: 'contain',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  list: {
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});


export default CategoryScreen;