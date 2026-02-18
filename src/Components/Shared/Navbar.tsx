"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/Constants/app.constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS } from "@/Constants/icons.constants";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/Store/store";
import { logout } from "@/Store/Slices/authSlice";
import { useRouter, usePathname } from "next/navigation";
import miniLogo from "@/assets/images/mini-logo.png";
import { useCategories } from "@/Hooks/useCategories";
import { Category } from "@/Types/category.types";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileRef = useRef<HTMLDivElement>(null);
  const { categories, isLoading: isCategoriesLoading } = useCategories();

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const { totalQuantity } = useSelector((state: RootState) => state.cart);
  const { items: wishlistItems } = useSelector(
    (state: RootState) => state.wishlist,
  );
  const { items: compareItems } = useSelector(
    (state: RootState) => state.compare,
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    router.push("/auth/login");
  };

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      setIsSidebarOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", href: ROUTES.HOME },
    { label: "Shop", href: ROUTES.PRODUCTS },
    { label: "Deals", href: ROUTES.DEALS },
    { label: "New Arrivals", href: ROUTES.NEW_ARRIVALS },
    { label: "Brands", href: ROUTES.BRANDS },
    { label: "About Us", href: ROUTES.ABOUT },
    { label: "Contact Us", href: ROUTES.CONTACT },
  ];

  return (
    <nav className="w-full bg-white relative z-[100]">
      {/* --- LAYER 1: TOP CONTACT BAR --- */}
      <div className="hidden lg:block border-b border-[#F0F0F0]">
        <div className="max-w-[1400px] mx-auto px-4 py-2 flex items-center justify-between text-[13px] text-[#666666]">
          {/* Left Side: Contact Info */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 hover:text-gray-900 transition-colors cursor-default">
              <FontAwesomeIcon
                icon={ICONS.common.phone}
                className="text-[14px]"
              />
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-gray-900 transition-colors cursor-default">
              <FontAwesomeIcon
                icon={ICONS.common.envelope}
                className="text-[14px]"
              />
              <span>support@freshcart.com</span>
            </div>
          </div>
          {/* Right Side: User Actions & Settings */}
          <div className="flex items-center gap-5">
            <Link
              href="/track"
              className="hover:text-[#00B207] transition-colors"
            >
              Track Order
            </Link>
            <Link
              href="/about"
              className="hover:text-[#00B207] transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#00B207] transition-colors"
            >
              Contact
            </Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900 transition-colors">
              <span>USD</span>
              <FontAwesomeIcon
                icon={ICONS.common.chevronDown}
                className="text-[10px]"
              />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900 transition-colors">
              <span>English</span>
              <FontAwesomeIcon
                icon={ICONS.common.chevronDown}
                className="text-[10px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- LAYER 2: MAIN NAVIGATION BAR --- */}
      <div className="sticky top-0 bg-white border-b border-[#F0F0F0] shadow-[0_2px_8px_rgba(0,0,0,0.04)] h-[70px] lg:h-[75px] flex items-center">
        <div className="max-w-[1400px] mx-auto w-full px-4 lg:px-6 flex items-center justify-between gap-4">
          {/* Section 1: Logo */}
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2 shrink-0 group"
          >
            <div className="relative w-10 h-10 lg:w-11 lg:h-11">
              <Image
                src={miniLogo}
                alt="FreshCart Logo"
                fill
                sizes="45px"
                className="object-contain transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-[24px] lg:text-[26px] font-bold tracking-[-0.5px]">
              <span className="text-[#00B207]">Fresh</span>
              <span className="text-[#1A1A1A]">Cart</span>
            </span>
          </Link>

          {/* Section 2: Search Bar (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:block relative flex-1 max-w-[550px] mx-10 group"
          >
            <div className="relative w-full border border-[#E5E5E5] rounded-[6px] transition-all focus-within:border-[#00B207] focus-within:ring-[3px] focus-within:ring-[#00B207]/10 h-[46px]">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full pl-5 pr-[50px] text-[14px] text-[#333333] placeholder-[#999999] bg-transparent outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full w-[50px] flex items-center justify-center text-[#666666] hover:text-[#00B207] transition-colors"
              >
                <FontAwesomeIcon
                  icon={ICONS.common.search}
                  className="text-[20px]"
                />
              </button>
            </div>
          </form>

          {/* Section 3: Action Icons */}
          <div className="flex items-center gap-6 lg:gap-7">
            {/* Wishlist */}
            <Link
              href={ROUTES.WISHLIST}
              className="flex flex-col items-center gap-1 group transition-all"
            >
              <div className="relative">
                <FontAwesomeIcon
                  icon={ICONS.common.heart}
                  className={`text-[24px] transition-colors ${pathname === "/wishlist" ? "text-[#00B207]" : "text-[#1A1A1A] group-hover:text-[#00B207]"}`}
                />
              </div>
              <span
                className={`hidden lg:block text-[12px] transition-colors ${pathname === "/wishlist" ? "text-[#00B207] font-semibold" : "text-[#666666] group-hover:text-[#00B207]"}`}
              >
                Wishlist
              </span>
            </Link>

            {/* Compare */}
            <Link
              href={ROUTES.COMPARE}
              className="hidden lg:flex flex-col items-center gap-1 group transition-all"
            >
              <div className="relative">
                <FontAwesomeIcon
                  icon={ICONS.navbar.compare}
                  className="text-[24px] text-[#1A1A1A] group-hover:text-[#00B207] transition-colors"
                />
                {compareItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-primary-600 text-white text-[11px] font-semibold flex items-center justify-center rounded-full border-2 border-white px-1">
                    {compareItems.length}
                  </span>
                )}
              </div>
              <span className="text-[12px] text-[#666666] group-hover:text-[#00B207] transition-colors">
                Compare
              </span>
            </Link>

            {/* Cart */}
            <Link
              href={ROUTES.CART}
              className="flex flex-col items-center gap-1 group transition-all"
            >
              <div className="relative">
                <FontAwesomeIcon
                  icon={ICONS.common.cart}
                  className="text-[24px] text-[#1A1A1A] group-hover:text-[#00B207] transition-colors"
                />
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-[#00B207] text-white text-[11px] font-semibold flex items-center justify-center rounded-full border-2 border-white px-1">
                  {totalQuantity}
                </span>
              </div>
              <span className="hidden lg:block text-[12px] text-[#666666] group-hover:text-[#00B207] transition-colors">
                Cart
              </span>
            </Link>

            {/* Account */}
            <div
              className="relative group transition-all h-full flex items-center"
              ref={profileRef}
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 focus:outline-none py-2 px-1 rounded-lg hover:bg-gray-50 lg:hover:bg-transparent transition-all"
              >
                {/* Avatar/Icon Section */}
                <div className="relative">
                  {isAuthenticated ? (
                    <div
                      className={`w-9 h-9 bg-gradient-to-br from-[#00B207] to-[#008A05] rounded-full flex items-center justify-center text-white text-[15px] font-bold shadow-sm border-2 border-white transition-all ${isProfileOpen ? "ring-2 ring-[#00B207]/20 scale-105" : "group-hover:shadow-md"}`}
                    >
                      {user?.name?.[0].toUpperCase() || "U"}
                    </div>
                  ) : (
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isProfileOpen ? "bg-[#00B207]/10 text-[#00B207]" : "text-[#1A1A1A] group-hover:bg-[#00B207]/5 group-hover:text-[#00B207]"}`}
                    >
                      <FontAwesomeIcon
                        icon={ICONS.common.user}
                        className="text-[24px]"
                      />
                    </div>
                  )}
                </div>

                {/* Text & Chevron Section */}
                <div className="hidden lg:flex items-center gap-2">
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[11px] text-[#666666] font-medium">
                      {isAuthenticated ? "" : "Sign In"}
                    </span>
                    <span
                      className={`text-[14px] font-bold transition-all ${isAuthenticated || isProfileOpen ? "text-[#00B207]" : "text-[#1A1A1A]"}`}
                    >
                      {isAuthenticated ? user?.name?.split(" ")[0] : "Account"}
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={ICONS.common.chevronDown}
                    className={`text-[11px] text-[#999999] transition-transform duration-300 ${isProfileOpen ? "rotate-180 text-[#00B207]" : "group-hover:text-[#00B207]"}`}
                  />
                </div>
              </button>

              {/* Profile Dropdown Modal */}
              {isProfileOpen && (
                <div className="absolute top-[calc(100%+15px)] right-0 w-[280px] bg-white border border-[#F0F0F0] shadow-[0_10px_40px_rgba(0,0,0,0.12)] rounded-xl py-2 z-[110] animate-in fade-in slide-in-from-top-2 duration-200">
                  {isAuthenticated ? (
                    <>
                      {/* Authenticated Header */}
                      <div className="px-5 py-4 border-b border-[#F0F0F0] mb-2">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#00B207] to-[#008A05] rounded-full flex items-center justify-center text-white font-bold">
                            {user?.name?.[0].toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[15px] font-bold text-[#1A1A1A] truncate">
                              {user?.name}
                            </p>
                            <p className="text-[12px] text-[#666666] truncate">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Nav Links */}
                      <div className="px-2 space-y-0.5">
                        <Link
                          href={ROUTES.PROFILE}
                          className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#333333] hover:bg-[#F5F5F5] hover:text-[#00B207] rounded-lg transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FontAwesomeIcon
                            icon={ICONS.common.user}
                            className="w-4 h-4 opacity-70"
                          />
                          My Profile
                        </Link>
                        <Link
                          href={ROUTES.ORDERS}
                          className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#333333] hover:bg-[#F5F5F5] hover:text-[#00B207] rounded-lg transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FontAwesomeIcon
                            icon={ICONS.navbar.truck}
                            className="w-4 h-4 opacity-70"
                          />
                          My Orders
                        </Link>
                        <Link
                          href={ROUTES.WISHLIST}
                          className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#333333] hover:bg-[#F5F5F5] hover:text-[#00B207] rounded-lg transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FontAwesomeIcon
                            icon={ICONS.common.heart}
                            className="w-4 h-4 opacity-70"
                          />
                          Wishlist
                        </Link>
                        <Link
                          href={ROUTES.SETTINGS}
                          className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#333333] hover:bg-[#F5F5F5] hover:text-[#00B207] rounded-lg transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FontAwesomeIcon
                            icon={ICONS.common.star}
                            className="w-4 h-4 opacity-70"
                          />
                          Settings
                        </Link>
                      </div>

                      {/* Logout Section */}
                      <div className="mt-2 pt-2 border-t border-[#F0F0F0] px-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                        >
                          <FontAwesomeIcon
                            icon={ICONS.navbar.logout}
                            className="w-4 h-4"
                          />
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-5 text-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FontAwesomeIcon
                          icon={ICONS.common.user}
                          className="text-gray-300 text-2xl"
                        />
                      </div>
                      <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-1">
                        Welcome!
                      </h4>
                      <p className="text-[13px] text-[#666666] mb-5">
                        Join FreshCart to save items and track your orders.
                      </p>

                      <div className="space-y-3">
                        <Link
                          href={ROUTES.LOGIN}
                          className="block w-full py-2.5 bg-[#00B207] text-white rounded-lg font-bold text-[14px] hover:bg-[#009606] transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          href={ROUTES.SIGNUP}
                          className="block w-full py-2.5 border border-[#F0F0F0] text-[#1A1A1A] rounded-lg font-bold text-[14px] hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Create Account
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#1A1A1A] active:scale-95 transition-all"
            >
              <FontAwesomeIcon
                icon={ICONS.common.bars}
                className="text-[24px]"
              />
            </button>
          </div>
        </div>
      </div>

      {/* --- LAYER 3: SECONDARY NAVIGATION BAR --- */}
      <div className="hidden lg:block border-b border-[#F0F0F0] h-[52px]">
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center gap-10">
          {/* All Categories Button */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="h-[42px] px-5 bg-[#00B207] text-white rounded-[6px] flex items-center gap-3 font-semibold text-[14px] transition-all hover:bg-[#009606] hover:shadow-[0_2px_8px_rgba(0,178,7,0.2)]"
            >
              <FontAwesomeIcon
                icon={ICONS.common.bars}
                className="text-[18px]"
              />
              <span>All Categories</span>
              <FontAwesomeIcon
                icon={ICONS.common.chevronDown}
                className={`text-[12px] transition-transform duration-300 ${isCategoryMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isCategoryMenuOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-64 bg-white border border-[#F0F0F0] shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-lg py-3 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[400px] overflow-y-auto custom-scrollbar">
                {isCategoriesLoading ? (
                  <div className="px-6 py-4 space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="h-4 bg-gray-100 animate-pulse rounded w-full"
                      />
                    ))}
                  </div>
                ) : (
                  categories?.map((cat: Category) => (
                    <Link
                      key={cat._id}
                      href={`${ROUTES.CATEGORIES}/${cat._id}`}
                      className="block px-6 py-2.5 text-[14px] text-[#333333] hover:bg-[#00B207]/5 hover:text-[#00B207] transition-colors"
                      onClick={() => setIsCategoryMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[15px] font-medium py-2 transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#00B207] after:transition-all hover:text-[#00B207] hover:after:w-full ${
                  pathname === link.href
                    ? "text-[#00B207] font-semibold after:w-full"
                    : "text-[#333333]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed top-0 right-0 w-[300px] h-full bg-white z-[1000] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-5 border-b border-[#F0F0F0] flex items-center justify-between">
              <span className="text-xl font-bold">
                <span className="text-[#00B207]">Fresh</span>Cart
              </span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FontAwesomeIcon
                  icon={ICONS.common.xmark}
                  className="text-gray-500"
                />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search store..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-4 pr-10 rounded-lg bg-[#F5F5F5] border-none text-[14px] focus:ring-2 focus:ring-[#00B207]/20 outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00B207] transition-colors"
                >
                  <FontAwesomeIcon icon={ICONS.common.search} />
                </button>
              </form>

              {/* Links */}
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`block text-lg font-medium ${pathname === link.href ? "text-[#00B207]" : "text-[#1A1A1A]"}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Categories */}
              <div className="pt-6 border-t border-[#F0F0F0]">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Categories
                </h3>
                <div className="space-y-3 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
                  {isCategoriesLoading ? (
                    <div className="space-y-3">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="h-4 bg-gray-50 animate-pulse rounded w-full"
                        />
                      ))}
                    </div>
                  ) : (
                    categories?.map((cat: Category) => (
                      <Link
                        key={cat._id}
                        href={`${ROUTES.CATEGORIES}/${cat._id}`}
                        className="block text-[#4D4D4D] hover:text-[#00B207] transition-colors"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))
                  )}
                </div>
              </div>

              {/* Auth */}
              <div className="pt-6 border-t border-[#F0F0F0]">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 rounded-lg bg-[#F5F5F5] text-gray-700 font-bold flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={ROUTES.LOGIN}
                      className="py-3 rounded-lg bg-[#00B207] text-white font-bold text-center"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href={ROUTES.SIGNUP}
                      className="py-3 rounded-lg bg-gray-100 text-[#1A1A1A] font-bold text-center"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Signup
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
