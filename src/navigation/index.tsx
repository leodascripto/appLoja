// src/navigation/index.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';

// Profile Screens
import OrdersScreen from '../screens/profile/OrdersScreen';
import AddressesScreen from '../screens/profile/AddressesScreen';
import PaymentMethodsScreen from '../screens/profile/PaymentMethodsScreen';
import WishlistScreen from '../screens/profile/WishlistScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import HelpSupportScreen from '../screens/profile/HelpSupportScreen';

// Types
import { Product } from '../types';

export type RootStackParamList = {
  Main: undefined;
  ProductDetail: { product: Product };
  SearchResults: { 
    query: string; 
    filterOptions?: {
      category: string | null;
      minPrice: number | null;
      maxPrice: number | null;
      sortBy: 'price_asc' | 'price_desc' | 'rating' | null;
    };
    categoryName?: string;
  };
  Cart: undefined;
  // Novas rotas de perfil
  Orders: undefined;
  Addresses: undefined;
  PaymentMethods: undefined;
  Wishlist: undefined;
  Settings: undefined;
  Help: undefined;
};

export type TabParamList = {
  Home: undefined;
  Categories: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const CustomTabBarIcon = ({ focused, color, icon, label }: { focused: boolean, color: string, icon: string, label: string }) => {
  return (
    <View style={styles.tabIconContainer}>
      <MaterialCommunityIcons name={icon as any} color={color} size={24} />
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
    </View>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#333',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          borderTopColor: '#eee',
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused, color }) => (
            <CustomTabBarIcon 
              focused={focused} 
              color={color} 
              icon="home" 
              label="Início" 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{
          tabBarIcon: ({ focused, color }) => (
            <CustomTabBarIcon 
              focused={focused} 
              color={color} 
              icon="view-grid" 
              label="Categorias" 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{
          tabBarIcon: ({ focused, color }) => (
            <CustomTabBarIcon 
              focused={focused} 
              color={color} 
              icon="cart" 
              label="Carrinho" 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ focused, color }) => (
            <CustomTabBarIcon 
              focused={focused} 
              color={color} 
              icon="account" 
              label="Perfil" 
            />
          ),
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
        
        {/* Novas telas de perfil */}
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="Addresses" component={AddressesScreen} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Help" component={HelpSupportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default AppNavigator;