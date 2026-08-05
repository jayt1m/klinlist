"use client";

import {
  getBMICategory,
  getBMICategoryColor,
  getBMICategoryLabel,
} from "./utils";


type Props = {
  bmi: number;
};


const ranges: {
  category: ReturnType<typeof getBMICategory>;
  range: string;
}[] = [
  { category: "underweight", range: "<18.5" },
  { category: "normal", range: "18.5–24.9" },
  { category: "overweight", range: "25.0–29.9" },
  { category: "obesity1", range: "30.0–34.9" },
  { category: "obesity2", range: "35.0–39.9" },
  { category: "obesity3", range: "≥40.0" },
];


export default function Result({
  bmi,
}: Props) {

  const category = getBMICategory(bmi);
  const color = getBMICategoryColor(category);
  const label = getBMICategoryLabel(category);

  const colorClasses: Record<string, string> = {
    green: "bg-emerald-50 text-emerald-700",
    yellow: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
  };


  return (

    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">

      <div className="border-b border-zinc-200 px-6 py-5">

        <h2 className="text-lg font-semibold">
          Результат
        </h2>

      </div>

      <div className="space-y-6 p-6">

        <div className={`rounded-2xl p-6 ${colorClasses[color]}`}>

          <div className="text-4xl font-bold">
            {bmi}
          </div>

          <div className="mt-2 font-medium">
            {label}
          </div>

        </div>

        <div className="rounded-xl border border-zinc-200 p-5">

          <div className="mb-4 font-semibold">
            Классификация ВОЗ
          </div>

          <div className="space-y-2">

            {ranges.map((item) => (

              <div
                key={item.category}
                className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                  item.category === category
                    ? colorClasses[
                        getBMICategoryColor(item.category)
                      ]
                    : "bg-zinc-100"
                }`}
              >

                <span className="font-semibold">
                  {getBMICategoryLabel(item.category)}
                </span>

                <span>
                  {item.range}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );
}
