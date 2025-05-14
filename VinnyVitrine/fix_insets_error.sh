#!/bin/bash

# Script para corrigir o erro de topInsetsChange
echo "Corrigindo o erro de 'topInsetsChange'..."

# Atualizar App.tsx para usar SafeAreaProvider
echo "Atualizando App.tsx..."
cat > App.tsx << 'EOL'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
EOL

# Atualizar o arquivo de navegação para usar a safe area
echo "Atualizando o arquivo de navegação..."
cat > src/navigation/index.tsx << 'EOL'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';

// Types
import { Product } from '../types';

export type RootStackParamList = {
  Main: undefined;
  ProductDetail: { product: Product };
  SearchResults: { query: string };
  Cart: undefined;
};

export type TabParamList = {
  Home: undefined;
  Categories: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#333',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          borderTopColor: '#eee',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          tabBarLabel: 'Início',
        }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-grid" color={color} size={size} />
          ),
          tabBarLabel: 'Categorias',
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
          tabBarLabel: 'Carrinho',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
EOL

# Atualizar o HomeScreen.tsx para não usar StatusBar duplicado
echo "Atualizando HomeScreen.tsx..."
cat > src/screens/HomeScreen.tsx << 'EOL'
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
        />
        
        <ProductList 
          title="Populares" 
          data={products.slice(0, 6)} 
          onAddToCart={handleAddToCart}
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
EOL

echo "Todas as correções foram aplicadas com sucesso!"
echo "Execute 'npx expo start' para iniciar o aplicativo novamente."