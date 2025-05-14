export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: any; // Na implementação real, substituiríamos por URLs de imagens
    category: string;
    featured: boolean;
    rating: number;
    reviews: number;
  }
  
  export interface Category {
    id: string;
    name: string;
    icon: string;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }