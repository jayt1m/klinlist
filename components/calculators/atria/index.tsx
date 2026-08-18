"use client";
import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import ResultCard from "@/components/ui/ResultCard";

export default function AtriaCalculator() {
  const [anemia, setAnemia] = useState(false);
  const [renal, setRenal] = useState(false);
  const [age75, setAge75] = useState(false);
  const [priorBleed, setPriorBleed] = useState(false);
  const [htn, setHtn] = useState(false);

  const score = Number(anemia) * 3 + Number(renal) * 3 + Number(age75) * 2 + Number(priorBleed) + Number(htn);
  const category = score < 4 ? "low" : score === 4 ? "mid" : "high";
  const color = category === "low" ? "green" : category === "mid" ? "yellow" : "red";
  const rate = category === "low" ? "<1%" : category === "mid" ? "2.6%" : "5.8%";
  const label = category === "low" ? "Низкий риск" : category === "mid" ? "Промежуточный риск" : "Высокий риск";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="atria" />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-4">
          <CheckboxCard title="Анемия" description="Гемоглобин <130 г/л у мужчин, <120 г/л у женщин" points={3} checked={anemia} onChange={() => setAnemia(!anemia)} />
          <CheckboxCard title="Тяжёлое заболевание почек" description="СКФ <30 мл/мин или диализ" points={3} checked={renal} onChange={() => setRenal(!renal)} />
          <CheckboxCard title="Возраст ≥75 лет" points={2} checked={age75} onChange={() => setAge75(!age75)} />
          <CheckboxCard title="Кровотечение в анамнезе" points={1} checked={priorBleed} onChange={() => setPriorBleed(!priorBleed)} />
          <CheckboxCard title="Артериальная гипертензия" points={1} checked={htn} onChange={() => setHtn(!htn)} />
        </div>
        <ResultCard score={score} unit="из 10" title="ATRIA" recommendation={`${label} — частота крупных кровотечений ${rate} в год`} color={color} />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Оценка риска крупного кровотечения у пациентов с фибрилляцией предсердий на антикоагулянтной терапии. В сравнительных исследованиях шкала HAS-BLED показала несколько лучшую прогностическую точность, поэтому ATRIA обычно используется как дополнение, а не замена.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Fang MC, et al. J Am Coll Cardiol. 2011;58(4):395-401.</p>
      </div>
    </div>
  );
}
