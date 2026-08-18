import { Suspense } from "react";
import type { Metadata } from "next";

import CalculatorsListClient from "@/components/calculators-list/CalculatorsListClient";
import { calculators } from "@/data/calculators";

export const metadata: Metadata = {
  title: "Все калькуляторы",
  description: `Полный список медицинских калькуляторов и шкал КлинЛист (${calculators.length} шт.) — поиск и фильтр по специальностям.`,
};

export default function CalculatorsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
        Медицинские калькуляторы
      </h1>

      <p className="mt-2 text-base text-gray-500 sm:mt-4 sm:text-lg lg:text-xl">
        Выберите необходимый клинический калькулятор.
      </p>

      <Suspense fallback={null}>
        <CalculatorsListClient />
      </Suspense>
    </main>
  );
}
