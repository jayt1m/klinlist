"use client";

import { Star } from "lucide-react";

import { useFavorites } from "@/lib/useFavorites";

type Props = {
  calculatorId: string;
  size?: "sm" | "lg";
};

export default function FavoriteButton({ calculatorId, size = "sm" }: Props) {
  const { isFavorite, toggleFavorite, hydrated } = useFavorites();

  const active = hydrated && isFavorite(calculatorId);

  const dimensions = size === "lg" ? "h-11 w-11" : "h-9 w-9";
  const iconSize = size === "lg" ? "h-5 w-5" : "h-4 w-4";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(calculatorId);
      }}
      aria-label={active ? "Убрать из избранного" : "Добавить в избранное"}
      aria-pressed={active}
      className={`flex ${dimensions} shrink-0 items-center justify-center rounded-full border transition ${
        active
          ? "border-amber-300 bg-amber-50 text-amber-500"
          : "border-gray-200 bg-white text-gray-300 hover:border-amber-200 hover:text-amber-400"
      }`}
    >
      <Star className={iconSize} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
