"use client";

import {
  getCKDStage,
  getCKDStageDescription,
  getCKDStageColor,
} from "./utils";

interface Props {
  ckdEpi2009: number;
  mdrd: number;
  cockcroftGault: number;
}

export default function Result({
  ckdEpi2009,
  mdrd,
  cockcroftGault,
}: Props) {
  const stage = getCKDStage(ckdEpi2009);

  const stageColor = getCKDStageColor(stage);

  const stageDescription = getCKDStageDescription(stage);

  const stages = [
    { id: "C1", range: "≥90" },
    { id: "C2", range: "60–89" },
    { id: "C3a", range: "45–59" },
    { id: "C3b", range: "30–44" },
    { id: "C4", range: "15–29" },
    { id: "C5", range: "<15" },
  ];

  const format = (value: number) => value.toFixed(1);

  async function copyResult() {
    const text =
      `СКФ (CKD-EPI): ${format(ckdEpi2009)} мл/мин/1,73м²; ` +
      `СКФ (MDRD): ${format(mdrd)} мл/мин/1,73м²; ` +
      `клиренс креатинина (Cockcroft-Gault): ${format(cockcroftGault)} мл/мин; ` +
      `стадия ${stage} — ${stageDescription}`;

    await navigator.clipboard.writeText(text);
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">

      <div className="border-b border-zinc-200 px-6 py-5">
        <h2 className="text-lg font-semibold">Результат</h2>
      </div>

      <div className="space-y-6 p-6">

        <div className="rounded-2xl bg-blue-600 p-6 text-white">
          <div className="text-sm font-medium opacity-90">
            СКФ (CKD-EPI, 2009)
          </div>

          <div className="mt-2 text-4xl font-bold">
            {format(ckdEpi2009)}
            <span className="ml-2 text-lg font-normal opacity-90">
              мл/мин/1,73м²
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 p-5">

          <div className="mb-4 font-semibold">Стадия ХБП</div>

          <div className="space-y-2">

            {stages.map((item) => (

              <div
                key={item.id}
                className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                  item.id === stage ? stageColor : "bg-zinc-100"
                }`}
              >
                <span className="font-semibold">{item.id}</span>
                <span>{item.range}</span>
              </div>

            ))}

          </div>

          <div className="mt-5 rounded-xl bg-blue-50 p-4">
            <div className="text-lg font-semibold">{stage}</div>
            <div className="mt-2 text-sm text-zinc-700">{stageDescription}</div>
          </div>

        </div>

        <div className="rounded-xl border border-zinc-200 p-4">
          <div className="text-sm text-zinc-500">СКФ (MDRD)</div>

          <div className="mt-2 text-2xl font-bold">
            {format(mdrd)}
            <span className="ml-2 text-base font-normal text-zinc-500">
              мл/мин/1,73м²
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 p-4">
          <div className="text-sm text-zinc-500">
            Клиренс креатинина (Cockcroft-Gault)
          </div>

          <div className="mt-2 text-2xl font-bold">
            {format(cockcroftGault)}
            <span className="ml-2 text-base font-normal text-zinc-500">
              мл/мин
            </span>
          </div>

          <p className="mt-2 text-xs text-zinc-500">
            Используется в первую очередь для расчёта доз лекарственных
            препаратов — так, как это указано в большинстве инструкций.
          </p>
        </div>

        <button
          onClick={copyResult}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          📋 Копировать результат
        </button>

      </div>

    </div>
  );
}
