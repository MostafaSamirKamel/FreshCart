/**
 * Application-wide constants.
 */

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PRODUCTS_PER_PAGE: 40,
} as const;

export const SORT_OPTIONS = [
  { label: "Default", value: "" },
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "-price" },
  { label: "Rating: High to Low", value: "-ratingsAverage" },
  { label: "Newest First", value: "-createdAt" },
] as const;

export const CURRENCY = {
  SYMBOL: "EGP",
  CODE: "EGP",
} as const;

export const COOKIE_KEYS = {
  TOKEN: "token",
} as const;

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAILS: (id: string) => `/products/${id}`,
  CART: "/cart",
  CHECKOUT: "/checkout",
  WISHLIST: "/wishlist",
  CATEGORIES: "/categories",
  BRANDS: "/brands",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  FORGOT_PASSWORD: "/auth/forgot-password",
  PROFILE: "/profile",
  ORDERS: "/profile/orders",
  ACCOUNT: "/profile/account",
  ADDRESSES: "/profile/addresses",
  TRACK: "/track",
  ABOUT: "/about",
  CONTACT: "/contact",
  COMPARE: "/compare",
  DEALS: "/deals",
  NEW_ARRIVALS: "/new-arrivals",
  RECIPES: "/recipes",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  HELP: "/help",
  SHIPPING_INFO: "/shipping-info",
  RETURNS: "/returns",
  COOKIE_POLICY: "/cookie-policy",
} as const;
