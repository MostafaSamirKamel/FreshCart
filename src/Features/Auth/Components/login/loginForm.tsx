"use client";

import { useState, useActionState, useEffect, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../Schemas/login.schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS } from "@/Constants/icons.constants";
import Link from "next/link";
import { signinAction } from "../../Actions/signin.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuth } from "@/Store/Slices/authSlice";
import { ROUTES } from "@/Constants/app.constants";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(signinAction, null);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message);
        if (state.user && state.token) {
          dispatch(setAuth({ user: state.user, token: state.token }));
        }
        router.push(ROUTES.HOME); // Redirect to home on success
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router, dispatch]);

  const onSubmit = (data: LoginFormData) => {
    startTransition(() => {
      formAction(data);
    });
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-primary-900/5 border border-gray-100 w-full max-w-lg mx-auto animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
          Welcome Back
        </h2>
        <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-xs">
          Sign in to your premium account
        </p>
      </div>

      {/* Social Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <button className="flex-1 flex items-center justify-center gap-3 py-4 px-4 border-2 border-gray-50 rounded-2xl hover:border-primary-100 hover:bg-primary-50/30 transition-all font-black text-gray-700 text-sm">
          <FontAwesomeIcon icon={ICONS.auth.google} className="text-red-500" />
          Google
        </button>
        <button className="flex-1 flex items-center justify-center gap-3 py-4 px-4 border-2 border-gray-50 rounded-2xl hover:border-primary-100 hover:bg-primary-50/30 transition-all font-black text-gray-700 text-sm">
          <FontAwesomeIcon
            icon={ICONS.auth.facebook}
            className="text-blue-600"
          />
          Facebook
        </button>
      </div>

      <div className="relative flex items-center justify-center mb-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-50"></div>
        </div>
        <span className="relative px-6 bg-white text-gray-300 text-[10px] font-black tracking-[0.3em]">
          OR
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary-600 transition-colors">
              <FontAwesomeIcon icon={ICONS.common.envelope} />
            </div>
            <input
              {...register("email")}
              placeholder="john.doe@example.com"
              className={`w-full pl-14 pr-5 py-4 bg-gray-50 border-2 ${errors.email ? "border-red-100" : "border-gray-50"} rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white focus:border-primary-100 outline-none transition-all`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-[10px] text-red-500 font-black uppercase tracking-wider pl-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Password
            </label>
            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="text-[10px] font-black text-primary-600 hover:underline uppercase tracking-wider"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary-600 transition-colors">
              <FontAwesomeIcon icon={ICONS.common.user} />
            </div>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full pl-14 pr-12 py-4 bg-gray-50 border-2 ${errors.password ? "border-red-100" : "border-gray-50"} rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white focus:border-primary-100 outline-none transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary-600 transition-colors"
            >
              <FontAwesomeIcon
                icon={showPassword ? ICONS.common.eyeSlash : ICONS.common.eye}
              />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-[10px] text-red-500 font-black uppercase tracking-wider pl-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center pt-2">
          <label className="flex items-center gap-4 cursor-pointer group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border-2 border-gray-100 transition-all checked:bg-primary-600 checked:border-primary-600"
              />
              <FontAwesomeIcon
                icon={ICONS.common.spinner}
                className="absolute left-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity text-[10px]"
              />
            </div>
            <span className="text-[11px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
              Remember me on this device
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gray-900 hover:bg-black text-white font-black py-5 rounded-[20px] shadow-2xl shadow-gray-900/10 transition-all flex items-center justify-center gap-3 mt-8 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isPending ? (
            <FontAwesomeIcon
              icon={ICONS.common.spinner}
              className="animate-spin"
            />
          ) : (
            <FontAwesomeIcon icon={ICONS.common.userPlus} />
          )}
          {isPending ? "SIGNING IN..." : "SIGN IN TO ACCOUNT"}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Don&apos;t have an account?{" "}
          <Link
            href={ROUTES.SIGNUP}
            className="text-primary-600 font-black hover:underline ml-1"
          >
            CREATE ACCOUNT
          </Link>
        </p>
      </div>

      <div className="mt-12 flex items-center justify-center gap-6 border-t border-gray-50 pt-8">
        <Link
          href={ROUTES.HELP}
          className="text-[10px] font-black text-gray-300 hover:text-primary-600 uppercase tracking-widest transition-colors"
        >
          Need Help?
        </Link>
        <Link
          href={ROUTES.PRIVACY}
          className="text-[10px] font-black text-gray-300 hover:text-primary-600 uppercase tracking-widest transition-colors"
        >
          Privacy
        </Link>
        <Link
          href={ROUTES.TERMS}
          className="text-[10px] font-black text-gray-300 hover:text-primary-600 uppercase tracking-widest transition-colors"
        >
          Terms
        </Link>
      </div>
    </div>
  );
}
