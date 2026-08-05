"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import ResultCard from "@/components/ui/ResultCard";

export default function QSOFACalculator() {
  const [rr, setRr] = useState(false);
  const [mentation, setMentation] = useState(false);
  const [sbp, setSbp] = useState(false);

  const score = Number(rr) + Number(mentation) + Number(sbp);
  const highRisk = score >= 2;

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="qsofa" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">Критерии</h2>

          <div className="space-y-4">

            <CheckboxCard title="ЧДД ≥22 в минуту" points={1} checked={rr} onChange={() => setRr(!rr)} />
            <CheckboxCard title="Нарушение сознания" description="Оценка по ШКГ <15" points={1} checked={mentation} onChange={() => setMentation(!mentation)} />
            <CheckboxCard title="Систолическое АД ≤100 мм рт.ст." points={1} checked={sbp} onChange={() => setSbp(!sbp)} />

          </div>

        </div>

        <ResultCard
          score={score}
          unit="из 3"
          title="qSOFA"
          recommendation={
            highRisk
              ? "≥2 баллов — повышенный риск неблагоприятного исхода"
              : "<2 баллов — низкий риск по qSOFA"
          }
          color={highRisk ? "red" : "green"}
        />

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          Экспресс-шкала для быстрой прикроватной оценки вероятности
          неблагоприятного исхода при подозрении на сепсис вне ОРИТ.
          qSOFA обладает высокой специфичностью, но низкой
          чувствительностью: отрицательный результат (0–1 балл) НЕ
          исключает сепсис и не должен использоваться как единственный
          критерий отказа от дальнейшего обследования. При
          клиническом подозрении на инфекцию обследование (лактат,
          посевы, полная шкала SOFA в условиях стационара) проводится
          независимо от балла qSOFA.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Singer M, et al. JAMA. 2016;315(8):801-810.
        </p>
      </div>

    </div>
  );
}
