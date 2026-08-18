"use client";
import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function NortonCalculator() {
  const [physical, setPhysical] = useState("4");
  const [mental, setMental] = useState("4");
  const [activity, setActivity] = useState("4");
  const [mobility, setMobility] = useState("4");
  const [incontinence, setIncontinence] = useState("4");

  const score = Number(physical) + Number(mental) + Number(activity) + Number(mobility) + Number(incontinence);
  const category = score <= 12 ? "high" : score <= 14 ? "mid" : "low";
  const color = category === "low" ? "green" : category === "mid" ? "yellow" : "red";
  const label = category === "low" ? "Низкий риск пролежней" : category === "mid" ? "Риск развития пролежней" : "Высокий риск пролежней";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="norton" />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          <RadioCard label="Общее физическое состояние" value={physical} onChange={setPhysical} columns={2}
            options={[{ value: "4", label: "Хорошее" }, { value: "3", label: "Удовлетворительное" }, { value: "2", label: "Плохое" }, { value: "1", label: "Очень плохое" }]} />
          <RadioCard label="Психическое состояние" value={mental} onChange={setMental} columns={2}
            options={[{ value: "4", label: "Ясное сознание" }, { value: "3", label: "Апатия" }, { value: "2", label: "Спутанность" }, { value: "1", label: "Ступор" }]} />
          <RadioCard label="Активность" value={activity} onChange={setActivity} columns={2}
            options={[{ value: "4", label: "Ходит самостоятельно" }, { value: "3", label: "Ходит с помощью" }, { value: "2", label: "Кресло-коляска" }, { value: "1", label: "Постельный режим" }]} />
          <RadioCard label="Подвижность" value={mobility} onChange={setMobility} columns={2}
            options={[{ value: "4", label: "Полная" }, { value: "3", label: "Слегка ограничена" }, { value: "2", label: "Значительно ограничена" }, { value: "1", label: "Неподвижен" }]} />
          <RadioCard label="Недержание" value={incontinence} onChange={setIncontinence} columns={2}
            options={[{ value: "4", label: "Нет" }, { value: "3", label: "Иногда" }, { value: "2", label: "Обычно мочи" }, { value: "1", label: "Мочи и кала" }]} />
        </div>
        <ResultCard score={score} unit="из 20" title="Шкала Нортон" recommendation={label} color={color} />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Оценка риска развития пролежней. Балл ≤14 указывает на риск, ≤12 — на высокий риск. При выявленном риске показаны противопролежневые мероприятия: смена положения каждые 2 часа, противопролежневый матрас, уход за кожей, контроль питания и белкового статуса, оценка состояния кожи не реже раза в сутки.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Norton D, McLaren R, Exton-Smith AN. An Investigation of Geriatric Nursing Problems in Hospital. London, 1962.</p>
      </div>
    </div>
  );
}
