"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import ResultCard from "@/components/ui/ResultCard";

export default function AlvaradoCalculator() {
  const [migration, setMigration] = useState(false);
  const [anorexia, setAnorexia] = useState(false);
  const [nausea, setNausea] = useState(false);
  const [tenderness, setTenderness] = useState(false);
  const [rebound, setRebound] = useState(false);
  const [fever, setFever] = useState(false);
  const [leukocytosis, setLeukocytosis] = useState(false);
  const [leftShift, setLeftShift] = useState(false);

  const score =
    Number(migration) + Number(anorexia) + Number(nausea) +
    Number(tenderness) * 2 + Number(rebound) +
    Number(fever) + Number(leukocytosis) * 2 + Number(leftShift);

  const category = score <= 4 ? "low" : score <= 6 ? "mid" : "high";
  const color = category === "low" ? "green" : category === "mid" ? "yellow" : "red";
  const label = category === "low" ? "Низкая вероятность аппендицита" : category === "mid" ? "Промежуточная — рассмотреть визуализацию" : "Высокая вероятность аппендицита";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="alvarado" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-4">
          <CheckboxCard title="Миграция боли в правую подвздошную область" points={1} checked={migration} onChange={() => setMigration(!migration)} />
          <CheckboxCard title="Анорексия" points={1} checked={anorexia} onChange={() => setAnorexia(!anorexia)} />
          <CheckboxCard title="Тошнота/рвота" points={1} checked={nausea} onChange={() => setNausea(!nausea)} />
          <CheckboxCard title="Болезненность в правой подвздошной области" points={2} checked={tenderness} onChange={() => setTenderness(!tenderness)} />
          <CheckboxCard title="Симптом Щёткина-Блюмберга (рикошетная болезненность)" points={1} checked={rebound} onChange={() => setRebound(!rebound)} />
          <CheckboxCard title="Температура ≥37.3°C" points={1} checked={fever} onChange={() => setFever(!fever)} />
          <CheckboxCard title="Лейкоцитоз >10×10⁹/л" points={2} checked={leukocytosis} onChange={() => setLeukocytosis(!leukocytosis)} />
          <CheckboxCard title="Сдвиг лейкоцитарной формулы влево (>75% нейтрофилов)" points={1} checked={leftShift} onChange={() => setLeftShift(!leftShift)} />
        </div>

        <ResultCard score={score} unit="из 10" title="Шкала Alvarado (MANTRELS)" recommendation={label} color={color} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Клиническая шкала вероятности острого аппендицита. Из-за умеренной чувствительности не рекомендуется как единственное основание для отказа от дальнейшего обследования при клиническом подозрении — используется как вспомогательный инструмент наряду с визуализацией.
        <p className="mt-3 text-xs text-gray-500">Источник: Alvarado A. Ann Emerg Med. 1986;15(5):557-564.</p>
      </div>
    </div>
  );
}
