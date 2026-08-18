"use client";
import { useState } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";

export default function SirsCalculator() {
  const [temp, setTemp] = useState(false);
  const [hr, setHr] = useState(false);
  const [rr, setRr] = useState(false);
  const [wbc, setWbc] = useState(false);

  const score = [temp, hr, rr, wbc].filter(Boolean).length;
  const positive = score >= 2;

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <CalculatorHeader calculatorId="sirs" />
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-4">
        <CheckboxCard title="Температура >38°C или <36°C" points={1} checked={temp} onChange={() => setTemp(!temp)} />
        <CheckboxCard title="ЧСС >90 в минуту" points={1} checked={hr} onChange={() => setHr(!hr)} />
        <CheckboxCard title="ЧДД >20 в минуту или paCO₂ <32 мм рт.ст." points={1} checked={rr} onChange={() => setRr(!rr)} />
        <CheckboxCard title="Лейкоциты >12×10⁹/л, <4×10⁹/л или >10% незрелых форм" points={1} checked={wbc} onChange={() => setWbc(!wbc)} />
      </div>
      <div className={`rounded-3xl border p-8 ${positive ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
        <div className="mb-3 flex items-center gap-3">
          {positive ? <CircleAlert className="h-7 w-7 text-amber-600" /> : <CircleCheck className="h-7 w-7 text-emerald-600" />}
          <h3 className="text-2xl font-bold">{score} из 4 критериев</h3>
        </div>
        <p className="text-gray-700">{positive ? "Критерии ССВО выполнены (≥2). При наличии подтверждённой или подозреваемой инфекции ранее это определялось как сепсис." : "Критерии ССВО не выполнены."}</p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Синдром системного воспалительного ответа. Важно: по действующим критериям Сепсис-3 (2016) диагноз сепсиса больше не основывается на ССВО — вместо этого используется нарастание SOFA на ≥2 балла при подозреваемой инфекции. Критерии ССВО сохраняют значение как чувствительный, но неспецифичный маркер системного воспаления любой природы (травма, панкреатит, ожоги, инфекция).</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Bone RC, et al. Chest. 1992;101(6):1644-1655.</p>
      </div>
    </div>
  );
}
