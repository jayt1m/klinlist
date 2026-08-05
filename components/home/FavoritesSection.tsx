"use client";

import Link from "next/link";
import { Star } from "lucide-react";

import { calculators } from "@/data/calculators";
import { useFavorites } from "@/lib/useFavorites";
import FavoriteButton from "@/components/ui/FavoriteButton";


export default function FavoritesSection() {

  const { favorites, hydrated } = useFavorites();

  if (!hydrated || favorites.length === 0) {
    return null;
  }

  const items = calculators.filter((calc) => favorites.includes(calc.id));

  return (
    <section className="mx-auto max-w-7xl px-8 pt-16">

      <div className="mb-6 flex items-center gap-2">
        <Star className="h-6 w-6 text-amber-400" fill="currentColor" />
        <h2 className="text-3xl font-bold">Избранное</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

        {items.map((calc) => (

          <Link
            key={calc.id}
            href={`/calculators/${calc.id}`}
            className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="text-lg font-bold">{calc.title}</div>
              <FavoriteButton calculatorId={calc.id} />
            </div>

            <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-500">
              {calc.description}
            </p>
          </Link>

        ))}

      </div>

    </section>
  );
}
