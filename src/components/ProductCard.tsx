import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Product } from '../types';
import { RootStackParamList } from '../navigation';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={product.image}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.favoriteButton}>
          <MaterialCommunityIcons name="heart-outline" size={20} color="#777" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>

        <View style={styles.ratingContainer}>
          <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
          <Text style={styles.rating}>{product.rating} ({product.reviews})</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <MaterialCommunityIcons name="plus" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Estilos permanecem iguais...
const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 120, // Reduzido de 150 para 120
    aspectRatio: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: '#777',
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  addToCartButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard;