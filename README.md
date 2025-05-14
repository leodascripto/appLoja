# VinnyVitrine - Loja Virtual de Móveis

Um aplicativo elegante e minimalista para uma loja virtual de móveis, desenvolvido com React Native e Expo.

## Recursos

- Design elegante e minimalista
- Navegação fluida entre telas
- Carrossel de produtos em destaque
- Lista de produtos com opção de adicionar ao carrinho
- Detalhes do produto com seleção de quantidade
- Carrinho de compras
- Perfil de usuário
- Pesquisa de produtos

## Tecnologias Utilizadas

- React Native 0.79.2
- Expo SDK 53
- React Navigation 7.0
- Typescript
- Expo Vector Icons

## Estrutura de Pastas

```
VinnyVitrine/
├── assets/
│   ├── images/
│       ├── logo.png
│       ├── avatar.png
│       └── products/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Carousel.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductList.tsx
│   │   └── CartButton.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── CategoriesScreen.tsx
│   │   ├── CartScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── ProductDetailScreen.tsx
│   │   └── SearchResultsScreen.tsx
│   ├── navigation/
│   │   └── index.tsx
│   ├── utils/
│   │   └── mockData.ts
│   └── types/
│       └── index.ts
├── App.tsx
├── index.ts
└── package.json
```

## Como executar o projeto

1. Certifique-se de ter o Node.js instalado (versão 20 ou superior recomendada)
2. Clone este repositório
3. Instale as dependências:
   ```
   npm install
   ```
4. Execute o projeto:
   ```
   npm start
   ```
5. Utilize o aplicativo Expo Go no seu dispositivo para testar o aplicativo ou use um emulador

## Observações

Este projeto foi criado com base na arquitetura do Mercado Livre, mas com um design mais elegante e minimalista para uma loja de móveis.

As imagens dos produtos podem ser substituídas por imagens geradas por IA, conforme mencionado na proposta do projeto.

## Próximos passos

- Implementar autenticação de usuários
- Adicionar sistema de pagamento
- Implementar filtros na pesquisa
- Adicionar mais detalhes aos produtos
- Implementar sistema de avaliações