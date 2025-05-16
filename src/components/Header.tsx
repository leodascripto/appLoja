import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation';
import SearchBar from './SearchBar';

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {/* Temporariamente usando um Text em vez de uma imagem para o logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>VinnyVitrine</Text>
        </View>
        <TouchableOpacity onPress={handleCartPress} style={styles.cartButton}>
          <MaterialCommunityIcons name="cart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoContainer: {
    height: 40,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logo: {
    height: 40,
    width: 180,
  },
  cartButton: {
    padding: 8,
  }
});

export default Header;
