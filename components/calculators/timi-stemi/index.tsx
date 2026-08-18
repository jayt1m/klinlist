"use client";
import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

const mortality: Record<number, string> = {
  0: "0.8", 1: "1.6", 2: "2.2", 3: "4.4", 4: "7.3", 5: "12.4",
  6: "16.1", 7: "23.4", 8: "26.8",
};

export default function TimiStemiCalculator() {
  const [age, setAge] = useState("0");
  const [sbp, setSbp] = useState(false);
  const [hr, setHr] = useState(false);
  const [killip, setKillip] = useState(false);
  const [anteriorOrLbbb, setAnteriorOrLbbb] = useState(false);
  const [diabetesHtnAngina, setDiabetesHtnAngina] = useState(false);
  const [weight, setWeight] = useState(false);
  const [timeToTreatment, setTimeToTreatment] = useState(false);

  const score =
    Number(age) + Number(sbp) * 3 + Number(hr) * 2 + Number(killip) * 2 +
    Number(anteriorOrLbbb) + Number(diabetesHtnAngina) + Number(weight) + Number(timeToTreatment);

  const capped = Math.min(score, 8);
  const color = score <= 2 ? "green" : score <= 4 ? "yellow" : "red";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="timi-stemi" />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          <RadioCard label="Возраст" value={age} onChange={setAge}
            options={[{ value: "0", label: "<65 лет" }, { value: "2", label: "65–74 года" }, { value: "3", label: "≥75 лет" }]} />
          <div className="space-y-4">
            <CheckboxCard title="Систолическое АД <100 мм рт.ст." points={3} checked={sbp} onChange={() => setSbp(!sbp)} />
            <CheckboxCard title="ЧСС >100 в мин" points={2} checked={hr} onChange={() => setHr(!hr)} />
            <CheckboxCard title="Класс Killip II–IV" points={2} checked={killip} onChange={() => setKillip(!killip)} />
            <CheckboxCard title="Передний ИМ или блокада левой ножки пучка Гиса" points={1} checked={anteriorOrLbbb} onChange={() => setAnteriorOrLbbb(!anteriorOrLbbb)} />
            <CheckboxCard title="Сахарный диабет, артериальная гипертензия или стенокардия в анамнезе" points={1} checked={diabetesHtnAngina} onChange={() => setDiabetesHtnAngina(!diabetesHtnAngina)} />
            <CheckboxCard title="Масса тела <67 кг" points={1} checked={weight} onChange={() => setWeight(!weight)} />
            <CheckboxCard title="Время до начала лечения >4 часов" points={1} checked={timeToTreatment} onChange={() => setTimeToTreatment(!timeToTreatment)} />
          </div>
        </div>
        <ResultCard score={score} unit="из 14" title="TIMI для ИМпST" color={color}
          recommendation={`30-дневная летальность: ~${mortality[capped] ?? "36"}%`} />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Оценка риска 30-дневной летальности при инфаркте миокарда с подъёмом сегмента ST. Шкала разработана на когорте пациентов, получавших тромболитическую терапию, — при первичном ЧКВ абсолютные значения летальности ниже, но прогностическая ценность ранжирования сохраняется. Для ОКС без подъёма ST используется отдельная шкала TIMI.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Morrow DA, et al. Circulation. 2000;102(17):2031-2037.</p>
      </div>
    </div>
  );
}
