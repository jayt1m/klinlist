"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";

import { guidelines } from "@/data/guidelines";

export default function GuidelinesPage() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("");

  const specialties = useMemo(() => {
    const set = new Set(guidelines.map((g) => g.specialty));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return guidelines.filter((g) => {
      const matchesQuery =
        q === "" ||
        g.title.toLowerCase().includes(q) ||
        g.summary.toLowerCase().includes(q);

      const matchesSpecialty = specialty === "" || g.specialty === specialty;

      return matchesQuery && matchesSpecialty;
    });
  }, [query, specialty]);

  return (
    <main className="mx-auto max-w-7xl px-8 py-16">

      <h1 className="text-5xl font-bold">Клинические рекомендации</h1>

      <p className="mt-4 max-w-3xl text-xl text-gray-500">
        Подборка основных действующих клинических рекомендаций Минздрава
        России, на которые опираются калькуляторы сайта.
      </p>

      <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-900">
        Это не полный реестр — приведены документы, актуальные для уже
        реализованных на сайте калькуляторов. Полный и всегда актуальный
        список — в официальном рубрикаторе Минздрава.
        <a
          href="https://cr.minzdrav.gov.ru/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800"
        >
          Открыть рубрикатор
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Поиск по названию..."
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

        {specialties.map((name) => (
          <button
            key={name}
            onClick={() => setSpecialty(name)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              specialty === name
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {name}
          </button>
        ))}

      </div>

      {filtered.length === 0 ? (

        <p className="mt-12 text-lg text-gray-500">Ничего не найдено.</p>

      ) : (

        <div className="mt-12 grid gap-6 md:grid-cols-2">

          {filtered.map((g) => (

            <a
              key={g.id}
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                  {g.specialty}
                </span>

                <span className="text-sm text-gray-500">{g.approvedDate}</span>
              </div>

              <h2 className="text-xl font-bold">{g.title}</h2>

              <p className="mt-3 flex-1 text-gray-600">{g.summary}</p>

              <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                Источник: {g.sourceLabel}
                <ExternalLink className="h-3.5 w-3.5" />
              </div>

            </a>

          ))}

        </div>

      )}

    </main>
  );
}
