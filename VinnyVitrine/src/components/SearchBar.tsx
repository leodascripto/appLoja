import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSearch = () => {
    if (searchText.trim().length > 0) {
      navigation.navigate('SearchResults', { query: searchText });
      setSearchText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar móveis..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
            <MaterialCommunityIcons name="close" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    height: '100%',
  },
  clearButton: {
    padding: 4,
  }
});

export default SearchBar;
