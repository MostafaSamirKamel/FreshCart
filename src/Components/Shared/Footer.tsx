"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS } from "@/Constants/icons.constants";
import { ROUTES } from "@/Constants/app.constants";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-full px-3 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Description Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo */}
            <div className="inline-flex items-center gap-2 bg-white rounded-lg px-4 py-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon
                  icon={ICONS.common.cart}
                  className="text-white w-4 h-4"
                />
              </div>
              <span className="text-lg font-bold">
                <span className="text-gray-900">Fresh</span>
                <span className="text-primary-600">Cart</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            {/* Contact Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FontAwesomeIcon
                  icon={ICONS.common.phone}
                  className="text-primary-500 w-4 h-4"
                />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FontAwesomeIcon
                  icon={ICONS.common.envelope}
                  className="text-primary-500 w-4 h-4"
                />
                <span>support@freshcart.com</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <FontAwesomeIcon
                  icon={ICONS.footer.location}
                  className="text-primary-500 w-4 h-4 mt-0.5"
                />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon
                  icon={ICONS.footer.facebook}
                  className="text-white w-4 h-4"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon
                  icon={ICONS.footer.twitter}
                  className="text-white w-4 h-4"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon
                  icon={ICONS.footer.instagram}
                  className="text-white w-4 h-4"
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon
                  icon={ICONS.footer.youtube}
                  className="text-white w-4 h-4"
                />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={ROUTES.PRODUCTS}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.CATEGORIES}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.BRANDS}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.COMPARE}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Compare
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/electronics"
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/mens-fashion"
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Men&apos;s Fashion
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/womens-fashion"
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Women&apos;s Fashion
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={ROUTES.PROFILE}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.ORDERS}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.WISHLIST}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.CART}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.LOGIN}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.SIGNUP}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={ROUTES.ABOUT}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.CONTACT}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.HELP}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.SHIPPING_INFO}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.RETURNS}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.TRACK}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={ROUTES.PRIVACY}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.TERMS}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.COOKIE_POLICY}
                  className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-full px-3 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 FreshCart. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <span>Secure Payments</span>
              <span>•</span>
              <span>Fast Delivery</span>
              <span>•</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
