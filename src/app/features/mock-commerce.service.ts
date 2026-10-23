import { Injectable } from '@angular/core';

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  stock: number;
  status: 'Available' | 'Low stock' | 'Unavailable';
}

export interface CartItem {
  product: MenuItem;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class MockCommerceService {
  readonly products: MenuItem[] = [
    { id: 1, name: 'Truffle Mushroom Burger', category: 'Burgers', description: 'Wagyu beef, wild mushrooms, truffle aioli and aged cheddar.', price: 14.5, rating: 4.8, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85', stock: 32, status: 'Available' },
    { id: 2, name: 'Rainbow Poke Bowl', category: 'Healthy', description: 'Fresh salmon, avocado, edamame and seasoned sushi rice.', price: 16.2, rating: 4.9, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85', stock: 18, status: 'Available' },
    { id: 3, name: 'Buffalo Mozzarella Pizza', category: 'Pizza', description: 'San Marzano tomatoes, buffalo mozzarella and garden basil.', price: 18, rating: 4.7, image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85', stock: 7, status: 'Low stock' },
    { id: 4, name: 'Spicy Penne Arrabbiata', category: 'Pasta', description: 'Penne tossed in a fiery tomato sauce with fresh herbs.', price: 14.5, rating: 4.6, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', stock: 24, status: 'Available' },
    { id: 5, name: 'Grilled Salmon Steak', category: 'Healthy', description: 'Atlantic salmon, lemon glaze and seasonal greens.', price: 22, rating: 4.9, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85', stock: 12, status: 'Available' },
    { id: 6, name: 'Classic Tiramisu', category: 'Desserts', description: 'Espresso-soaked sponge, mascarpone cream and cocoa.', price: 8.5, rating: 4.8, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85', stock: 4, status: 'Low stock' },
    { id: 7, name: 'Garden Fresh Pizza', category: 'Pizza', description: 'Artisanal dough with seasonal vegetables and basil.', price: 16, rating: 4.6, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85', stock: 16, status: 'Available' },
    { id: 8, name: 'Mango Smoothie', category: 'Drinks', description: 'Ripe mango blended with yogurt and a touch of honey.', price: 6.5, rating: 4.5, image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=900&q=85', stock: 0, status: 'Unavailable' },
  ];

  readonly orders: Array<{ id: string; customer: string; email: string; items: string; date: string; total: number; status: string }> = [
    { id: '#FD-2048', customer: 'Jordan Lee', email: 'jordan.lee@email.com', items: '2 items · Truffle Burger, Fries', date: 'Today, 12:48 PM', total: 32.5, status: 'Preparing' },
    { id: '#FD-2047', customer: 'Amelia Chen', email: 'amelia.chen@email.com', items: '1 item · Rainbow Poke Bowl', date: 'Today, 12:32 PM', total: 16.2, status: 'Pending' },
    { id: '#FD-2046', customer: 'Noah Williams', email: 'noah.w@email.com', items: '3 items · Pizza, Salad, Drinks', date: 'Today, 12:15 PM', total: 42, status: 'Ready' },
    { id: '#FD-2045', customer: 'Sofia Patel', email: 'sofia.p@email.com', items: '2 items · Salmon, Tiramisu', date: 'Today, 11:58 AM', total: 34.5, status: 'Completed' },
    { id: '#FD-2044', customer: 'Liam Garcia', email: 'liam.g@email.com', items: '1 item · Garden Pizza', date: 'Today, 11:41 AM', total: 16, status: 'Cancelled' },
    { id: '#FD-2043', customer: 'Olivia Brown', email: 'olivia.b@email.com', items: '2 items · Pasta, Smoothie', date: 'Today, 11:26 AM', total: 21, status: 'Completed' },
  ];

  cart: CartItem[] = [];

  addToCart(product: MenuItem): void {
    const item = this.cart.find((entry) => entry.product.id === product.id);
    if (item) item.quantity += 1;
    else this.cart.push({ product, quantity: 1 });
  }

  updateQuantity(productId: number, delta: number): void {
    const item = this.cart.find((entry) => entry.product.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) this.removeFromCart(productId);
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter((entry) => entry.product.id !== productId);
  }

  get itemCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  get subtotal(): number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
