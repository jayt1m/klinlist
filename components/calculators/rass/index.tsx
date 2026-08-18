"use client";
import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";

const levels = [
  { v: 4, t: "Агрессивен", d: "Открыто агрессивен, представляет непосредственную опасность для персонала", c: "border-red-400 bg-red-100" },
  { v: 3, t: "Очень возбуждён", d: "Вырывает трубки и катетеры, агрессивен по отношению к персоналу", c: "border-red-300 bg-red-50" },
  { v: 2, t: "Возбуждён", d: "Частые нецеленаправленные движения, борьба с респиратором", c: "border-orange-300 bg-orange-50" },
  { v: 1, t: "Беспокоен", d: "Тревожен, движения не агрессивные", c: "border-amber-300 bg-amber-50" },
  { v: 0, t: "Бодрствует, спокоен", d: "", c: "border-emerald-300 bg-emerald-50" },
  { v: -1, t: "Сонлив", d: "Не полностью бодрствует, но поддерживает контакт глазами >10 сек на голос", c: "border-lime-300 bg-lime-50" },
  { v: -2, t: "Лёгкая седация", d: "Кратковременно просыпается на голос, контакт глазами <10 сек", c: "border-amber-300 bg-amber-50" },
  { v: -3, t: "Умеренная седация", d: "Движения или открывание глаз на голос, но без контакта глазами", c: "border-orange-300 bg-orange-50" },
  { v: -4, t: "Глубокая седация", d: "Нет реакции на голос, но есть движения или открывание глаз на физическую стимуляцию", c: "border-red-300 bg-red-50" },
  { v: -5, t: "Отсутствие пробуждения", d: "Нет реакции ни на голос, ни на физическую стимуляцию", c: "border-red-400 bg-red-100" },
];

export default function RassCalculator() {
  const [selected, setSelected] = useState(0);
  const current = levels.find((l) => l.v === selected)!;

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <CalculatorHeader calculatorId="rass" />
      <div className="space-y-3">
        {levels.map((l) => (
          <button key={l.v} type="button" onClick={() => setSelected(l.v)}
            className={`w-full rounded-2xl border p-5 text-left transition ${selected === l.v ? `${l.c} ring-2 ring-blue-500` : "border-gray-200 bg-white hover:border-blue-300"}`}>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold text-white">{l.v > 0 ? `+${l.v}` : l.v}</span>
              <span className="text-lg font-bold">{l.t}</span>
            </div>
            {l.d && <p className="mt-1 pl-13 text-sm text-gray-600">{l.d}</p>}
          </button>
        ))}
      </div>
      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
        <div className="text-sm font-medium text-blue-700">Уровень седации по RASS</div>
        <div className="mt-1 text-2xl font-bold text-blue-900">{current.v > 0 ? `+${current.v}` : current.v} — {current.t}</div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Ричмондская шкала ажитации-седации применяется для оценки глубины седации у пациентов ОРИТ. Целевой уровень для большинства пациентов на ИВЛ — от 0 до −2 (лёгкая седация): более глубокая седация ассоциирована с удлинением ИВЛ, делирием и увеличением сроков госпитализации. RASS также используется как первый шаг перед оценкой делирия по шкале CAM-ICU.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Sessler CN, et al. Am J Respir Crit Care Med. 2002;166(10):1338-1344.</p>
      </div>
    </div>
  );
}
