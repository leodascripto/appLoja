import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { RootStackParamList } from '../navigation';

interface ProductListProps {
  title: string;
  data: Product[];
  onAddToCart: (product: Product) => void;
  categoryId?: string;
}

const ProductList = ({ title, data, onAddToCart, categoryId }: ProductListProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSeeAllPress = () => {
    // Se tiver um categoryId, navega para visualizar todos os produtos dessa categoria
    if (categoryId) {
      navigation.navigate('SearchResults', {
        query: '',
        filterOptions: {
          category: categoryId,
          minPrice: null,
          maxPrice: null,
          sortBy: null
        },
        categoryName: title
      });
    } else {
      // Senão, simplesmente mostra todos os produtos
      navigation.navigate('SearchResults', {
        query: '',
        filterOptions: {
          category: null,
          minPrice: null,
          maxPrice: null,
          sortBy: null
        },
        categoryName: title
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text style={styles.seeAll}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard 
            product={item} 
            onAddToCart={onAddToCart}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // Disabled because it's inside a ScrollView
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#555',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 8,
  }
});

export default ProductList;