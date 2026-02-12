import type { CartProduct } from "./cart.types";

export interface OrderItem {
  count: number;
  price: number;
  product: CartProduct;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface Order {
  _id: string;
  user: string;
  cartItems: OrderItem[];
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}
