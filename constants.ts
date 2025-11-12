
import { Product, Order, ShopBannerData } from './types';
import { ShoppingBasket, Milk, Carrot, SprayCan, Cookie } from 'lucide-react';

export const CATEGORIES = [
  { id: 'fresh-produce', name: 'Fresh Produce', icon: Carrot },
  { id: 'dairy', name: 'Dairy', icon: Milk },
  { id: 'groceries', name: 'Groceries', icon: ShoppingBasket },
  { id: 'snacks', name: 'Snacks', icon: Cookie },
  { id: 'household', name: 'Household', icon: SprayCan },
];

export const PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: 'Organic Hass Avocados', 
    price: 2.15, 
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=400', 
    category: 'fresh-produce',
    description: 'Creamy and nutritious Hass avocados, ready to be smashed on toast or whipped into guacamole. Grown in California.',
    details: [ { title: 'Origin', value: 'USA' }, { title: 'Pack', value: 'Single' } ]
  },
  { 
    id: 2, 
    name: 'Organic Whole Milk', 
    price: 4.29, 
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b2ae389?q=80&w=400', 
    category: 'dairy',
    description: 'Fresh Grade A organic whole milk, pasteurized and non-homogenized. Rich in calcium and Vitamin D from grass-fed cows.',
    details: [ { title: 'Volume', value: '1/2 Gallon' }, { title: 'Brand', value: 'Happy Cow' } ]
  },
  { 
    id: 3, 
    name: 'Artisan Sourdough Bread', 
    price: 5.49, 
    imageUrl: 'https://images.unsplash.com/photo-1533782651166-3c583599e198?q=80&w=400', 
    category: 'groceries', 
    description: 'A rustic loaf of naturally leavened sourdough bread with a chewy crust and soft interior. Baked fresh daily.',
    details: [ { title: 'Weight', value: '24 oz' }, { title: 'Ingredients', value: 'Flour, Water, Salt' } ]
  },
  { 
    id: 4, 
    name: 'Sweet Strawberries', 
    price: 4.99, 
    imageUrl: 'https://images.unsplash.com/photo-1578996953842-017a493ab411?q=80&w=400', 
    category: 'fresh-produce',
    description: 'Juicy and sweet strawberries, picked at the peak of freshness. Perfect for desserts, salads, or eating on their own.',
    details: [ { title: 'Origin', value: 'California' }, { title: 'Weight', value: '1 lb clamshell' } ]
  },
  { 
    id: 5, 
    name: 'Aged Cheddar Cheese', 
    price: 6.99, 
    imageUrl: 'https://images.unsplash.com/photo-1618164436241-447520f86bb1?q=80&w=400', 
    category: 'dairy', 
    description: 'A block of sharp white cheddar cheese, aged for 12 months for a rich and tangy flavor. Perfect for a cheese board.'
  },
  { 
    id: 6, 
    name: 'Kettle-Cooked Potato Chips', 
    price: 3.75, 
    imageUrl: 'https://images.unsplash.com/photo-1613919113643-2515a2b3c2a9?q=80&w=400', 
    category: 'snacks', 
    description: 'Classic sea salt kettle-cooked potato chips. Extra crispy, crunchy, and satisfyingly salty.'
  },
  { 
    id: 7, 
    name: 'Eco-Friendly Paper Towels', 
    price: 9.99, 
    imageUrl: 'https://images.unsplash.com/photo-1589922572973-1dd1413a9681?q=80&w=400', 
    category: 'household', 
    description: 'Absorbent and durable paper towels made from 100% recycled materials. 6-pack of double rolls.'
  },
  { 
    id: 8, 
    name: 'Organic Blueberries', 
    price: 5.50, 
    imageUrl: 'https://images.unsplash.com/photo-1595232781839-a429d2759e54?q=80&w=400', 
    category: 'fresh-produce',
    description: 'Plump and sweet organic blueberries, bursting with antioxidants. Great for pancakes, yogurt, or snacking.',
    details: [ { title: 'Origin', value: 'Oregon' }, { title: 'Weight', value: '6 oz' } ]
  },
  { 
    id: 9, 
    name: 'Greek Yogurt, Plain', 
    price: 2.29, 
    imageUrl: 'https://images.unsplash.com/photo-1562119423-f72c72256620?q=80&w=400', 
    category: 'dairy', 
    description: 'Thick and creamy plain Greek yogurt with 18g of protein per serving. Perfect for breakfast or as a sour cream substitute.'
  },
  { 
    id: 10, 
    name: 'Pasture-Raised Organic Eggs', 
    price: 6.49, 
    imageUrl: 'https://images.unsplash.com/photo-1516423951203-a9a3b84f3f9b?q=80&w=400', 
    category: 'groceries', 
    description: 'One dozen large, brown organic eggs from pasture-raised chickens with vibrant orange yolks.'
  },
  { 
    id: 11, 
    name: 'Dark Chocolate Sea Salt Bar', 
    price: 3.19, 
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e340a6479905?q=80&w=400', 
    category: 'snacks', 
    description: 'Rich and smooth 72% cacao dark chocolate bar with a sprinkle of flaky sea salt.'
  },
  { 
    id: 12, 
    name: 'Plant-Based Dish Soap', 
    price: 4.49, 
    imageUrl: 'https://images.unsplash.com/photo-1627992928243-9bab3d3c1143?q=80&w=400', 
    category: 'household', 
    description: 'Tough on grease, gentle on hands. Biodegradable, plant-based dish soap with a lavender scent.'
  },
  { 
    id: 13, 
    name: 'Honeycrisp Apples', 
    price: 3.49, 
    imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=400', 
    category: 'fresh-produce', 
    description: 'Explosively crisp and sweet Honeycrisp apples. Perfect for snacking or baking. Sold per pound.',
    details: [ { title: 'Weight', value: 'Approx 1 lb' }]
  },
  { 
    id: 14, 
    name: 'Oat Milk Barista Blend', 
    price: 4.79, 
    imageUrl: 'https://images.unsplash.com/photo-1632863966687-9d62b6623f95?q=80&w=400', 
    category: 'dairy', 
    description: 'Creamy oat milk designed to froth and steam perfectly for lattes. A delicious dairy-free alternative.'
  },
  { 
    id: 15,
    name: 'Organic Baby Spinach',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1618664251493-0145a31a4730?q=80&w=400',
    category: 'fresh-produce',
    description: 'Tender and mild baby spinach, triple-washed and ready to eat. Perfect for salads and smoothies.'
  },
  {
    id: 16,
    name: 'Organic Cherry Tomatoes',
    price: 4.29,
    imageUrl: 'https://images.unsplash.com/photo-1461352194380-571f46d37a85?q=80&w=400',
    category: 'fresh-produce',
    description: 'Sweet and juicy organic cherry tomatoes on the vine. Ideal for snacking, salads, or roasting.'
  },
  {
    id: 17,
    name: 'Natural Almond Butter',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1516258242-756184131b43?q=80&w=400',
    category: 'groceries',
    description: 'Creamy almond butter made from roasted almonds and nothing else. No added sugar or salt.'
  },
  {
    id: 18,
    name: 'Fig & Thyme Crisps',
    price: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-1541783245-09a4734140d3?q=80&w=400',
    category: 'snacks',
    description: 'Artisan crackers baked with figs and thyme. The perfect companion for cheese and spreads.'
  },
  {
    id: 19,
    name: 'Kombucha Ginger Lemon',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1556881261-e127339235e0?q=80&w=400',
    category: 'groceries',
    description: 'Sparkling probiotic tea with a zesty kick of ginger and lemon. Raw and organic.'
  },
  {
    id: 20,
    name: 'All-Purpose Cleaning Spray',
    price: 5.29,
    imageUrl: 'https://images.unsplash.com/photo-1583947215250-2f63a107e48f?q=80&w=400',
    category: 'household',
    description: 'Plant-derived cleaning spray for all hard surfaces. Cuts through grease and grime. Lemon & mint scent.'
  }
];

