import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const addToCart = (item) => {
    setCartItems(prevCart => {
      console.log('item :>> ', item);
      console.log('prevCart :>> ', prevCart);
      const index = prevCart.findIndex(cartItem => cartItem._id === item._id);

      if (index > -1) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[index];
        updatedCart[index] = {
          ...existingItem,
          quantity: (existingItem.quantity || 1) + 1,
        };
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
