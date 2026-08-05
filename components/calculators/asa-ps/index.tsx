"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";

type Grade = "I" | "II" | "III" | "IV" | "V" | "VI";

const grades: {
  grade: Grade;
  title: string;
  description: string;
  color: string;
}[] = [
  {
    grade: "I",
    title: "ASA I",
    description: "Здоровый пациент без системных заболеваний.",
    color: "border-emerald-300 bg-emerald-50",
  },
  {
    grade: "II",
    title: "ASA II",
    description:
      "Лёгкое системное заболевание без существенных функциональных ограничений (например, компенсированная АГ, курение, ожирение без других нарушений).",
    color: "border-emerald-300 bg-emerald-50",
  },
  {
    grade: "III",
    title: "ASA III",
    description:
      "Тяжёлое системное заболевание с существенным функциональным ограничением (например, плохо контролируемый СД, ХБП на диализе, ИМ давностью >3 месяцев).",
    color: "border-amber-300 bg-amber-50",
  },
  {
    grade: "IV",
    title: "ASA IV",
    description:
      "Тяжёлое системное заболевание, представляющее постоянную угрозу для жизни (например, недавний ИМ, тяжёлая сердечная недостаточность, сепсис).",
    color: "border-orange-300 bg-orange-50",
  },
  {
    grade: "V",
    title: "ASA V",
    description:
      "Умирающий пациент, не ожидается выживание без операции (например, разрыв аневризмы аорты с нестабильной гемодинамикой).",
    color: "border-red-400 bg-red-100",
  },
  {
    grade: "VI",
    title: "ASA VI",
    description: "Констатирована смерть мозга, органы изымаются для донорства.",
    color: "border-gray-400 bg-gray-100",
  },
];

export default function AsaPsCalculator() {
  const [selected, setSelected] = useState<Grade>("I");
  const [emergency, setEmergency] = useState(false);

  const current = grades.find((g) => g.grade === selected)!;

  return (
    <div className="mx-auto max-w-4xl space-y-10">

      <CalculatorHeader calculatorId="asa-ps" />

      <div className="space-y-4">

        {grades.map((g) => (
          <button
            key={g.grade}
            type="button"
            onClick={() => setSelected(g.grade)}
            className={`w-full rounded-2xl border p-6 text-left transition ${
              selected === g.grade
                ? `${g.color} ring-2 ring-blue-500`
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
          >
            <div className="text-lg font-bold">{g.title}</div>
            <p className="mt-1 text-gray-600">{g.description}</p>
          </button>
        ))}

      </div>

      <label className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-5">
        <input
          type="checkbox"
          checked={emergency}
          onChange={() => setEmergency(!emergency)}
          className="h-5 w-5"
        />
        <span className="font-medium text-zinc-700">
          Экстренная операция (добавляет суффикс «E»)
        </span>
      </label>

      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
        <div className="text-sm font-medium text-blue-700">Класс физического статуса</div>
        <div className="mt-1 text-2xl font-bold text-blue-900">
          {current.title}
          {emergency ? "E" : ""}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Используется анестезиологами для предоперационной оценки общего
        физического состояния пациента и коррелирует с периоперационным
        риском. Суффикс «E» указывает на экстренный характер операции.
        Источник: American Society of Anesthesiologists (ASA Physical
        Status Classification System).
      </div>

    </div>
  );
}
