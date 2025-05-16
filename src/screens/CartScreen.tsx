import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CartItem } from '../types';

// Dados de exemplo para o carrinho
const initialCartItems: CartItem[] = [
  {
    product: {
      id: '1',
      name: 'Sofá Modular Elegance',
      description: 'Sofá modular de 3 lugares com tecido premium.',
      price: 2999.99,
      image: require('../../assets/img/sofa.jpg'),
      category: '1',
      featured: true,
      rating: 4.8,
      reviews: 124,
    },
    quantity: 1,
  },
  {
    product: {
      id: '4',
      name: 'Cama Queen Oslo',
      description: 'Cama queen size com cabeceira estofada.',
      price: 2499.99,
      image: require('../../assets/img/cama.jpg'),
      category: '2',
      featured: true,
      rating: 4.9,
      reviews: 132,
    },
    quantity: 1,
  },
];

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleIncreaseQuantity = (itemId: string) => {
    setCartItems(
      cartItems.map(item => 
        item.product.id === itemId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  const handleDecreaseQuantity = (itemId: string) => {
    setCartItems(
      cartItems.map(item => 
        item.product.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    Alert.alert(
      'Remover Item',
      'Tem certeza que deseja remover este item do carrinho?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: () => {
            setCartItems(cartItems.filter(item => item.product.id !== itemId));
          },
          style: 'destructive',
        },
      ],
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="cart-outline" size={80} color="#ccc" />
      <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
      <Text style={styles.emptySubtext}>
        Adicione itens ao seu carrinho para continuar
      </Text>
      <TouchableOpacity style={styles.shopButton} activeOpacity={0.8}>
        <Text style={styles.shopButtonText}>Explorar Produtos</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Meu Carrinho</Text>
        {cartItems.length > 0 && (
          <Text style={styles.itemCount}>{cartItems.length} items</Text>
        )}
      </View>
      
      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.product.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image 
                  source={item.product.image}
                  style={styles.productImage} 
                  resizeMode="cover"
                />
                
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.product.name}</Text>
                  <Text style={styles.productPrice}>
                    R$ {item.product.price.toFixed(2)}
                  </Text>
                  
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleDecreaseQuantity(item.product.id)}
                    >
                      <MaterialCommunityIcons name="minus" size={16} color="#333" />
                    </TouchableOpacity>
                    
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleIncreaseQuantity(item.product.id)}
                    >
                      <MaterialCommunityIcons name="plus" size={16} color="#333" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.product.id)}
                >
                  <MaterialCommunityIcons name="trash-can-outline" size={20} color="#777" />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>
                R$ {calculateTotal().toFixed(2)}
              </Text>
            </View>
            
            <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8}>
              <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCount: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  removeButton: {
    padding: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#777',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CartScreen;