import RecipesScreen from "@/Features/Home/Screens/recipes.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fresh Recipes | FreshCart",
  description:
    "Delicious and healthy recipes featuring our fresh seasonal produce.",
};

export default function RecipesPage() {
  return <RecipesScreen />;
}
