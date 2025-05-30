import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../utils/mockData';
import { Product } from '../types';

type SearchResultsRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // Ajuste para o espaçamento adequado

const SearchResultsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<SearchResultsRouteProp>();
  const { query, filterOptions, categoryName } = route.params;
  
  const [searchText, setSearchText] = useState(query || '');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para aplicar os filtros nos produtos
  const applyFilters = (products: Product[], options: any) => {
    if (!options) return products;
    
    let filteredProducts = [...products];
    
    // Filtrar por categoria
    if (options.category) {
      // Se a categoria for "featured", filtramos por produtos em destaque
      if (options.category === "featured") {
        filteredProducts = filteredProducts.filter(product => product.featured);
      } else {
        filteredProducts = filteredProducts.filter(product => 
          product.category === options.category
        );
      }
    }
    
    // Filtrar por preço mínimo
    if (options.minPrice !== null) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= options.minPrice
      );
    }
    
    // Filtrar por preço máximo
    if (options.maxPrice !== null) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= options.maxPrice
      );
    }
    
    // Ordenação
    if (options.sortBy) {
      switch (options.sortBy) {
        case 'price_asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
      }
    }
    
    return filteredProducts;
  };

  useEffect(() => {
    // Simular uma busca com filtros
    setLoading(true);
    setTimeout(() => {
      let filteredProducts = [...products];
      
      // Se temos um termo de busca, filtrar por ele
      if (query && query.trim().length > 0) {
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) || 
          product.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Depois aplica os filtros adicionais
      if (filterOptions) {
        filteredProducts = applyFilters(filteredProducts, filterOptions);
      }
      
      setResults(filteredProducts);
      setLoading(false);
    }, 500);
  }, [query, filterOptions]);

  const handleSearch = () => {
    if (searchText.trim().length > 0) {
      // Navegar para a mesma tela com a nova consulta, mantendo os filtros
      navigation.setParams({ 
        query: searchText.trim(),
        filterOptions,
        categoryName
      } as never);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddToCart = (product: Product) => {
    Alert.alert('Produto adicionado ao carrinho!');
  };

  // Formatar os filtros aplicados para mostrar ao usuário
  const getAppliedFiltersText = () => {
    if (!filterOptions) return '';
    
    const filters = [];
    
    if (filterOptions.category) {
      if (filterOptions.category === "featured") {
        filters.push("Destaques");
      } else {
        const category = categories.find(c => c.id === filterOptions.category);
        if (category) filters.push(category.name);
      }
    }
    
    if (filterOptions.sortBy) {
      switch (filterOptions.sortBy) {
        case 'price_asc':
          filters.push('Menor preço');
          break;
        case 'price_desc':
          filters.push('Maior preço');
          break;
        case 'rating':
          filters.push('Melhor avaliação');
          break;
      }
    }
    
    return filters.length > 0 ? `Filtros: ${filters.join(', ')}` : '';
  };

  // Determinar o título da página com base nos parâmetros
  const getPageTitle = () => {
    if (categoryName) {
      return categoryName;
    }
    return "Resultados da Busca";
  };

  const renderEmptyResults = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="magnify" size={60} color="#ccc" />
      <Text style={styles.emptyText}>Nenhum resultado encontrado</Text>
      <Text style={styles.emptySubtext}>
        Tente refinar sua busca ou explorar outras categorias
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar móveis..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoFocus={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
              <MaterialCommunityIcons name="close" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <View style={styles.resultsContainer}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#333" />
            <Text style={styles.loadingText}>Buscando...</Text>
          </View>
        ) : (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.pageTitle}>{getPageTitle()}</Text>
              
              {query && query.trim().length > 0 && (
                <Text style={styles.resultsText}>
                  {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para "{query}"
                </Text>
              )}
              
              {getAppliedFiltersText() !== '' && (
                <Text style={styles.filtersText}>
                  {getAppliedFiltersText()}
                </Text>
              )}
            </View>
            
            {results.length > 0 ? (
              <FlatList
                data={results}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View style={styles.productCardWrapper}>
                    <ProductCard 
                      product={item} 
                      onAddToCart={handleAddToCart}
                    />
                  </View>
                )}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              renderEmptyResults()
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  resultsHeader: {
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: '#777',
  },
  filtersText: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
    fontWeight: '500',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 16, // Adicionar espaçamento entre os itens
  },
  listContent: {
    paddingBottom: 24,
  },
  productCardWrapper: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#777',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
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
  },
});

export default SearchResultsScreen;