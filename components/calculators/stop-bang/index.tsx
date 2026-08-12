"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import ResultCard from "@/components/ui/ResultCard";

export default function StopBangCalculator() {
  const [snoring, setSnoring] = useState(false);
  const [tired, setTired] = useState(false);
  const [observed, setObserved] = useState(false);
  const [pressure, setPressure] = useState(false);
  const [bmi, setBmi] = useState(false);
  const [age, setAge] = useState(false);
  const [neck, setNeck] = useState(false);
  const [gender, setGender] = useState(false);

  const score = [snoring, tired, observed, pressure, bmi, age, neck, gender].filter(Boolean).length;
  const category = score <= 2 ? "low" : score <= 4 ? "intermediate" : "high";
  const color = category === "low" ? "green" : category === "intermediate" ? "yellow" : "red";
  const label = category === "low" ? "Низкий риск СОАС" : category === "intermediate" ? "Промежуточный риск СОАС" : "Высокий риск СОАС";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="stop-bang" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-4">
          <CheckboxCard title="Храп (S)" description="Громкий храп, слышимый через закрытую дверь" points={1} checked={snoring} onChange={() => setSnoring(!snoring)} />
          <CheckboxCard title="Усталость (T)" description="Частая дневная усталость/сонливость" points={1} checked={tired} onChange={() => setTired(!tired)} />
          <CheckboxCard title="Наблюдаемые остановки дыхания (O)" description="Кем-либо во сне" points={1} checked={observed} onChange={() => setObserved(!observed)} />
          <CheckboxCard title="Артериальная гипертензия (P)" points={1} checked={pressure} onChange={() => setPressure(!pressure)} />
          <CheckboxCard title="ИМТ >35 кг/м² (B)" points={1} checked={bmi} onChange={() => setBmi(!bmi)} />
          <CheckboxCard title="Возраст >50 лет (A)" points={1} checked={age} onChange={() => setAge(!age)} />
          <CheckboxCard title="Окружность шеи >40 см (N)" points={1} checked={neck} onChange={() => setNeck(!neck)} />
          <CheckboxCard title="Мужской пол (G)" points={1} checked={gender} onChange={() => setGender(!gender)} />
        </div>

        <ResultCard score={score} unit="из 8" title="STOP-BANG" recommendation={label} color={color} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Скрининг риска синдрома обструктивного апноэ сна (СОАС), в том числе перед плановой операцией. При высоком риске рассмотреть полисомнографию и дополнительные меры предосторожности при анестезии.
        <p className="mt-3 text-xs text-gray-500">Источник: Chung F, et al. Anesthesiology. 2008;108(5):812-821.</p>
      </div>
    </div>
  );
}
