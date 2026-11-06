import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useToast } from './ToastContext';

const WISHLIST_STORAGE_KEY = 'atelier_wishlist_v1';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();
  const [wishlist, setWishlist] = useState(() => getStorageItem(WISHLIST_STORAGE_KEY, []));

  useEffect(() => {
    setStorageItem(WISHLIST_STORAGE_KEY, wishlist);
  }, [wishlist]);

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        addToast(`Removed ${product.name} from wishlist.`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        addToast(`Saved ${product.name} to wishlist.`);
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => {
      const item = prev.find((p) => p.id === productId);
      if (item) {
        addToast(`Removed ${item.name} from wishlist.`, 'info');
      }
      return prev.filter((p) => p.id !== productId);
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
