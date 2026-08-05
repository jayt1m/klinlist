import { User, CalendarDays, Info } from "lucide-react";

import RadioCard from "@/components/ui/RadioCard";
import { CHA2DS2VASCData } from "./types";

type Props = {
  data: CHA2DS2VASCData;
  setData: React.Dispatch<React.SetStateAction<CHA2DS2VASCData>>;
};

type AgeGroup = "under65" | "65-74" | "75+";

function getAgeGroup(data: CHA2DS2VASCData): AgeGroup {
  if (data.age75) return "75+";
  if (data.age6574) return "65-74";
  return "under65";
}

export default function PatientSection({
  data,
  setData,
}: Props) {
  return (
    <section className="space-y-10">

      {/* Пол */}
      <div>

        <div className="mb-5 flex items-center gap-3">

          <User className="h-7 w-7 text-blue-600" />

          <h2 className="text-2xl font-bold">
            Пациент
          </h2>

        </div>

        <RadioCard
          value={data.sex}
          onChange={(value) =>
            setData({
              ...data,
              sex: value as "male" | "female",
            })
          }
          columns={2}
          options={[
            {
              value: "male",
              label: "Мужской пол",
            },
            {
              value: "female",
              label: "Женский пол",
            },
          ]}
        />

        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

          <div className="flex items-start gap-3">

            <Info className="mt-1 h-5 w-5 shrink-0 text-blue-600" />

            <div className="text-sm leading-6 text-blue-900">

              <strong>Важно.</strong>

              <br />

              Женский пол сам по себе не является самостоятельным фактором риска
              инсульта и не служит показанием к назначению пероральных
              антикоагулянтов.

              Балл учитывается только при наличии дополнительных факторов риска.

            </div>

          </div>

        </div>

      </div>

      {/* Возраст */}
      <div>

        <div className="mb-5 flex items-center gap-3">

          <CalendarDays className="h-7 w-7 text-blue-600" />

          <h2 className="text-2xl font-bold">
            Возраст
          </h2>

        </div>

        <RadioCard
          value={getAgeGroup(data)}
          onChange={(value) => {
            const ageGroup = value as AgeGroup;

            setData({
              ...data,
              age75: ageGroup === "75+",
              age6574: ageGroup === "65-74",
            });
          }}
          columns={3}
          options={[
            {
              value: "under65",
              label: "До 65 лет",
              description: "Баллы не начисляются",
            },
            {
              value: "65-74",
              label: "65–74 года",
              description: "1 балл",
            },
            {
              value: "75+",
              label: "75 лет и старше",
              description: "2 балла",
            },
          ]}
        />

      </div>

    </section>
  );
}