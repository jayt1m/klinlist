import {
  ShieldAlert,
  HeartPulse,
  Stethoscope,
  Syringe,
  Brain,
  Activity,
} from "lucide-react";

import CheckboxCard from "@/components/ui/CheckboxCard";
import MedicalInfoCard from "@/components/ui/MedicalInfoCard";

import { medicalData } from "./medicalData";
import { CHA2DS2VASCData } from "./types";

type Props = {
  data: CHA2DS2VASCData;
  toggle: (field: keyof CHA2DS2VASCData) => void;
};

export default function RiskFactorsSection({
  data,
  toggle,
}: Props) {
  return (
    <section className="space-y-8">

      <div className="flex items-center gap-3">
        <ShieldAlert className="h-7 w-7 text-amber-600" />

        <h2 className="text-2xl font-bold">
          Факторы риска
        </h2>
      </div>

      {/* ХСН */}

      <div className="flex items-start gap-4">

        <HeartPulse className="mt-2 h-6 w-6 shrink-0 text-red-600" />

        <div className="flex-1">

          <CheckboxCard
            title="Хроническая сердечная недостаточность"
            description="Клинически подтверждённая ХСН и/или сниженная систолическая функция ЛЖ (ФВ ЛЖ ≤40%)"
            points={1}
            checked={data.heartFailure}
            onChange={() => toggle("heartFailure")}
          />

          <MedicalInfoCard {...medicalData.heartFailure} />

        </div>

      </div>

      {/* АГ */}

      <div className="flex items-start gap-4">

        <Stethoscope className="mt-2 h-6 w-6 shrink-0 text-blue-600" />

        <div className="flex-1">

          <CheckboxCard
            title="Артериальная гипертензия"
            description="Ранее диагностированная артериальная гипертензия независимо от текущего уровня артериального давления"
            points={1}
            checked={data.hypertension}
            onChange={() => toggle("hypertension")}
          />

          <MedicalInfoCard {...medicalData.hypertension} />

        </div>

      </div>

      {/* Сахарный диабет */}

      <div className="flex items-start gap-4">

        <Syringe className="mt-2 h-6 w-6 shrink-0 text-emerald-600" />

        <div className="flex-1">

          <CheckboxCard
            title="Сахарный диабет"
            description="Сахарный диабет любого типа независимо от проводимой терапии"
            points={1}
            checked={data.diabetes}
            onChange={() => toggle("diabetes")}
          />

          <MedicalInfoCard {...medicalData.diabetes} />

        </div>

      </div>

      {/* Инсульт */}

      <div className="flex items-start gap-4">

        <Brain className="mt-2 h-6 w-6 shrink-0 text-violet-600" />

        <div className="flex-1">

          <CheckboxCard
            title="Инсульт / ТИА / системная тромбоэмболия"
            description="Перенесённый ишемический инсульт, ТИА или системная тромбоэмболия"
            points={2}
            checked={data.stroke}
            onChange={() => toggle("stroke")}
          />

          <MedicalInfoCard {...medicalData.stroke} />

        </div>

      </div>

      {/* Сосудистые заболевания */}

      <div className="flex items-start gap-4">

        <Activity className="mt-2 h-6 w-6 shrink-0 text-orange-600" />

        <div className="flex-1">

          <CheckboxCard
            title="Сосудистое заболевание"
            description="Перенесённый инфаркт миокарда, заболевание периферических артерий или атеросклеротическое поражение аорты"
            points={1}
            checked={data.vascularDisease}
            onChange={() => toggle("vascularDisease")}
          />

          <MedicalInfoCard {...medicalData.vascularDisease} />

        </div>

      </div>

    </section>
  );
}