"use client";
import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

const items = [
  { key: "feeding", label: "Приём пищи", options: [{ value: "0", label: "Не способен" }, { value: "5", label: "Нужна помощь" }, { value: "10", label: "Независим" }] },
  { key: "bathing", label: "Купание", options: [{ value: "0", label: "Зависим" }, { value: "5", label: "Независим" }] },
  { key: "grooming", label: "Личная гигиена", options: [{ value: "0", label: "Нужна помощь" }, { value: "5", label: "Независим" }] },
  { key: "dressing", label: "Одевание", options: [{ value: "0", label: "Зависим" }, { value: "5", label: "Нужна помощь" }, { value: "10", label: "Независим" }] },
  { key: "bowels", label: "Контроль дефекации", options: [{ value: "0", label: "Недержание" }, { value: "5", label: "Периодические эпизоды" }, { value: "10", label: "Контролирует" }] },
  { key: "bladder", label: "Контроль мочеиспускания", options: [{ value: "0", label: "Недержание/катетер" }, { value: "5", label: "Периодические эпизоды" }, { value: "10", label: "Контролирует" }] },
  { key: "toilet", label: "Пользование туалетом", options: [{ value: "0", label: "Зависим" }, { value: "5", label: "Нужна помощь" }, { value: "10", label: "Независим" }] },
  { key: "transfer", label: "Перемещение (кровать-кресло)", options: [{ value: "0", label: "Не способен" }, { value: "5", label: "Значительная помощь" }, { value: "10", label: "Небольшая помощь" }, { value: "15", label: "Независим" }] },
  { key: "mobility", label: "Передвижение по ровной поверхности", options: [{ value: "0", label: "Не передвигается" }, { value: "5", label: "Независим в кресле-коляске" }, { value: "10", label: "Ходит с помощью" }, { value: "15", label: "Ходит самостоятельно" }] },
  { key: "stairs", label: "Подъём по лестнице", options: [{ value: "0", label: "Не способен" }, { value: "5", label: "Нужна помощь" }, { value: "10", label: "Независим" }] },
];

export default function BarthelCalculator() {
  const [values, setValues] = useState<Record<string, string>>(Object.fromEntries(items.map((i) => [i.key, "0"])));
  const score = Object.values(values).reduce((s, v) => s + Number(v), 0);
  const category = score >= 100 ? "full" : score >= 91 ? "mild" : score >= 61 ? "moderate" : score >= 21 ? "severe" : "total";
  const color = category === "full" || category === "mild" ? "green" : category === "moderate" ? "yellow" : "red";
  const label = { full: "Полная независимость", mild: "Лёгкая зависимость", moderate: "Умеренная зависимость", severe: "Выраженная зависимость", total: "Полная зависимость" }[category];

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="barthel" />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          {items.map((item) => (
            <RadioCard key={item.key} label={item.label} value={values[item.key]} options={item.options} columns={2}
              onChange={(v) => setValues((p) => ({ ...p, [item.key]: v }))} />
          ))}
        </div>
        <ResultCard score={score} unit="из 100" title="Индекс Бартел" recommendation={label} color={color} />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Оценка независимости в повседневной жизни (activities of daily living) — широко применяется в реабилитации после инсульта и у пожилых пациентов для оценки динамики и планирования ухода. Оценивается то, что пациент действительно делает, а не то, что мог бы сделать теоретически.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Mahoney FI, Barthel DW. Md State Med J. 1965;14:61-65.</p>
      </div>
    </div>
  );
}
