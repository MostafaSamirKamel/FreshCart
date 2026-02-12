"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  Star,
  MapPin,
  CreditCard,
  UserPen,
  LogOut,
  ChevronRight,
  User,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/Store/Slices/authSlice";
import { useRouter } from "next/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  const menuItems = [
    { name: "Dashboard", href: "/profile", icon: LayoutDashboard },
    { name: "Orders", href: "/orders", icon: ShoppingBag },
    { name: "Wishlist", href: "/wishlist", icon: Heart },
    { name: "Favorites", href: "/favorites", icon: Star },
    { name: "Addresses", href: "/profile/addresses", icon: MapPin },
    { name: "Payment Methods", href: "/profile/payments", icon: CreditCard },
    { name: "Account Details", href: "/profile/account", icon: UserPen },
  ];

  // Breadcrumb logic
  const getBreadcrumb = () => {
    if (pathname === "/profile") return "Dashboard";
    if (pathname === "/profile/account") return "Account Details";
    if (pathname === "/profile/addresses") return "Addresses";
    if (pathname === "/profile/payments") return "Payment Methods";
    if (pathname === "/orders") return "Orders";
    if (pathname === "/wishlist") return "Wishlist";
    if (pathname === "/favorites") return "Favorites";
    return "";
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      {/* Breadcrumb Section */}
      <div className="bg-white border-b border-gray-100 py-[15px] mb-8">
        <div className="container px-4">
          <nav className="flex items-center gap-2 text-[14px]">
            <Link
              href="/"
              className="text-[#808080] hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <ChevronRight size={14} className="text-[#808080]" />
            <Link
              href="/profile"
              className="text-[#808080] hover:text-primary-600 transition-colors"
            >
              My Account
            </Link>
            {getBreadcrumb() && (
              <>
                <ChevronRight size={14} className="text-[#808080]" />
                <span className="text-[#00B207] font-medium">
                  {getBreadcrumb()}
                </span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="container px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-[280px] shrink-0">
            <div className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden py-[25px]">
              {/* Profile Header */}
              <div className="bg-[#F0F9F4] p-5 flex items-center gap-4 mb-[10px]">
                <div className="w-10 h-10 bg-[#D4F4DD] rounded-full flex items-center justify-center text-[#00B207] shrink-0">
                  <User size={20} />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-[16px] font-bold text-gray-900 truncate">
                    {user?.name || "John Doe"}
                  </h3>
                  <p className="text-[13px] text-[#666666] truncate">
                    {user?.email || "john.doe@example.com"}
                  </p>
                </div>
              </div>

              {/* Menu */}
              <nav className="space-y-0 text-[15px]">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-[25px] py-4 transition-all duration-300 ${
                        isActive
                          ? "bg-[#F0F9F4] text-[#00B207] font-medium"
                          : "text-[#4D4D4D] hover:bg-[#F0F9F4] hover:text-[#00B207]"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={
                          isActive ? "text-[#00B207]" : "text-gray-400"
                        }
                      />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-[25px] py-4 text-[#4D4D4D] hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-medium"
                >
                  <LogOut size={18} className="text-gray-400" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <section className="grow min-w-0">{children}</section>
        </div>
      </div>
    </div>
  );
}
