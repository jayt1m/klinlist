"use client";
import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function MorseCalculator() {
  const [history, setHistory] = useState("0");
  const [diagnosis, setDiagnosis] = useState("0");
  const [aid, setAid] = useState("0");
  const [iv, setIv] = useState("0");
  const [gait, setGait] = useState("0");
  const [mental, setMental] = useState("0");

  const score = Number(history) + Number(diagnosis) + Number(aid) + Number(iv) + Number(gait) + Number(mental);
  const category = score <= 24 ? "low" : score <= 44 ? "mid" : "high";
  const color = category === "low" ? "green" : category === "mid" ? "yellow" : "red";
  const label = category === "low" ? "Низкий риск падений" : category === "mid" ? "Средний риск падений" : "Высокий риск падений";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="morse" />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          <RadioCard label="Падения в анамнезе (за последние 3 месяца)" value={history} onChange={setHistory} columns={2}
            options={[{ value: "0", label: "Нет" }, { value: "25", label: "Да" }]} />
          <RadioCard label="Сопутствующий диагноз (более одного)" value={diagnosis} onChange={setDiagnosis} columns={2}
            options={[{ value: "0", label: "Нет" }, { value: "15", label: "Да" }]} />
          <RadioCard label="Вспомогательные средства передвижения" value={aid} onChange={setAid}
            options={[{ value: "0", label: "Нет / постельный режим / помощь медсестры" }, { value: "15", label: "Костыли, трость, ходунки" }, { value: "30", label: "Опирается на мебель" }]} columns={1} />
          <RadioCard label="Внутривенный доступ / гепариновый замок" value={iv} onChange={setIv} columns={2}
            options={[{ value: "0", label: "Нет" }, { value: "20", label: "Да" }]} />
          <RadioCard label="Походка" value={gait} onChange={setGait}
            options={[{ value: "0", label: "Нормальная / постельный режим / кресло-коляска" }, { value: "10", label: "Слабая" }, { value: "20", label: "Нарушенная" }]} columns={1} />
          <RadioCard label="Оценка собственных возможностей" value={mental} onChange={setMental}
            options={[{ value: "0", label: "Адекватно оценивает свои возможности" }, { value: "15", label: "Переоценивает / забывает об ограничениях" }]} columns={1} />
        </div>
        <ResultCard score={score} unit="из 125" title="Шкала Морсе" recommendation={label} color={color} />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Оценка риска падений у госпитализированных пациентов. Используется для назначения профилактических мер: при высоком риске — размещение ближе к посту, противоскользящая обувь, сопровождение при перемещениях, оценка принимаемых препаратов (седативные, гипотензивные, диуретики).</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Morse JM, et al. Can J Aging. 1989;8(4):366-377.</p>
      </div>
    </div>
  );
}
