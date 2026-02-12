import OffersScreen from "@/Features/Home/Screens/offers.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Offers | FreshCart",
  description:
    "Save big on fresh produce and daily essentials with our exclusive deals.",
};

export default function OffersPage() {
  return <OffersScreen />;
}
