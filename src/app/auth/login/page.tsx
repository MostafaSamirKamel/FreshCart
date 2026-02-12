import LoginScreen from "@/Features/Auth/Screens/login.screen";

export const metadata = {
  title: "Sign In - FreshCart",
  description:
    "Sign in to your FreshCart account to manage your grocery orders.",
};

export default function LoginPage() {
  return (
    <main>
      <LoginScreen />
    </main>
  );
}
