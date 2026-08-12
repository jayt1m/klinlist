"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function RockallCalculator() {
  const [age, setAge] = useState("0");
  const [shock, setShock] = useState("0");
  const [comorbidity, setComorbidity] = useState("0");
  const [diagnosis, setDiagnosis] = useState("0");
  const [stigmata, setStigmata] = useState("0");

  const score = Number(age) + Number(shock) + Number(comorbidity) + Number(diagnosis) + Number(stigmata);
  const color = score <= 2 ? "green" : score <= 4 ? "yellow" : "red";
  const label = score <= 2 ? "Низкий риск" : score <= 4 ? "Промежуточный риск" : "Высокий риск";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="rockall" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          <RadioCard label="Возраст" value={age} onChange={setAge}
            options={[{ value: "0", label: "<60 лет" }, { value: "1", label: "60–79 лет" }, { value: "2", label: "≥80 лет" }]} />
          <RadioCard label="Шок" value={shock} onChange={setShock}
            options={[{ value: "0", label: "Нет (САД ≥100, ЧСС <100)" }, { value: "1", label: "Тахикардия (ЧСС ≥100, САД ≥100)" }, { value: "2", label: "Гипотензия (САД <100)" }]} />
          <RadioCard label="Сопутствующая патология" value={comorbidity} onChange={setComorbidity}
            options={[{ value: "0", label: "Нет значимой" }, { value: "2", label: "СН, ИБС, другая значимая патология" }, { value: "3", label: "Почечная/печёночная недостаточность, метастазы" }]} />
          <RadioCard label="Эндоскопический диагноз" value={diagnosis} onChange={setDiagnosis}
            options={[{ value: "0", label: "Синдром Мэллори-Вейсса / без источника" }, { value: "1", label: "Все прочие диагнозы" }, { value: "2", label: "Злокачественное новообразование ЖКТ" }]} />
          <RadioCard label="Стигматы недавнего кровотечения" value={stigmata} onChange={setStigmata}
            options={[{ value: "0", label: "Нет / тёмное пятно" }, { value: "2", label: "Кровь, фиксированный тромб, видимый/пульсирующий сосуд" }]} columns={2} />
        </div>

        <ResultCard score={score} unit="из 11" title="Полная шкала Rockall" recommendation={label} color={color} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Полная (постэндоскопическая) шкала прогнозирует летальность и риск рецидива кровотечения при кровотечении из верхних отделов ЖКТ. Балл ≤2 ассоциирован с очень низким риском и позволяет рассматривать раннюю выписку.
        <p className="mt-3 text-xs text-gray-500">Источник: Rockall TA, et al. Gut. 1996;38(3):316-321.</p>
      </div>
    </div>
  );
}
