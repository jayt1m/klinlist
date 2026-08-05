"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Star } from "lucide-react";

import { calculators } from "@/data/calculators";
import { getSpecialties } from "@/data/specialties";
import { useFavorites } from "@/lib/useFavorites";
import FavoriteButton from "@/components/ui/FavoriteButton";


export default function CalculatorsListClient() {

  const searchParams = useSearchParams();

  const initialSpecialty =
    searchParams.get("specialty") ?? "";

  const initialQuery =
    searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [specialty, setSpecialty] = useState(
    initialSpecialty
  );
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const specialties = getSpecialties();
  const { isFavorite, hydrated } = useFavorites();


  const filtered = useMemo(() => {

    const q = query.trim().toLowerCase();

    return calculators.filter((calc) => {

      const matchesQuery =
        q === "" ||
        calc.title.toLowerCase().includes(q) ||
        calc.description.toLowerCase().includes(q);

      const matchesSpecialty =
        specialty === "" ||
        calc.specialty === specialty;

      const matchesFavorites =
        !onlyFavorites || (hydrated && isFavorite(calc.id));

      return matchesQuery && matchesSpecialty && matchesFavorites;

    });

  }, [query, specialty, onlyFavorites, hydrated, isFavorite]);


  return (

    <>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Поиск калькулятора..."
        className="mt-10 w-full rounded-2xl border border-gray-200 px-6 py-4 text-lg outline-none focus:border-blue-600"
      />

      <div className="mt-6 flex flex-wrap gap-3">

        <button
          onClick={() => setSpecialty("")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            specialty === ""
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Все специальности
        </button>

        {specialties.map((item) => (

          <button
            key={item.name}
            onClick={() => setSpecialty(item.name)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              specialty === item.name
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {item.name}
          </button>

        ))}

        <button
          onClick={() => setOnlyFavorites((v) => !v)}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
            onlyFavorites
              ? "bg-amber-400 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Star className="h-3.5 w-3.5" fill={onlyFavorites ? "currentColor" : "none"} />
          Избранное
        </button>

      </div>

      {filtered.length === 0 ? (

        <p className="mt-12 text-lg text-gray-500">
          {onlyFavorites
            ? "Пока нет калькуляторов в избранном — нажмите на звёздочку у нужного калькулятора."
            : "Ничего не найдено. Попробуйте другой запрос."}
        </p>

      ) : (

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filtered.map((calc) => (

            <Link
              key={calc.id}
              href={`/calculators/${calc.id}`}
              className="relative rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-2xl font-bold">
                  {calc.title}
                </div>

                <FavoriteButton calculatorId={calc.id} />
              </div>

              <p className="mt-4 text-gray-500">
                {calc.description}
              </p>

              <div className="mt-6 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                {calc.specialty}
              </div>
            </Link>

          ))}

        </div>

      )}

    </>

  );
}
