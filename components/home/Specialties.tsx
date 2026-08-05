"use client";

import { useState } from "react";
import Link from "next/link";

import { getSpecialties } from "@/data/specialties";


export default function Specialties() {

  const specialties = getSpecialties();

  const [query, setQuery] = useState("");

  const filtered = specialties.filter((item) =>
    item.name
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );


  return (
    <section className="mx-auto max-w-7xl px-8 py-20">

      <h2 className="mb-6 text-4xl font-bold">
        Специальности
      </h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Поиск специальности..."
        className="mb-10 w-full max-w-md rounded-2xl border border-gray-200 px-6 py-4 text-lg outline-none focus:border-blue-600"
      />

      {filtered.length === 0 ? (

        <p className="text-gray-500">
          Ничего не найдено.
        </p>

      ) : (

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {filtered.map((item) => (

            <Link
              key={item.name}
              href={`/calculators?specialty=${encodeURIComponent(item.name)}`}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="min-w-0 flex-1">

                <h3 className="truncate text-lg font-semibold">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.count}{" "}
                  {item.count === 1
                    ? "калькулятор"
                    : "калькуляторов"}
                </p>

              </div>

            </Link>

          ))}

        </div>

      )}

    </section>
  );
}
