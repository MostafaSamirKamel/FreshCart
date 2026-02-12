"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import {
  MapPin,
  Plus,
  Trash2,
  Home,
  Building2,
  Map,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const addressSchema = z.object({
  name: z.string().min(2, "Name is required"),
  details: z.string().min(5, "Details are required"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  city: z.string().min(2, "City is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function AddressesPage() {
  const { token } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });

  // Fetch Addresses
  const { data: addresses, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/addresses",
        {
          headers: { token },
        },
      );
      return response.data.data;
    },
    enabled: !!token,
  });

  // Add Address Mutation
  const addAddressMutation = useMutation({
    mutationFn: async (values: AddressFormValues) => {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/addresses",
        values,
        { headers: { token } },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address added successfully!");
      setIsAdding(false);
      reset();
    },
    onError: () => {
      toast.error("Failed to add address. Please try again.");
    },
  });

  // Delete Address Mutation
  const deleteAddressMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
        {
          headers: { token },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.info("Address removed");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-primary-600" size={48} />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter">
            My Addresses
          </h1>
          <p className="text-gray-500 font-medium">
            Manage your delivery locations for faster checkout.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`btn flex items-center gap-2 px-8! py-3! font-black transition-all ${
            isAdding
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-none"
              : "btn-primary shadow-xl shadow-primary-600/20"
          }`}
        >
          {isAdding ? (
            <Plus className="rotate-45" size={20} />
          ) : (
            <Plus size={20} />
          )}
          {isAdding ? "Cancel" : "Add New Address"}
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="card bg-white p-8 border-0 shadow-lg mb-12 animate-in fade-in slide-in-from-top-4 duration-300 rounded-[32px]">
          <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
            <MapPin className="text-primary-600" size={24} /> New Address
            Details
          </h2>
          <form
            onSubmit={handleSubmit((data) => addAddressMutation.mutate(data))}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">
                Address Name (e.g. Home, Office)
              </label>
              <input
                {...register("name")}
                placeholder="Home"
                className={`w-full p-4 bg-gray-50 border ${errors.name ? "border-red-500" : "border-gray-100"} rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary-600 outline-none transition-all`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs font-bold pl-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">
                City
              </label>
              <input
                {...register("city")}
                placeholder="Cairo"
                className={`w-full p-4 bg-gray-50 border ${errors.city ? "border-red-500" : "border-gray-100"} rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary-600 outline-none transition-all`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs font-bold pl-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">
                Detailed Address
              </label>
              <textarea
                {...register("details")}
                rows={3}
                placeholder="Street name, Building number, Apartment..."
                className={`w-full p-4 bg-gray-50 border ${errors.details ? "border-red-500" : "border-gray-200"} rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary-600 outline-none transition-all resize-none`}
              />
              {errors.details && (
                <p className="text-red-500 text-xs font-bold pl-1">
                  {errors.details.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">
                Phone Number
              </label>
              <input
                {...register("phone")}
                placeholder="01xxxxxxxxx"
                className={`w-full p-4 bg-gray-50 border ${errors.phone ? "border-red-500" : "border-gray-100"} rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary-600 outline-none transition-all`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs font-bold pl-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                disabled={addAddressMutation.isPending}
                className="btn btn-primary w-full py-5! text-lg font-black shadow-xl shadow-primary-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {addAddressMutation.isPending ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  "Save New Address"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses?.length === 0 ? (
          <div className="md:col-span-2 card bg-white border border-gray-100 shadow-sm p-20 text-center rounded-[40px]">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Map size={40} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tighter">
              No addresses yet
            </h2>
            <p className="text-gray-400 font-bold mb-8 italic">
              Add your first address to speed up your checkout process!
            </p>
          </div>
        ) : (
          addresses?.map((address: any) => (
            <div
              key={address._id}
              className="card bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden rounded-[32px]"
            >
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                    {address.name.toLowerCase().includes("home") ? (
                      <Home size={24} />
                    ) : address.name.toLowerCase().includes("office") ||
                      address.name.toLowerCase().includes("work") ? (
                      <Building2 size={24} />
                    ) : (
                      <MapPin size={24} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 leading-tight">
                      {address.name}
                    </h3>
                    <p className="text-xs font-black text-primary-600 uppercase tracking-widest">
                      {address.city}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteAddressMutation.mutate(address._id)}
                  disabled={deleteAddressMutation.isPending}
                  className="p-3 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white active:scale-90"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-4 relative z-10 pt-4 border-t border-gray-50">
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  {address.details}
                </p>
                <div className="flex items-center gap-2 text-gray-900">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Phone:
                  </span>
                  <span className="text-sm font-black">{address.phone}</span>
                </div>
              </div>

              <MapPin className="absolute -right-6 -bottom-6 w-32 h-32 text-gray-50 rotate-12 group-hover:scale-110 transition-transform duration-500" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
