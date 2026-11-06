import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { calculateCouponDiscount } from '../data/coupons';
import { useToast } from './ToastContext';

const CART_STORAGE_KEY = 'atelier_cart_v1';
const APPLIED_COUPON_KEY = 'atelier_applied_coupon_v1';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();
  const [cartItems, setCartItems] = useState(() => getStorageItem(CART_STORAGE_KEY, []));
  const [appliedCouponCode, setAppliedCouponCode] = useState(() => getStorageItem(APPLIED_COUPON_KEY, ''));
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    setStorageItem(CART_STORAGE_KEY, cartItems);
  }, [cartItems]);

  useEffect(() => {
    setStorageItem(APPLIED_COUPON_KEY, appliedCouponCode);
  }, [appliedCouponCode]);

  // Derived financials
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalItemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Coupon evaluation
  const couponResult = useMemo(() => {
    if (!appliedCouponCode) return { valid: false, discount: 0, message: '' };
    return calculateCouponDiscount(appliedCouponCode, subtotal);
  }, [appliedCouponCode, subtotal]);

  // Shipping logic: Free shipping over ₹2,499 or if coupon grants free shipping; otherwise ₹199
  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    if (subtotal >= 2499 || couponResult.freeShipping) return 0;
    return 199;
  }, [subtotal, couponResult]);

  const discountAmount = couponResult.discount || 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  // Actions
  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    if (!selectedSize) {
      addToast('Please select a size to proceed', 'error');
      return false;
    }
    if (!selectedColor) {
      addToast('Please select a color to proceed', 'error');
      return false;
    }

    // Check specific variant stock if available
    const matchedVariant = product.variants?.find(
      (v) => v.size === selectedSize && v.color === (selectedColor.name || selectedColor)
    );
    const maxStock = matchedVariant ? matchedVariant.stock : (product.availableStock || 10);

    const colorName = typeof selectedColor === 'object' ? selectedColor.name : selectedColor;
    const colorHex = typeof selectedColor === 'object' ? selectedColor.hex : '#18181B';
    const itemKey = `${product.id}-${selectedSize}-${colorName}`;

    let updated = false;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.itemKey === itemKey);

      if (existingIndex > -1) {
        const existingItem = prevItems[existingIndex];
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > maxStock) {
          addToast(`Maximum available stock of ${maxStock} units reached.`, 'error');
          return prevItems;
        }

        updated = true;
        const copy = [...prevItems];
        copy[existingIndex] = {
          ...existingItem,
          quantity: newQuantity,
        };
        return copy;
      } else {
        if (quantity > maxStock) {
          addToast(`Only ${maxStock} units in stock for this variant.`, 'error');
          return prevItems;
        }

        updated = true;
        const newItem = {
          itemKey,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          brand: product.brand,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images[0],
          size: selectedSize,
          color: colorName,
          colorHex: colorHex,
          quantity,
          maxStock,
          sku: matchedVariant?.sku || product.sku
        };
        return [...prevItems, newItem];
      }
    });

    if (updated) {
      addToast(`Added ${product.name} to shopping bag.`);
      setIsCartDrawerOpen(true);
      return true;
    }
    return false;
  };

  const updateQuantity = (itemKey, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemKey);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.itemKey === itemKey) {
          if (newQuantity > item.maxStock) {
            addToast(`Only ${item.maxStock} items available in stock.`, 'error');
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemKey) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.itemKey === itemKey);
      if (item) {
        addToast(`Removed ${item.name} from bag.`, 'info');
      }
      return prev.filter((i) => i.itemKey !== itemKey);
    });
  };

  const applyCoupon = (code) => {
    const result = calculateCouponDiscount(code, subtotal);
    if (result.valid) {
      setAppliedCouponCode(code.trim().toUpperCase());
      addToast(result.message, 'success');
      return { success: true, message: result.message };
    } else {
      addToast(result.message, 'error');
      return { success: false, message: result.message };
    }
  };

  const removeCoupon = () => {
    setAppliedCouponCode('');
    addToast('Coupon removed.', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCouponCode('');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        subtotal,
        shippingFee,
        discountAmount,
        grandTotal,
        appliedCouponCode,
        couponResult,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        applyCoupon,
        removeCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
