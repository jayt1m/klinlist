"use client";

import { useState } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";

function Row({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button type="button" onClick={onChange}
      className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition ${checked ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-blue-300"}`}>
      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${checked ? "border-red-500 bg-red-500 text-white" : "border-gray-300"}`}>{checked ? "✓" : ""}</div>
      <span className="font-medium text-gray-800">{label}</span>
    </button>
  );
}

export default function NexusCalculator() {
  const [tenderness, setTenderness] = useState(false);
  const [intoxication, setIntoxication] = useState(false);
  const [alteredConsciousness, setAlteredConsciousness] = useState(false);
  const [deficit, setDeficit] = useState(false);
  const [distracting, setDistracting] = useState(false);

  const anyPositive = tenderness || intoxication || alteredConsciousness || deficit || distracting;

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <CalculatorHeader calculatorId="nexus" />

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">Критерии NEXUS</h2>
        <div className="space-y-4">
          <Row label="Болезненность по средней линии шейного отдела позвоночника" checked={tenderness} onChange={() => setTenderness(!tenderness)} />
          <Row label="Признаки интоксикации" checked={intoxication} onChange={() => setIntoxication(!intoxication)} />
          <Row label="Изменённый уровень сознания" checked={alteredConsciousness} onChange={() => setAlteredConsciousness(!alteredConsciousness)} />
          <Row label="Очаговый неврологический дефицит" checked={deficit} onChange={() => setDeficit(!deficit)} />
          <Row label="Отвлекающее болезненное повреждение" checked={distracting} onChange={() => setDistracting(!distracting)} />
        </div>
      </div>

      <div className={`rounded-3xl border p-8 ${anyPositive ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
        <div className="mb-3 flex items-center gap-3">
          {anyPositive ? <CircleAlert className="h-7 w-7 text-amber-600" /> : <CircleCheck className="h-7 w-7 text-emerald-600" />}
          <h3 className="text-xl font-bold">{anyPositive ? "Критерии не соблюдены — визуализация показана" : "Все критерии отрицательны — клинически значимая травма шейного отдела маловероятна"}</h3>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Позволяет исключить визуализацию шейного отдела позвоночника при тупой травме, если отсутствуют все 5 критериев. Не применяется у пациентов с проникающей травмой шеи.
        <p className="mt-3 text-xs text-gray-500">Источник: Hoffman JR, et al. N Engl J Med. 2000;343(2):94-99.</p>
      </div>
    </div>
  );
}
