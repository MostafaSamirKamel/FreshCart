import NewArrivalsScreen from "@/Features/Home/Screens/new-arrivals.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Arrivals | FreshCart",
  description:
    "Explore our latest additions of fresh organic products and seasonal favorites.",
};

export default function NewArrivalsPage() {
  return <NewArrivalsScreen />;
}
