import { CircleAlert } from "lucide-react";

import { LipidUnit } from "./types";


type Props = {
  ldl: number | null;
  unit: LipidUnit;
};


export default function Result({
  ldl,
  unit,
}: Props) {

  const unitLabel = unit === "mmol" ? "ммоль/л" : "мг/дл";


  if (ldl === null) {

    return (

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">

        <div className="mb-3 flex items-center gap-2">

          <CircleAlert className="h-5 w-5 text-amber-600" />

          <h3 className="font-semibold text-amber-900">
            Формула Фридвальда неприменима
          </h3>

        </div>

        <p className="leading-7 text-amber-900">
          При уровне триглицеридов ≥400 мг/дл (≈4.5 ммоль/л)
          расчёт ЛПНП по формуле Фридвальда даёт существенную
          погрешность. Необходимо прямое лабораторное измерение
          ЛПНП.
        </p>

      </div>

    );

  }


  return (

    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">

      <div className="border-b border-zinc-200 px-6 py-5">

        <h2 className="text-lg font-semibold">
          Результат
        </h2>

      </div>

      <div className="space-y-6 p-6">

        <div className="rounded-2xl bg-blue-50 p-6 text-blue-900">

          <div className="text-sm font-medium opacity-80">
            ЛПНП (по формуле Фридвальда)
          </div>

          <div className="mt-2 text-4xl font-bold">
            {ldl}
            <span className="ml-2 text-lg font-normal opacity-80">
              {unitLabel}
            </span>
          </div>

        </div>

        <div className="rounded-xl border border-zinc-200 p-5 text-sm leading-6 text-gray-600">
          Целевой уровень ЛПНП зависит от категории
          сердечно-сосудистого риска пациента (например, по
          шкале SCORE2) и определяется действующими
          рекомендациями ESC/EAS по дислипидемиям, а не единым
          порогом для всех пациентов.
        </div>

      </div>

    </div>

  );
}
