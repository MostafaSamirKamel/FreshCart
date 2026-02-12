"use server";

import axios from "axios";

export async function signupAction(prevState: any, formData: any): Promise<{
  success: boolean;
  message: string;
  user?: any;
  token?: string;
  errors?: any;
}> {
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        rePassword: formData.rePassword,
        phone: formData.phone,
      }
    );

    return {
      success: true,
      message: response.data.message || "Account created successfully!",
      user: response.data.user,
      token: response.data.token,
    };
  } catch (error: any) {
    console.error("Signup Error:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong. Please try again.",
      errors: error.response?.data?.errors,
    };
  }
}
