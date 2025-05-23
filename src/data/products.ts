export interface ProductSeed {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imgUrl?: string; 
}

export const products: ProductSeed[] = [
  {
    name: "Iphone 15",
    description: "The best smartphone in the world",
    price: 199.99,
    stock: 12,
    category: "smartphone",
    imgUrl: "https://via.placeholder.com/150?text=Iphone+15"
  },
  {
    name: "Samsung Galaxy S23",
    description: "The best smartphone in the world",
    price: 150.0,
    stock: 12,
    category: "smartphone",
    imgUrl: "https://via.placeholder.com/150?text=Galaxy+S23"
  },
  {
    name: "Motorola Edge 40",
    description: "The best smartphone in the world",
    price: 179.89,
    stock: 12,
    category: "smartphone",
    imgUrl: "https://via.placeholder.com/150?text=Edge+40"
  },
  {
    name: "Samsung Odyssey G9",
    description: "The best monitor in the world",
    price: 299.99,
    stock: 12,
    category: "monitor",
    imgUrl: "https://via.placeholder.com/150?text=Odyssey+G9"
  },
  {
    name: "LG UltraGear",
    description: "The best monitor in the world",
    price: 199.99,
    stock: 12,
    category: "monitor",
    imgUrl: "https://via.placeholder.com/150?text=UltraGear"
  },
  {
    name: "Acer Predator",
    description: "The best monitor in the world",
    price: 150.0,
    stock: 12,
    category: "monitor",
    imgUrl: "https://via.placeholder.com/150?text=Predator"
  },
  {
    name: "Razer BlackWidow V3",
    description: "The best keyboard in the world",
    price: 99.99,
    stock: 12,
    category: "keyboard",
    imgUrl: "https://via.placeholder.com/150?text=BlackWidow+V3"
  },
  {
    name: "Corsair K70",
    description: "The best keyboard in the world",
    price: 79.99,
    stock: 12,
    category: "keyboard",
    imgUrl: "https://via.placeholder.com/150?text=Corsair+K70"
  },
  {
    name: "Logitech G Pro",
    description: "The best keyboard in the world",
    price: 59.99,
    stock: 12,
    category: "keyboard",
    imgUrl: "https://via.placeholder.com/150?text=Logitech+G+Pro"
  },
  {
    name: "Razer Viper",
    description: "The best mouse in the world",
    price: 49.99,
    stock: 12,
    category: "mouse",
    imgUrl: "https://via.placeholder.com/150?text=Razer+Viper"
  },
  {
    name: "Logitech G502 Pro",
    description: "The best mouse in the world",
    price: 39.99,
    stock: 12,
    category: "mouse",
    imgUrl: "https://via.placeholder.com/150?text=G502+Pro"
  },
  {
    name: "SteelSeries Rival 3",
    description: "The best mouse in the world",
    price: 29.99,
    stock: 12,
    category: "mouse",
    imgUrl: "https://via.placeholder.com/150?text=Rival+3"
  },
  {
    name: 'Galaxy Tab S9',
    description: 'La mejor tablet del mercado',
    price: 649.99,
    stock: 20,
    category: 'tablet',
    imgUrl: 'https://via.placeholder.com/150?text=Tab+S9',
  },
];
