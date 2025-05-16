import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  Alert
} from 'react-native';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductListProps {
  title: string;
  data: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList = ({ title, data, onAddToCart }: ProductListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 8,
  }
});

export default ProductList;