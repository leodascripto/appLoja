import { Product, Category } from '../types';

// Categorias de móveis
export const categories: Category[] = [
  {
    id: '1',
    name: 'Sala de Estar',
    icon: 'sofa',
  },
  {
    id: '2',
    name: 'Quarto',
    icon: 'bed',
  },
  {
    id: '3',
    name: 'Cozinha',
    icon: 'silverware-fork-knife',
  },
  {
    id: '4',
    name: 'Escritório',
    icon: 'desk-lamp',
  },
  {
    id: '5',
    name: 'Decoração',
    icon: 'flower',
  },
];

// Produtos de exemplo - usando imagens locais
export const products: Product[] = [
  {
    id: '1',
    name: 'Sofá Modular Elegance',
    description: 'Sofá modular de 3 lugares com tecido premium e estrutura de madeira maciça. Design moderno que se adapta a qualquer ambiente.',
    price: 2999.99,
    image: require('../../assets/img/sofa.jpg'),
    category: '1',
    featured: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Poltrona Leitura Comfort',
    description: 'Poltrona ergonômica ideal para leitura, com apoio para braços e tecido de alta qualidade.',
    price: 1299.99,
    image: require('../../assets/img/poltrona.jpg'),
    category: '1',
    featured: true,
    rating: 4.7,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Mesa de Centro Milano',
    description: 'Mesa de centro com design italiano, tampo de vidro temperado e estrutura em aço inoxidável.',
    price: 899.99,
    image: require('../../assets/img/mesacentro.jpg'),
    category: '1',
    featured: false,
    rating: 4.5,
    reviews: 67,
  },
  {
    id: '4',
    name: 'Cama Queen Oslo',
    description: 'Cama queen size com cabeceira estofada e estrutura em madeira de reflorestamento.',
    price: 2499.99,
    image: require('../../assets/img/cama.jpg'),
    category: '2',
    featured: true,
    rating: 4.9,
    reviews: 132,
  },
  {
    id: '5',
    name: 'Guarda-roupa Nice',
    description: 'Guarda-roupa com 6 portas, 4 gavetas e espelho. Acabamento em laca e puxadores em alumínio.',
    price: 3299.99,
    image: require('../../assets/img/guardaroupa.jpg'),
    category: '2',
    featured: false,
    rating: 4.6,
    reviews: 95,
  },
  {
    id: '6',
    name: 'Mesa de Jantar Torino',
    description: 'Mesa de jantar extensível para até 8 pessoas, com tampo de madeira maciça e base metálica.',
    price: 1799.99,
    image: require('../../assets/img/mesajantar.jpg'),
    category: '3',
    featured: true,
    rating: 4.7,
    reviews: 78,
  },
  {
    id: '7',
    name: 'Cadeira Eames',
    description: 'Cadeira com design inspirado no clássico Eames, assento ergonômico e pés em madeira maciça.',
    price: 349.99,
    image: require('../../assets/img/poltrona.jpg'), // Usando poltrona como fallback para cadeira
    category: '3',
    featured: false,
    rating: 4.4,
    reviews: 112,
  },
  {
    id: '8',
    name: 'Escrivaninha Home Office',
    description: 'Escrivaninha compacta, ideal para home office, com gavetas e compartimentos organizadores.',
    price: 799.99,
    image: require('../../assets/img/mesacentro.jpg'), // Usando mesa de centro como fallback
    category: '4',
    featured: true,
    rating: 4.8,
    reviews: 65,
  },
  {
    id: '9',
    name: 'Estante Modular Barcelona',
    description: 'Estante modular com 5 prateleiras, ideal para livros e objetos decorativos.',
    price: 1199.99,
    image: require('../../assets/img/guardaroupa.jpg'), // Usando guarda-roupa como fallback
    category: '4',
    featured: false,
    rating: 4.6,
    reviews: 83,
  },
  {
    id: '10',
    name: 'Luminária de Chão Paris',
    description: 'Luminária de chão com haste ajustável e luz direcionável, ideal para leitura.',
    price: 499.99,
    image: require('../../assets/img/poltrona.jpg'), // Usando poltrona como fallback
    category: '5',
    featured: true,
    rating: 4.5,
    reviews: 54,
  },
];

// Produtos em destaque
export const featuredProducts = products.filter(product => product.featured);