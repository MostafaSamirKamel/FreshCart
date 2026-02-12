"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/Store/store";
import {
  Camera,
  Eye,
  EyeOff,
  Calendar,
  User,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateUserData, changeUserPassword } from "@/Store/Slices/authSlice";

// Validation Schemas
const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
});

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

type ProfileValues = z.infer<typeof profileSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

export default function AccountDetailsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  // States for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onUpdateProfile = async (data: ProfileValues) => {
    try {
      await dispatch(updateUserData({ ...data, token: token! })).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error || "Failed to update profile");
    }
  };

  const onUpdatePassword = async (data: PasswordValues) => {
    setIsUpdatingPassword(true);
    try {
      await dispatch(changeUserPassword({ ...data, token: token! })).unwrap();
      toast.success("Password updated successfully!");
      resetPasswordForm();
    } catch (error: any) {
      toast.error(error || "Failed to update password");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 lg:p-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
          Account Details
        </h1>
        <div className="px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-100">
          Personal Profile
        </div>
      </div>

      {/* 1. Profile Picture Section (Visual Only for now) */}
      <section className="mb-16">
        <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
          <div className="w-2 h-8 bg-primary-600 rounded-full" />
          Profile Identity
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-10 p-8 bg-gray-50 rounded-[32px] border border-gray-100/50">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[40px] border-4 border-white shadow-2xl overflow-hidden bg-white flex items-center justify-center text-primary-600 group-hover:scale-105 transition-transform duration-500">
              <User size={64} strokeWidth={1.5} />
            </div>
            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary-600 rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-xl hover:bg-primary-700 hover:scale-110 transition-all duration-300">
              <Camera size={18} />
            </button>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <div>
              <h3 className="text-lg font-black text-gray-900">{user?.name}</h3>
              <p className="text-sm font-bold text-gray-400">
                Member since February 2026
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <button className="px-6 py-2.5 bg-primary-600 text-white text-xs font-black rounded-xl shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-all active:scale-95">
                Change Photo
              </button>
              <button className="px-6 py-2.5 bg-white text-gray-600 text-xs font-black rounded-xl border border-gray-100 hover:bg-gray-50 transition-all">
                Remove
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Personal Information Section */}
      <section className="mb-16">
        <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
          <div className="w-2 h-8 bg-primary-600 rounded-full" />
          Basic Information
        </h2>
        <form
          onSubmit={handleProfileSubmit(onUpdateProfile)}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Name */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  {...registerProfile("name")}
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 border ${
                    profileErrors.name ? "border-red-500" : "border-gray-100"
                  } rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white outline-none transition-all`}
                />
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
              </div>
              {profileErrors.name && (
                <p className="text-[10px] text-red-500 font-black uppercase tracking-wider pl-1 font-bold">
                  {profileErrors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  {...registerProfile("email")}
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 border ${
                    profileErrors.email ? "border-red-500" : "border-gray-100"
                  } rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white outline-none transition-all`}
                />
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
              </div>
              {profileErrors.email && (
                <p className="text-[10px] text-red-500 font-black uppercase tracking-wider pl-1 font-bold">
                  {profileErrors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                Phone Number
              </label>
              <div className="relative">
                <input
                  {...registerProfile("phone")}
                  placeholder="01xxxxxxxxx"
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 border ${
                    profileErrors.phone ? "border-red-500" : "border-gray-100"
                  } rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white outline-none transition-all`}
                />
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
              </div>
              {profileErrors.phone && (
                <p className="text-[10px] text-red-500 font-black uppercase tracking-wider pl-1 font-bold">
                  {profileErrors.phone.message}
                </p>
              )}
            </div>

            {/* Placeholder for DOB (optional in API but keep for UI completeness) */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white outline-none transition-all"
                />
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary px-12! py-5! text-base font-black shadow-2xl shadow-primary-600/20 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </section>

      {/* 3. Security Section */}
      <section>
        <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
          <div className="w-2 h-8 bg-primary-600 rounded-full" />
          Security & Password
        </h2>
        <form
          onSubmit={handlePasswordSubmit(onUpdatePassword)}
          className="space-y-8 max-w-2xl"
        >
          <div className="grid grid-cols-1 gap-8">
            {/* Current Password */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  {...registerPassword("currentPassword")}
                  className={`w-full px-4 py-4 pr-12 bg-gray-50 border ${
                    passwordErrors.currentPassword
                      ? "border-red-500"
                      : "border-gray-100"
                  } rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white outline-none transition-all`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="text-[10px] text-red-500 font-black uppercase tracking-wider pl-1 font-bold">
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* New Password */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    {...registerPassword("password")}
                    className={`w-full px-4 py-4 pr-12 bg-gray-50 border ${
                      passwordErrors.password
                        ? "border-red-500"
                        : "border-gray-100"
                    } rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white outline-none transition-all`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordErrors.password && (
                  <p className="text-[10px] text-red-500 font-black uppercase tracking-wider pl-1 font-bold">
                    {passwordErrors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...registerPassword("rePassword")}
                    className={`w-full px-4 py-4 pr-12 bg-gray-50 border ${
                      passwordErrors.rePassword
                        ? "border-red-500"
                        : "border-gray-100"
                    } rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white outline-none transition-all`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {passwordErrors.rePassword && (
                  <p className="text-[10px] text-red-500 font-black uppercase tracking-wider pl-1 font-bold">
                    {passwordErrors.rePassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdatingPassword}
            className="btn bg-gray-900 hover:bg-black text-white px-12! py-5! text-base font-black shadow-2xl active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
          >
            {isUpdatingPassword ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </section>
    </div>
  );
}
