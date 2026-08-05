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
    <main className="mx-auto max-w-7xl px-8 py-16">
      <h1 className="text-5xl font-bold">
        Медицинские калькуляторы
      </h1>

      <p className="mt-4 text-xl text-gray-500">
        Выберите необходимый клинический калькулятор.
      </p>

      <Suspense fallback={null}>
        <CalculatorsListClient />
      </Suspense>
    </main>
  );
}
