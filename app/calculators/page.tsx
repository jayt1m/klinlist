import { Suspense } from "react";

import CalculatorsListClient from "@/components/calculators-list/CalculatorsListClient";

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
