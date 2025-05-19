import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  Image, 
  TouchableOpacity
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Product } from '../types';
import { RootStackParamList } from '../navigation';

interface CarouselProps {
  title: string;
  data: Product[];
  categoryId?: string;
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.7; // Reduzido para 70% da largura da tela
const ITEM_SPACING = 16;

const Carousel = ({ title, data, categoryId }: CarouselProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const flatListRef = React.useRef<FlatList>(null);

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleSeeAllPress = () => {
    // Se tiver um categoryId, navega para visualizar todos os produtos dessa categoria
    if (categoryId) {
      navigation.navigate('SearchResults', {
        query: '',
        filterOptions: {
          category: categoryId,
          minPrice: null,
          maxPrice: null,
          sortBy: null
        },
        categoryName: title
      });
    } else {
      // Senão, simplesmente mostra todos os produtos destacados
      navigation.navigate('SearchResults', {
        query: '',
        filterOptions: {
          category: null,
          minPrice: null,
          maxPrice: null,
          sortBy: null
        },
        categoryName: title
      });
    }
  };

  const renderDot = (index: number) => {
    const isActive = index === activeIndex;
    
    return (
      <View
        key={index}
        style={[
          styles.dot,
          isActive ? styles.activeDot : styles.inactiveDot
        ]}
      />
    );
  };

  const onScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (ITEM_WIDTH + ITEM_SPACING));
    setActiveIndex(index);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={item.image} 
          style={styles.image} 
          resizeMode="contain" // Mudando para "contain" para manter a proporção
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text style={styles.seeAll}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
      
      <View style={styles.paginationContainer}>
        {data.map((_, index) => renderDot(index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#555',
  },
  listContent: {
    paddingHorizontal: 8,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    marginHorizontal: ITEM_SPACING / 2,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 160, // Reduzido ligeiramente
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9', // Fundo claro para imagens transparentes
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#333',
    width: 24,
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
});

export default Carousel;