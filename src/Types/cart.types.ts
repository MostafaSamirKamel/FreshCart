export interface CartProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  category?: { name: string };
  ratingsAverage?: number;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  cartId: string | null;
  loading: boolean;
  error: string | null;
}

export interface CartApiResponse {
  status: string;
  numOfCartItems: number;
  data: {
    _id: string;
    products: Array<{
      count: number;
      price: number;
      product: CartProduct;
    }>;
    totalCartPrice: number;
  };
}
