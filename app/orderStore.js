import { create } from "zustand";

const useOrderStore = create((set) => ({
  // 当前正在结算的订单（Checkout 用）
  order: null,
  orders: [],

  setOrder: (order) => set({ order }),  // 清空当前订单
  clearOrder: () => set({ order: null }),

  // 添加到历史订单
  addOrder: (order) =>
    set((state) => ({ orders: [...state.orders, order] })),

  // 清空所有历史订单
  clearOrders: () => set({ orders: [] }),
}));

export default useOrderStore;
