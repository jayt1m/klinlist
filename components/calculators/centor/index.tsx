"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function CentorCalculator() {
  const [exudate, setExudate] = useState(false);
  const [lymphadenopathy, setLymphadenopathy] = useState(false);
  const [fever, setFever] = useState(false);
  const [noCough, setNoCough] = useState(false);
  const [ageGroup, setAgeGroup] = useState("0");

  const score =
    Number(exudate) +
    Number(lymphadenopathy) +
    Number(fever) +
    Number(noCough) +
    Number(ageGroup);

  const category = score <= 1 ? "low" : score <= 3 ? "moderate" : "high";
  const color = category === "low" ? "green" : category === "moderate" ? "yellow" : "red";
  const label =
    category === "low"
      ? "Низкая вероятность — тестирование и антибиотики не показаны"
      : category === "moderate"
        ? "Умеренная вероятность — экспресс-тест на БГСА / посев"
        : "Высокая вероятность — рассмотреть эмпирическую антибиотикотерапию";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="centor" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">

          <div className="space-y-4">
            <CheckboxCard title="Налёт на миндалинах" points={1} checked={exudate} onChange={() => setExudate(!exudate)} />
            <CheckboxCard title="Болезненные передние шейные лимфоузлы" points={1} checked={lymphadenopathy} onChange={() => setLymphadenopathy(!lymphadenopathy)} />
            <CheckboxCard title="Температура >38°C в анамнезе" points={1} checked={fever} onChange={() => setFever(!fever)} />
            <CheckboxCard title="Отсутствие кашля" points={1} checked={noCough} onChange={() => setNoCough(!noCough)} />
          </div>

          <RadioCard
            label="Возраст (модификация McIsaac)"
            value={ageGroup}
            onChange={setAgeGroup}
            options={[
              { value: "1", label: "3–14 лет (+1)" },
              { value: "0", label: "15–44 года (0)" },
              { value: "-1", label: "≥45 лет (−1)" },
            ]}
          />

        </div>

        <ResultCard
          score={score}
          unit="баллов"
          title="Centor / McIsaac"
          recommendation={label}
          color={color}
        />

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          Большинство фарингитов вирусные, и шкала используется
          именно для того, чтобы ограничить необоснованное назначение
          антибиотиков: при низком балле в антибиотиках и
          тестировании нет необходимости даже при выраженных
          жалобах. При умеренном балле экспресс-тест на антиген БГСА
          или посев из зева точнее клинической оценки и предпочтителен
          перед эмпирическим назначением антибиотика.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: McIsaac WJ, et al. CMAJ. 1998;158(1):75-83.
        </p>
      </div>

    </div>
  );
}
