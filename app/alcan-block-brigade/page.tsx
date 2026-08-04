import type { Metadata } from "next";
import AlcanBlockBrigade from "./AlcanBlockBrigade";

export const metadata: Metadata = {
  title: "Alcan Crowd Clash | Teo Is The Winner!",
  description:
    "Grow your crew, choose the best equation gates, defeat the red crowd, and protect the home wall.",
};

export default function AlcanBlockBrigadePage() {
  return <AlcanBlockBrigade />;
}
