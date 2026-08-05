"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function GCSCalculator() {
  const [eye, setEye] = useState("4");
  const [verbal, setVerbal] = useState("5");
  const [motor, setMotor] = useState("6");

  const score = Number(eye) + Number(verbal) + Number(motor);

  const severity =
    score <= 8 ? "Тяжёлая ЧМТ / кома" : score <= 12 ? "ЧМТ средней тяжести" : "Лёгкая ЧМТ";

  const color = score <= 8 ? "red" : score <= 12 ? "yellow" : "green";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="gcs" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">

          <RadioCard
            label="Открывание глаз"
            value={eye}
            onChange={setEye}
            options={[
              { value: "4", label: "Спонтанное — 4" },
              { value: "3", label: "На речь — 3" },
              { value: "2", label: "На боль — 2" },
              { value: "1", label: "Отсутствует — 1" },
            ]}
            columns={2}
          />

          <RadioCard
            label="Речевая реакция"
            value={verbal}
            onChange={setVerbal}
            options={[
              { value: "5", label: "Ориентированная речь — 5" },
              { value: "4", label: "Спутанная речь — 4" },
              { value: "3", label: "Отдельные слова — 3" },
              { value: "2", label: "Нечленораздельные звуки — 2" },
              { value: "1", label: "Отсутствует — 1" },
            ]}
          />

          <RadioCard
            label="Двигательная реакция"
            value={motor}
            onChange={setMotor}
            options={[
              { value: "6", label: "Выполняет команды — 6" },
              { value: "5", label: "Локализует боль — 5" },
              { value: "4", label: "Отдёргивание на боль — 4" },
              { value: "3", label: "Патологическое сгибание — 3" },
              { value: "2", label: "Патологическое разгибание — 2" },
              { value: "1", label: "Отсутствует — 1" },
            ]}
          />

        </div>

        <ResultCard
          score={score}
          unit="из 15"
          title="Шкала комы Глазго"
          recommendation={severity}
          color={color}
        />

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          При невозможности оценить речевую реакцию (интубация,
          трахеостома) традиционно указывается пометка «Т», а сумма
          баллов приводится с оговоркой на неполную оценку. Важно
          фиксировать баллы по каждой из трёх подшкал отдельно, а не
          только сумму — это позволяет заметить асимметрию
          (например, изолированное нарушение речи при сохранной
          двигательной реакции) и точнее отслеживать динамику в
          повторных осмотрах. Оценка ≤8 баллов традиционно
          используется как порог для рассмотрения вопроса о защите
          дыхательных путей.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Teasdale G, Jennett B. Lancet.
          1974;304(7872):81-84.
        </p>
      </div>

    </div>
  );
}
