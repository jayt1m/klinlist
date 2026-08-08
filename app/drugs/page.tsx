"use client";

import { useState } from "react";
import { ExternalLink, Search } from "lucide-react";

export default function DrugsPage() {
  const [query, setQuery] = useState("");

  function openSearch(e: React.FormEvent) {
    e.preventDefault();

    const q = query.trim();
    if (!q) return;

    const url = `https://yandex.ru/search/?text=${encodeURIComponent(
      `${q} site:grls.rosminzdrav.ru`
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="mx-auto max-w-3xl px-8 py-16">

      <h1 className="text-5xl font-bold">Поиск препарата</h1>

      <p className="mt-4 text-xl text-gray-500">
        Быстрый переход к официальной карточке препарата в
        Государственном реестре лекарственных средств (ГРЛС).
      </p>

      <form onSubmit={openSearch} className="mt-10">

        <div className="flex gap-3">

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Например: Аторвастатин"
            className="flex-1 rounded-2xl border border-gray-200 px-6 py-4 text-lg outline-none focus:border-blue-600"
          />

          <button
            type="submit"
            className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            <Search className="h-5 w-5" />
            Найти
          </button>

        </div>

      </form>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm leading-6 text-gray-600">
        <p>
          Поиск открывает результаты по официальному сайту ГРЛС
          (grls.rosminzdrav.ru) в новой вкладке — там указаны
          регистрационное удостоверение, производитель и инструкция
          по медицинскому применению.
        </p>

        <p className="mt-3">
          КлинЛист не хранит и не воспроизводит данные реестра — это
          удобный переход к официальному источнику, а не собственная
          база препаратов.
        </p>

        <a
          href="https://grls.rosminzdrav.ru/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700"
        >
          Открыть ГРЛС напрямую
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

    </main>
  );
}
