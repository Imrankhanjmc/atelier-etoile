import { getStorageItem, setStorageItem } from '../utils/storage';

const ORDERS_KEY = 'atelier_orders_v1';

export const orderService = {
  // Simulate order creation
  createOrder: async (orderPayload) => {
    await new Promise((r) => setTimeout(r, 600));

    const orderId = `AE-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      deliveryEstimate: 'Delivered in 2-4 Business Days',
      ...orderPayload
    };

    const existingOrders = getStorageItem(ORDERS_KEY, []);
    setStorageItem(ORDERS_KEY, [newOrder, ...existingOrders]);

    return newOrder;
  },

  getOrderById: async (orderId) => {
    const orders = getStorageItem(ORDERS_KEY, []);
    return orders.find(o => o.orderId === orderId) || null;
  },

  getOrderHistory: async () => {
    return getStorageItem(ORDERS_KEY, []);
  }
};
