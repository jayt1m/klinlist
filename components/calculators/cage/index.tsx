"use client";
import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import ResultCard from "@/components/ui/ResultCard";

export default function CageCalculator() {
  const [cut, setCut] = useState(false);
  const [annoyed, setAnnoyed] = useState(false);
  const [guilty, setGuilty] = useState(false);
  const [eyeOpener, setEyeOpener] = useState(false);

  const score = [cut, annoyed, guilty, eyeOpener].filter(Boolean).length;
  const positive = score >= 2;

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="cage" />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-4">
          <CheckboxCard title="Возникало ли у вас ощущение, что следует сократить употребление спиртного?" description="C — Cut down" points={1} checked={cut} onChange={() => setCut(!cut)} />
          <CheckboxCard title="Вызывало ли у вас раздражение, если кто-то критиковал ваше употребление спиртного?" description="A — Annoyed" points={1} checked={annoyed} onChange={() => setAnnoyed(!annoyed)} />
          <CheckboxCard title="Испытывали ли вы чувство вины из-за употребления спиртного?" description="G — Guilty" points={1} checked={guilty} onChange={() => setGuilty(!guilty)} />
          <CheckboxCard title="Употребляли ли вы спиртное утром, чтобы взбодриться или снять похмелье?" description="E — Eye-opener" points={1} checked={eyeOpener} onChange={() => setEyeOpener(!eyeOpener)} />
        </div>
        <ResultCard score={score} unit="из 4" title="CAGE" color={positive ? "red" : "green"}
          recommendation={positive ? "Положительный скрининг — высока вероятность проблемного употребления алкоголя" : "Отрицательный скрининг"} />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Краткий скрининговый опросник для выявления проблемного употребления алкоголя. Порог ≥2 положительных ответа. Хорошо выявляет зависимость, но менее чувствителен к рискованному употреблению без зависимости — для этого больше подходит AUDIT-C. Положительный результат — повод для развёрнутой оценки, а не диагноз.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Ewing JA. JAMA. 1984;252(14):1905-1907.</p>
      </div>
    </div>
  );
}