export const ORDERS: Order[] = [
    {
        id: 'FC8325',
        date: '2024-07-20',
        status: 'Delivered',
        items: [
            { productId: 2, quantity: 1, price: 4.29 },
            { productId: 3, quantity: 1, price: 5.49 },
            { productId: 10, quantity: 1, price: 6.49 },
        ],
        total: 16.27
    },
    {
        id: 'FC7991',
        date: '2024-07-15',
        status: 'Delivered',
        items: [
            { productId: 1, quantity: 3, price: 2.15 },
            { productId: 15, quantity: 1, price: 3.99 },
            { productId: 16, quantity: 1, price: 4.29 },
            { productId: 6, quantity: 2, price: 3.75 },
        ],
        total: 22.23
    },
    {
        id: 'FC7854',
        date: '2024-07-11',
        status: 'Cancelled',
        items: [
            { productId: 7, quantity: 1, price: 9.99 },
        ],
        total: 9.99
    },
     {
        id: 'FC7802',
        date: '2024-07-08',
        status: 'Delivered',
        items: [
            { productId: 18, quantity: 1, price: 4.99 },
            { productId: 5, quantity: 1, price: 6.99 },
            { productId: 13, quantity: 2, price: 3.49 },
        ],
        total: 18.96
    }
];

export const SHOP_BANNERS: ShopBannerData[] = []