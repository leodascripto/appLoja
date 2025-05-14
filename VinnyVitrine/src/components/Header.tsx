import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from './SearchBar';

const Header = () => {
  const navigation = useNavigation();

  const handleCartPress = () => {
    navigation.navigate('Cart' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
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
  logo: {
    height: 40,
    width: 180,
  },
  cartButton: {
    padding: 8,
  }
});

export default Header;