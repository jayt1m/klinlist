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

export default function OttawaKneeCalculator() {
  const [age55, setAge55] = useState(false);
  const [patella, setPatella] = useState(false);
  const [fibula, setFibula] = useState(false);
  const [flexion, setFlexion] = useState(false);
  const [weightBearing, setWeightBearing] = useState(false);

  const anyPositive = age55 || patella || fibula || flexion || weightBearing;

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <CalculatorHeader calculatorId="ottawa-knee" />
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">Критерии</h2>
        <div className="space-y-4">
          <Row label="Возраст ≥55 лет" checked={age55} onChange={() => setAge55(!age55)} />
          <Row label="Изолированная болезненность надколенника" checked={patella} onChange={() => setPatella(!patella)} />
          <Row label="Болезненность головки малоберцовой кости" checked={fibula} onChange={() => setFibula(!fibula)} />
          <Row label="Невозможность согнуть колено до 90°" checked={flexion} onChange={() => setFlexion(!flexion)} />
          <Row label="Неспособность сделать 4 шага сразу после травмы и на осмотре" checked={weightBearing} onChange={() => setWeightBearing(!weightBearing)} />
        </div>
      </div>
      <div className={`rounded-3xl border p-8 ${anyPositive ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
        <div className="mb-3 flex items-center gap-3">
          {anyPositive ? <CircleAlert className="h-7 w-7 text-amber-600" /> : <CircleCheck className="h-7 w-7 text-emerald-600" />}
          <h3 className="text-xl font-bold">{anyPositive ? "Показана рентгенография коленного сустава" : "Рентгенография не показана — клинически значимый перелом маловероятен"}</h3>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Правило применяется при острой травме колена для решения вопроса о необходимости рентгенографии. Чувствительность близка к 100% для клинически значимых переломов. Не применяется у детей младше 18 лет, при повторном обращении по поводу той же травмы, при изменённом сознании или нарушенной чувствительности конечности.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Stiell IG, et al. Ann Emerg Med. 1995;26(4):405-413.</p>
      </div>
    </div>
  );
}
