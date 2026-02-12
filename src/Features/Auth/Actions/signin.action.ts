"use server";

import axios from "axios";

export async function signinAction(prevState: any, formData: any): Promise<{
  success: boolean;
  message: string;
  user?: any;
  token?: string;
  errors?: any;
}> {
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      {
        email: formData.email,
        password: formData.password,
      }
    );

    return {
      success: true,
      message: "Welcome back! Login successful.",
      user: response.data.user,
      token: response.data.token,
    };
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Invalid email or password.",
    };
  }
}
