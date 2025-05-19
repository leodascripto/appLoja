import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  Text,
  FlatList,
  SafeAreaView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { categories } from '../utils/mockData';

interface FilterOptions {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: 'price_asc' | 'price_desc' | 'rating' | null;
}

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: null,
    minPrice: null,
    maxPrice: null,
    sortBy: null
  });
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSearch = () => {
    if (searchText.trim().length > 0) {
      navigation.navigate('SearchResults', { 
        query: searchText,
        filterOptions: filterOptions
      });
      setSearchText('');
    }
  };

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  const handleApplyFilter = () => {
    setShowFilterModal(false);
    // Se o usuário tiver uma busca ativa, refaz a busca com os novos filtros
    if (searchText.trim().length > 0) {
      handleSearch();
    }
  };

  const handleClearFilters = () => {
    setFilterOptions({
      category: null,
      minPrice: null,
      maxPrice: null,
      sortBy: null
    });
  };

  const handleSelectCategory = (categoryId: string) => {
    setFilterOptions(prev => ({
      ...prev,
      category: prev.category === categoryId ? null : categoryId
    }));
  };

  const handleSelectSortOption = (sortOption: 'price_asc' | 'price_desc' | 'rating') => {
    setFilterOptions(prev => ({
      ...prev,
      sortBy: prev.sortBy === sortOption ? null : sortOption
    }));
  };

  // Função para verificar se algum filtro está ativo
  const hasActiveFilters = () => {
    return (
      filterOptions.category !== null || 
      filterOptions.minPrice !== null || 
      filterOptions.maxPrice !== null || 
      filterOptions.sortBy !== null
    );
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
        <TouchableOpacity onPress={handleFilterPress} style={styles.filterButton}>
          <MaterialCommunityIcons 
            name="filter-variant" 
            size={20} 
            color={hasActiveFilters() ? "#333" : "#999"} 
          />
        </TouchableOpacity>
      </View>

      {/* Modal de Filtro */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtros</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Categorias</Text>
              <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={[
                      styles.categoryItem,
                      filterOptions.category === item.id && styles.categoryItemActive
                    ]}
                    onPress={() => handleSelectCategory(item.id)}
                  >
                    <MaterialCommunityIcons 
                      name={item.icon as any} 
                      size={20} 
                      color={filterOptions.category === item.id ? "#fff" : "#333"} 
                    />
                    <Text 
                      style={[
                        styles.categoryItemText,
                        filterOptions.category === item.id && styles.categoryItemTextActive
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.categoryList}
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Ordenar por</Text>
              <View style={styles.sortOptions}>
                <TouchableOpacity 
                  style={[
                    styles.sortOptionItem,
                    filterOptions.sortBy === 'price_asc' && styles.sortOptionItemActive
                  ]}
                  onPress={() => handleSelectSortOption('price_asc')}
                >
                  <Text 
                    style={[
                      styles.sortOptionText,
                      filterOptions.sortBy === 'price_asc' && styles.sortOptionTextActive
                    ]}
                  >
                    Menor preço
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[
                    styles.sortOptionItem,
                    filterOptions.sortBy === 'price_desc' && styles.sortOptionItemActive
                  ]}
                  onPress={() => handleSelectSortOption('price_desc')}
                >
                  <Text 
                    style={[
                      styles.sortOptionText,
                      filterOptions.sortBy === 'price_desc' && styles.sortOptionTextActive
                    ]}
                  >
                    Maior preço
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[
                    styles.sortOptionItem,
                    filterOptions.sortBy === 'rating' && styles.sortOptionItemActive
                  ]}
                  onPress={() => handleSelectSortOption('rating')}
                >
                  <Text 
                    style={[
                      styles.sortOptionText,
                      filterOptions.sortBy === 'rating' && styles.sortOptionTextActive
                    ]}
                  >
                    Melhor avaliação
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.filterActions}>
              <TouchableOpacity 
                style={styles.clearFiltersButton}
                onPress={handleClearFilters}
              >
                <Text style={styles.clearFiltersText}>Limpar filtros</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.applyFiltersButton}
                onPress={handleApplyFilter}
              >
                <Text style={styles.applyFiltersText}>Aplicar filtros</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
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
  },
  filterButton: {
    padding: 8,
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  categoryList: {
    paddingVertical: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryItemActive: {
    backgroundColor: '#333',
  },
  categoryItemText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
  },
  categoryItemTextActive: {
    color: '#fff',
  },
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sortOptionItem: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  sortOptionItemActive: {
    backgroundColor: '#333',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#333',
  },
  sortOptionTextActive: {
    color: '#fff',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearFiltersButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '48%',
    alignItems: 'center',
  },
  clearFiltersText: {
    color: '#777',
    fontSize: 14,
    fontWeight: '500',
  },
  applyFiltersButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  applyFiltersText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SearchBar;