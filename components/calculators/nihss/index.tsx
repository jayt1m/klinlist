"use client";
import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

const items = [
  { key: "loc", label: "1a. Уровень сознания", options: [
    { value: "0", label: "Ясное" }, { value: "1", label: "Оглушение" }, { value: "2", label: "Сопор" }, { value: "3", label: "Кома" }] },
  { key: "locQuestions", label: "1b. Ответы на вопросы (месяц, возраст)", options: [
    { value: "0", label: "Оба верно" }, { value: "1", label: "Один верно" }, { value: "2", label: "Оба неверно" }] },
  { key: "locCommands", label: "1c. Выполнение команд (закрыть глаза, сжать кисть)", options: [
    { value: "0", label: "Обе верно" }, { value: "1", label: "Одну верно" }, { value: "2", label: "Ни одной" }] },
  { key: "gaze", label: "2. Движения глазных яблок", options: [
    { value: "0", label: "Норма" }, { value: "1", label: "Частичный парез взора" }, { value: "2", label: "Форсированная девиация" }] },
  { key: "visual", label: "3. Поля зрения", options: [
    { value: "0", label: "Норма" }, { value: "1", label: "Частичная гемианопсия" }, { value: "2", label: "Полная гемианопсия" }, { value: "3", label: "Двусторонняя слепота" }] },
  { key: "facial", label: "4. Парез лицевой мускулатуры", options: [
    { value: "0", label: "Нет" }, { value: "1", label: "Лёгкий" }, { value: "2", label: "Умеренный" }, { value: "3", label: "Полный паралич" }] },
  { key: "armLeft", label: "5a. Движения в левой руке", options: [
    { value: "0", label: "Удерживает 10 сек" }, { value: "1", label: "Опускается" }, { value: "2", label: "Не преодолевает тяжесть" }, { value: "3", label: "Нет активных движений" }, { value: "4", label: "Полный паралич" }] },
  { key: "armRight", label: "5b. Движения в правой руке", options: [
    { value: "0", label: "Удерживает 10 сек" }, { value: "1", label: "Опускается" }, { value: "2", label: "Не преодолевает тяжесть" }, { value: "3", label: "Нет активных движений" }, { value: "4", label: "Полный паралич" }] },
  { key: "legLeft", label: "6a. Движения в левой ноге", options: [
    { value: "0", label: "Удерживает 5 сек" }, { value: "1", label: "Опускается" }, { value: "2", label: "Не преодолевает тяжесть" }, { value: "3", label: "Нет активных движений" }, { value: "4", label: "Полный паралич" }] },
  { key: "legRight", label: "6b. Движения в правой ноге", options: [
    { value: "0", label: "Удерживает 5 сек" }, { value: "1", label: "Опускается" }, { value: "2", label: "Не преодолевает тяжесть" }, { value: "3", label: "Нет активных движений" }, { value: "4", label: "Полный паралич" }] },
  { key: "ataxia", label: "7. Атаксия конечностей", options: [
    { value: "0", label: "Нет" }, { value: "1", label: "В одной конечности" }, { value: "2", label: "В двух конечностях" }] },
  { key: "sensory", label: "8. Чувствительность", options: [
    { value: "0", label: "Норма" }, { value: "1", label: "Лёгкое снижение" }, { value: "2", label: "Выраженное снижение" }] },
  { key: "language", label: "9. Афазия", options: [
    { value: "0", label: "Нет" }, { value: "1", label: "Лёгкая/умеренная" }, { value: "2", label: "Выраженная" }, { value: "3", label: "Тотальная афазия/мутизм" }] },
  { key: "dysarthria", label: "10. Дизартрия", options: [
    { value: "0", label: "Норма" }, { value: "1", label: "Лёгкая/умеренная" }, { value: "2", label: "Выраженная/анартрия" }] },
  { key: "neglect", label: "11. Игнорирование (неглект)", options: [
    { value: "0", label: "Нет" }, { value: "1", label: "По одной модальности" }, { value: "2", label: "По двум модальностям" }] },
];

export default function NihssCalculator() {
  const [values, setValues] = useState<Record<string, string>>(Object.fromEntries(items.map((i) => [i.key, "0"])));
  const score = Object.values(values).reduce((s, v) => s + Number(v), 0);

  const category = score === 0 ? "none" : score <= 4 ? "minor" : score <= 15 ? "moderate" : score <= 20 ? "modsevere" : "severe";
  const color = category === "none" || category === "minor" ? "green" : category === "moderate" ? "yellow" : "red";
  const label = { none: "Нет симптомов инсульта", minor: "Лёгкий инсульт", moderate: "Инсульт средней тяжести", modsevere: "Тяжёлый инсульт", severe: "Крайне тяжёлый инсульт" }[category];

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="nihss" />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          {items.map((item) => (
            <RadioCard key={item.key} label={item.label} value={values[item.key]} options={item.options} columns={1}
              onChange={(v) => setValues((p) => ({ ...p, [item.key]: v }))} />
          ))}
        </div>
        <ResultCard score={score} unit="из 42" title="NIHSS" recommendation={label} color={color} />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Шкала инсульта Национальных институтов здоровья США — стандартизированная оценка неврологического дефицита при остром инсульте. Применяется для оценки тяжести, отбора на реперфузионную терапию и контроля динамики. Требует обучения для корректного применения; здесь приведена сокращённая формулировка пунктов — оценку следует проводить по полной официальной инструкции.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Brott T, et al. Stroke. 1989;20(7):864-870.</p>
      </div>
    </div>
  );
}
