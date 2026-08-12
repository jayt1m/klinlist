"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

const scale = [
  { value: "0", label: "0" }, { value: "1", label: "1" }, { value: "2", label: "2" },
  { value: "3", label: "3" }, { value: "4", label: "4" }, { value: "5", label: "5" },
];

const items = [
  { key: "cough", left: "Я никогда не кашляю", right: "Я постоянно кашляю" },
  { key: "phlegm", left: "У меня совсем нет мокроты в грудной клетке", right: "Мокрота полностью заполняет грудную клетку" },
  { key: "chest", left: "Нет ощущения стеснения в груди", right: "Сильное ощущение стеснения в груди" },
  { key: "breath", left: "Нет одышки при подъёме по лестнице/в гору", right: "Сильная одышка" },
  { key: "activity", left: "Нет ограничений в домашних делах", right: "Значительные ограничения" },
  { key: "confidence", left: "Уверенно выхожу из дома", right: "Совсем не уверен из-за болезни" },
  { key: "sleep", left: "Сплю крепко", right: "Не сплю крепко из-за болезни" },
  { key: "energy", left: "У меня много энергии", right: "У меня совсем нет энергии" },
];

export default function CatCopdCalculator() {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(items.map((i) => [i.key, "0"]))
  );

  const score = Object.values(values).reduce((sum, v) => sum + Number(v), 0);
  const category = score < 10 ? "low" : score < 20 ? "mid" : score < 30 ? "high" : "veryhigh";
  const color = category === "low" ? "green" : category === "mid" ? "yellow" : "red";
  const label = { low: "Низкое влияние на жизнь", mid: "Среднее влияние", high: "Высокое влияние", veryhigh: "Очень высокое влияние" }[category];

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="cat-copd" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          {items.map((item) => (
            <div key={item.key}>
              <div className="mb-2 flex justify-between text-sm text-gray-600">
                <span>{item.left}</span>
                <span>{item.right}</span>
              </div>
              <RadioCard value={values[item.key]} onChange={(v) => setValues((p) => ({ ...p, [item.key]: v }))} columns={4} options={scale} />
            </div>
          ))}
        </div>

        <ResultCard score={score} unit="из 40" title="CAT (COPD Assessment Test)" recommendation={label} color={color} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Опросник для оценки влияния ХОБЛ на повседневную жизнь пациента, используется для мониторинга и в комплексной оценке при выборе терапии (наряду со спирометрией и частотой обострений).
        <p className="mt-3 text-xs text-gray-500">Источник: Jones PW, et al. Eur Respir J. 2009;34(3):648-654.</p>
      </div>
    </div>
  );
}
