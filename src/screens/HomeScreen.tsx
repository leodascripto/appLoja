import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Alert 
} from 'react-native';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import ProductList from '../components/ProductList';
import { featuredProducts, products } from '../utils/mockData';
import { Product, CartItem } from '../types';

const HomeScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // Item já está no carrinho, atualizar quantidade
      setCartItems(
        cartItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      );
    } else {
      // Adicionar novo item ao carrinho
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
    
    Alert.alert('Produto adicionado ao carrinho!');
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Carousel 
          title="Destaques" 
          data={featuredProducts}
          // Passando uma prop fictícia para os destaques, como se fosse uma categoria "featured" 
        />
        
        <ProductList 
          title="Sala de Estar" 
          data={products.filter(p => p.category === "1").slice(0, 4)} 
          onAddToCart={handleAddToCart}
          categoryId="1"
        />

        <ProductList 
          title="Quarto" 
          data={products.filter(p => p.category === "2").slice(0, 4)} 
          onAddToCart={handleAddToCart}
          categoryId="2"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContent: {
    paddingBottom: 24,
  },
});

export default HomeScreen;