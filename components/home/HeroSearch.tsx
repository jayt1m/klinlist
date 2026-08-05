"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { calculators } from "@/data/calculators";


export default function HeroSearch() {

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo(() => {

    const q = query.trim().toLowerCase();

    if (q === "") {
      return [];
    }

    return calculators
      .filter(
        (calc) =>
          calc.title.toLowerCase().includes(q) ||
          calc.description.toLowerCase().includes(q) ||
          calc.specialty.toLowerCase().includes(q)
      )
      .slice(0, 6);

  }, [query]);

  const showDropdown =
    isFocused && query.trim() !== "";


  return (

    <div className="relative mt-12 w-full max-w-3xl">

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() =>
          setTimeout(() => setIsFocused(false), 150)
        }
        placeholder="🔍 Найти калькулятор..."
        className="w-full rounded-2xl border border-gray-200 bg-white px-7 py-5 text-lg shadow-xl outline-none transition focus:border-blue-500"
      />

      {showDropdown && (

        <div className="absolute left-0 right-0 top-full z-20 mt-3 overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-2xl">

          {results.length === 0 ? (

            <div className="px-6 py-5 text-gray-500">
              Ничего не найдено по запросу «{query}».
            </div>

          ) : (

            <>

              {results.map((calc) => (

                <Link
                  key={calc.id}
                  href={`/calculators/${calc.id}`}
                  className="flex items-center justify-between border-b border-gray-100 px-6 py-4 transition last:border-0 hover:bg-blue-50"
                >

                  <div>

                    <div className="font-semibold">
                      {calc.title}
                    </div>

                    <div className="text-sm text-gray-500">
                      {calc.description}
                    </div>

                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {calc.specialty}
                  </span>

                </Link>

              ))}

              <Link
                href={`/calculators?q=${encodeURIComponent(query)}`}
                className="block px-6 py-4 text-center font-semibold text-blue-600 hover:bg-blue-50"
              >
                Показать все результаты →
              </Link>

            </>

          )}

        </div>

      )}

    </div>

  );
}
