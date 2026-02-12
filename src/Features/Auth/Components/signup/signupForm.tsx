"use client";

import { useState, useActionState, useEffect, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "../../Schemas/signup.schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS } from "@/Constants/icons.constants";
import Link from "next/link";
import { signupAction } from "../../Actions/signup.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuth } from "@/Store/Slices/authSlice";
import { CheckCircle2 } from "lucide-react";
import { ROUTES } from "@/Constants/app.constants";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<
    "Weak" | "Medium" | "Strong" | ""
  >("");
  const [state, formAction, isPending] = useActionState(signupAction, null);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const password = watch("password", "");

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message);
        if (state.user && state.token) {
          dispatch(setAuth({ user: state.user, token: state.token }));
          router.push(ROUTES.HOME);
        } else {
          router.push(ROUTES.LOGIN);
        }
      } else {
        toast.error(state.message);
        if (state.errors) {
          // Map API errors to react-hook-form fields
          Object.keys(state.errors).forEach((key) => {
            setError(key as any, {
              type: "server",
              message: state.errors[key].message || state.errors[key],
            });
          });
        }
      }
    }
  }, [state, router, setError]);

  const checkPasswordStrength = (value: string) => {
    if (!value) return setPasswordStrength("");
    if (value.length < 8) return setPasswordStrength("Weak");
    const hasNumbers = /\d/.test(value);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    if (hasNumbers && hasSymbols && value.length >= 10)
      return setPasswordStrength("Strong");
    if (hasNumbers || hasSymbols) return setPasswordStrength("Medium");
    return setPasswordStrength("Weak");
  };

  const onSubmit = async (data: SignupFormData) => {
    const apiData = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
      rePassword: data.confirmPassword,
      phone: data.phone,
    };
    startTransition(() => {
      formAction(apiData);
    });
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-primary-900/5 border border-gray-100 w-full max-w-xl mx-auto animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
          Create Account
        </h2>
        <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-xs">
          Start your premium fresh journey today
        </p>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <button className="flex items-center justify-center gap-3 py-4 px-4 border-2 border-gray-50 rounded-2xl hover:border-primary-100 hover:bg-primary-50/30 transition-all font-black text-gray-700 text-sm">
          <FontAwesomeIcon icon={ICONS.auth.google} className="text-red-500" />
          Google
        </button>
        <button className="flex items-center justify-center gap-3 py-4 px-4 border-2 border-gray-50 rounded-2xl hover:border-primary-100 hover:bg-primary-50/30 transition-all font-black text-gray-700 text-sm">
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
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
              First Name
            </label>
            <input
              {...register("firstName")}
              placeholder="John"
              className={`w-full px-5 py-4 bg-gray-50 border-2 ${errors.firstName ? "border-red-100" : "border-gray-50"} rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white focus:border-primary-100 outline-none transition-all`}
            />
            {errors.firstName && (
              <p className="mt-1 text-[10px] text-red-500 font-black uppercase tracking-wider pl-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
              Last Name
            </label>
            <input
              {...register("lastName")}
              placeholder="Doe"
              className={`w-full px-5 py-4 bg-gray-50 border-2 ${errors.lastName ? "border-red-100" : "border-gray-50"} rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white focus:border-primary-100 outline-none transition-all`}
            />
            {errors.lastName && (
              <p className="mt-1 text-[10px] text-red-500 font-black uppercase tracking-wider pl-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
            Email Address
          </label>
          <input
            {...register("email")}
            placeholder="john.doe@example.com"
            className={`w-full px-5 py-4 bg-gray-50 border-2 ${errors.email ? "border-red-100" : "border-gray-50"} rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white focus:border-primary-100 outline-none transition-all`}
          />
          {errors.email && (
            <p className="mt-1 text-[10px] text-red-500 font-black uppercase tracking-wider pl-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
            Phone Number
          </label>
          <input
            {...register("phone")}
            placeholder="01010700701"
            className={`w-full px-5 py-4 bg-gray-50 border-2 ${errors.phone ? "border-red-100" : "border-gray-50"} rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-600/5 focus:bg-white focus:border-primary-100 outline-none transition-all`}
          />
          {errors.phone && (
            <p className="mt-1 text-[10px] text-red-500 font-black uppercase tracking-wider pl-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="relative space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
            Password
          </label>
          <div className="relative">
            <input
              {...register("password", {
                onChange: (e) => checkPasswordStrength(e.target.value),
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              className={`w-full px-5 py-4 rounded-2xl border-2 ${errors.password ? "border-red-100" : "border-gray-50"} bg-gray-50 focus:ring-4 focus:ring-primary-600/5 focus:bg-white focus:border-primary-100 outline-none transition-all pr-12 text-sm font-bold`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary-600 transition-colors"
            >
              <FontAwesomeIcon
                icon={showPassword ? ICONS.common.eyeSlash : ICONS.common.eye}
              />
            </button>
          </div>
          {passwordStrength && (
            <div className="mt-3 flex items-center gap-2 px-1">
              <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    passwordStrength === "Weak"
                      ? "w-1/3 bg-red-400"
                      : passwordStrength === "Medium"
                        ? "w-2/3 bg-yellow-400"
                        : "w-full bg-primary-500"
                  }`}
                ></div>
              </div>
              <span
                className={`text-[8px] font-black uppercase tracking-widest ${
                  passwordStrength === "Weak"
                    ? "text-red-400"
                    : passwordStrength === "Medium"
                      ? "text-yellow-500"
                      : "text-primary-600"
                }`}
              >
                {passwordStrength}
              </span>
            </div>
          )}
          {errors.password && (
            <p className="mt-1 text-[10px] text-red-500 font-black uppercase tracking-wider pl-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="relative space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className={`w-full px-5 py-4 rounded-2xl border-2 ${errors.confirmPassword ? "border-red-100" : "border-gray-50"} bg-gray-50 focus:ring-4 focus:ring-primary-600/5 focus:bg-white focus:border-primary-100 outline-none transition-all pr-12 text-sm font-bold`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary-600 transition-colors"
            >
              <FontAwesomeIcon
                icon={
                  showConfirmPassword ? ICONS.common.eyeSlash : ICONS.common.eye
                }
              />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-[10px] text-red-500 font-black uppercase tracking-wider pl-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="space-y-4 pt-4">
          <label className="flex items-start gap-4 cursor-pointer group">
            <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                {...register("promoEmails")}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border-2 border-gray-100 transition-all checked:bg-primary-600 checked:border-primary-600"
              />
              <CheckCircle2
                size={12}
                className="absolute left-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
              />
            </div>
            <span className="text-[11px] font-bold text-gray-400 leading-tight group-hover:text-gray-600 transition-colors">
              I&apos;d like to receive promotional emails about new products,
              discounts, and exclusive offers.
            </span>
          </label>

          <div className="space-y-2">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  {...register("agreeToTerms")}
                  className={`peer h-5 w-5 cursor-pointer appearance-none rounded-lg border-2 ${errors.agreeToTerms ? "border-red-200" : "border-gray-100"} transition-all checked:bg-primary-600 checked:border-primary-600`}
                />
                <CheckCircle2
                  size={12}
                  className="absolute left-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-[11px] font-bold text-gray-400 leading-tight group-hover:text-gray-600 transition-colors">
                I agree to the{" "}
                <Link
                  href={ROUTES.TERMS}
                  className="text-primary-600 hover:underline font-black"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href={ROUTES.PRIVACY}
                  className="text-primary-600 hover:underline font-black"
                >
                  Privacy Policy
                </Link>{" "}
                *
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="mt-1 ml-9 text-[10px] text-red-500 font-black uppercase tracking-wider">
                {errors.agreeToTerms.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gray-900 hover:bg-black text-white font-black py-5 rounded-[20px] shadow-2xl shadow-gray-900/10 transition-all flex items-center justify-center gap-3 mt-6 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isPending ? (
            <FontAwesomeIcon
              icon={ICONS.common.spinner}
              className="animate-spin"
            />
          ) : (
            <FontAwesomeIcon icon={ICONS.common.userPlus} />
          )}
          {isPending ? "CREATING ACCOUNT..." : "CREATE MY ACCOUNT"}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Already have an account?{" "}
          <Link
            href={ROUTES.LOGIN}
            className="text-primary-600 font-black hover:underline ml-1"
          >
            SIGN IN
          </Link>
        </p>
      </div>
    </div>
  );
}
