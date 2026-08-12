"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function FourTsCalculator() {
  const [thrombocytopenia, setThrombocytopenia] = useState("0");
  const [timing, setTiming] = useState("0");
  const [thrombosis, setThrombosis] = useState("0");
  const [otherCauses, setOtherCauses] = useState("0");

  const score = Number(thrombocytopenia) + Number(timing) + Number(thrombosis) + Number(otherCauses);
  const category = score <= 3 ? "low" : score <= 5 ? "mid" : "high";
  const color = category === "low" ? "green" : category === "mid" ? "yellow" : "red";
  const label = category === "low" ? "Низкая вероятность ГИТ" : category === "mid" ? "Промежуточная вероятность ГИТ" : "Высокая вероятность ГИТ";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="4ts" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          <RadioCard label="Тромбоцитопения (степень падения)" value={thrombocytopenia} onChange={setThrombocytopenia} columns={1}
            options={[
              { value: "2", label: "Падение >50% и надир ≥20×10⁹/л" },
              { value: "1", label: "Падение 30–50% или надир 10–19×10⁹/л" },
              { value: "0", label: "Падение <30% или надир <10×10⁹/л" },
            ]} />

          <RadioCard label="Сроки падения тромбоцитов" value={timing} onChange={setTiming} columns={1}
            options={[
              { value: "2", label: "Чёткое начало на 5–10 сутки, либо падение ≤1 сут при контакте с гепарином за последние 30 дней" },
              { value: "1", label: "Вероятно 5–10 сутки, но данные неполные; либо начало после 10 суток; либо ≤1 сут при контакте 30–100 дней назад" },
              { value: "0", label: "Падение <4 суток без недавнего контакта с гепарином" },
            ]} />

          <RadioCard label="Тромбоз или другие проявления" value={thrombosis} onChange={setThrombosis} columns={1}
            options={[
              { value: "2", label: "Новый тромбоз, некроз кожи, острая системная реакция на в/в гепарин" },
              { value: "1", label: "Прогрессирующий/рецидивирующий тромбоз, эритематозные очаги, подозрение на тромбоз" },
              { value: "0", label: "Нет" },
            ]} />

          <RadioCard label="Другие причины тромбоцитопении" value={otherCauses} onChange={setOtherCauses} columns={1}
            options={[
              { value: "2", label: "Нет очевидных" },
              { value: "1", label: "Возможны" },
              { value: "0", label: "Точно есть другая причина" },
            ]} />
        </div>

        <ResultCard score={score} unit="из 8" title="Шкала 4Ts" recommendation={label} color={color} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Оценка претестовой вероятности гепарин-индуцированной тромбоцитопении (ГИТ) до получения результатов лабораторных тестов на антитела. Высокая вероятность — основание для немедленной отмены гепарина и перехода на альтернативный антикоагулянт до подтверждения диагноза.
        <p className="mt-3 text-xs text-gray-500">Источник: Lo GK, et al. J Thromb Haemost. 2006;4(4):759-765.</p>
      </div>
    </div>
  );
}
