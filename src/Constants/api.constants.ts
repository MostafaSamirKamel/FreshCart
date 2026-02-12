/**
 * All API endpoint paths, relative to the base URL.
 * Usage: apiClient.get(ENDPOINTS.PRODUCTS.LIST)
 */
export const ENDPOINTS = {
  AUTH: {
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
    VERIFY_TOKEN: "/auth/verifyToken",
    FORGOT_PASSWORD: "/auth/forgotPasswords",
    VERIFY_RESET_CODE: "/auth/verifyResetCode",
    RESET_PASSWORD: "/auth/resetPassword",
  },
  USERS: {
    UPDATE_ME: "/users/updateMe/",
    CHANGE_PASSWORD: "/users/changeMyPassword",
  },
  PRODUCTS: {
    LIST: "/products",
    DETAILS: (id: string) => `/products/${id}`,
  },
  CATEGORIES: {
    LIST: "/categories",
    DETAILS: (id: string) => `/categories/${id}`,
  },
  BRANDS: {
    LIST: "/brands",
    DETAILS: (id: string) => `/brands/${id}`,
  },
  CART: {
    BASE: "/cart",
    ITEM: (productId: string) => `/cart/${productId}`,
  },
  WISHLIST: {
    BASE: "/wishlist",
    ITEM: (productId: string) => `/wishlist/${productId}`,
  },
  SUBCATEGORIES: {
    LIST: "/subcategories",
    DETAILS: (id: string) => `/subcategories/${id}`,
    BY_CATEGORY: (categoryId: string) => `/categories/${categoryId}/subcategories`,
  },
  ADDRESSES: {
    BASE: "/addresses",
    ITEM: (id: string) => `/addresses/${id}`,
  },
  ORDERS: {
    ALL: "/orders",
    USER: (userId: string) => `/orders/user/${userId}`,
    CASH: (cartId: string) => `/orders/${cartId}`,
    ONLINE: (cartId: string, returnUrl: string) =>
      `/orders/checkout-session/${cartId}?url=${returnUrl}`,
  },
} as const;
