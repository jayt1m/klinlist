"use client";

import Link from "next/link";
import { Star } from "lucide-react";

import { calculators } from "@/data/calculators";
import { useFavorites } from "@/lib/useFavorites";
import FavoriteButton from "@/components/ui/FavoriteButton";

export default function FavoritesPage() {
  const { favorites, hydrated } = useFavorites();

  const items = calculators.filter((calc) => favorites.includes(calc.id));

  return (
    <main className="mx-auto max-w-7xl px-8 py-16">

      <h1 className="text-5xl font-bold">Избранное</h1>

      <p className="mt-4 max-w-2xl text-xl text-gray-500">
        Калькуляторы, которые вы отметили звёздочкой. Список хранится в
        этом браузере — на другом устройстве он будет пустым.
      </p>

      {!hydrated ? null : items.length === 0 ? (

        <div className="mt-16 flex flex-col items-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 py-20 text-center">

          <Star className="h-12 w-12 text-gray-300" />

          <h2 className="mt-4 text-xl font-semibold">Пока пусто</h2>

          <p className="mt-2 max-w-sm text-gray-500">
            Откройте любой калькулятор и нажмите на звёздочку рядом с
            названием, чтобы добавить его сюда.
          </p>

          <Link
            href="/calculators"
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Перейти к калькуляторам
          </Link>

        </div>

      ) : (

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {items.map((calc) => (

            <Link
              key={calc.id}
              href={`/calculators/${calc.id}`}
              className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex items-start justify-between gap-3">
                <div className="text-2xl font-bold">{calc.title}</div>
                <FavoriteButton calculatorId={calc.id} />
              </div>

              <p className="mt-4 text-gray-500">{calc.description}</p>

              <div className="mt-6 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                {calc.specialty}
              </div>

            </Link>

          ))}

        </div>

      )}

    </main>
  );
}
