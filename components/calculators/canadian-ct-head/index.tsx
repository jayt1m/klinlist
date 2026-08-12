"use client";

import { useState } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";

function Row({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button type="button" onClick={onChange}
      className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition ${checked ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300"}`}>
      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${checked ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300"}`}>{checked ? "✓" : ""}</div>
      <span className="font-medium text-gray-800">{label}</span>
    </button>
  );
}

export default function CanadianCtHeadCalculator() {
  const [gcs15, setGcs15] = useState(false);
  const [fracture, setFracture] = useState(false);
  const [basalFracture, setBasalFracture] = useState(false);
  const [vomiting, setVomiting] = useState(false);
  const [age65, setAge65] = useState(false);
  const [amnesia, setAmnesia] = useState(false);
  const [dangerous, setDangerous] = useState(false);

  const highRisk = gcs15 || fracture || basalFracture || vomiting || age65;
  const mediumRisk = !highRisk && (amnesia || dangerous);

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <CalculatorHeader calculatorId="canadian-ct-head" />

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-2 text-xl font-bold">Высокий риск (нейрохирургическое вмешательство)</h2>
        <p className="mb-6 text-sm text-gray-500">Наличие любого пункта — показание к КТ</p>
        <div className="space-y-4">
          <Row label="ШКГ <15 через 2 часа после травмы" checked={gcs15} onChange={() => setGcs15(!gcs15)} />
          <Row label="Подозрение на открытый/вдавленный перелом черепа" checked={fracture} onChange={() => setFracture(!fracture)} />
          <Row label="Признаки перелома основания черепа" checked={basalFracture} onChange={() => setBasalFracture(!basalFracture)} />
          <Row label="Рвота ≥2 эпизодов" checked={vomiting} onChange={() => setVomiting(!vomiting)} />
          <Row label="Возраст ≥65 лет" checked={age65} onChange={() => setAge65(!age65)} />
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-2 text-xl font-bold">Средний риск (повреждение на КТ)</h2>
        <div className="space-y-4">
          <Row label="Амнезия на события до травмы ≥30 минут" checked={amnesia} onChange={() => setAmnesia(!amnesia)} />
          <Row label="Опасный механизм травмы" checked={dangerous} onChange={() => setDangerous(!dangerous)} />
        </div>
      </div>

      <div className={`rounded-3xl border p-8 ${highRisk || mediumRisk ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
        <div className="mb-3 flex items-center gap-3">
          {highRisk || mediumRisk ? <CircleAlert className="h-7 w-7 text-amber-600" /> : <CircleCheck className="h-7 w-7 text-emerald-600" />}
          <h3 className="text-xl font-bold">{highRisk ? "Показана КТ (высокий риск)" : mediumRisk ? "Показана КТ (средний риск)" : "КТ не требуется"}</h3>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Применяется у пациентов ≥16 лет с лёгкой ЧМТ (ШКГ 13–15) при потере сознания, амнезии или дезориентации. Не применяется на фоне антикоагулянтной/антиагрегантной терапии, коагулопатии, беременности — эти состояния обычно требуют КТ независимо от правила.
        <p className="mt-3 text-xs text-gray-500">Источник: Stiell IG, et al. Lancet. 2001;357(9266):1391-1396.</p>
      </div>
    </div>
  );
}
