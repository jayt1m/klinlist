"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import MedicalInfoCard from "@/components/ui/MedicalInfoCard";
import Result from "./Result";

import { HASBLEDData } from "./types";
import { getRecommendation } from "./recommendations";
import { medicalData } from "./medicalData";


const initialData: HASBLEDData = {

  hypertension: false,

  renal: false,

  liver: false,

  stroke: false,

  bleeding: false,

  labileINR: false,

  elderly: false,

  drugs: false,

  alcohol: false,

};


export default function HASBLED() {

  const [data, setData] =
    useState<HASBLEDData>(initialData);


  const recommendation =
    getRecommendation(data);


  function toggle(
    field: keyof HASBLEDData
  ) {

    setData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));

  }



  function resetCalculator() {

    setData(initialData);

  }



  return (

    <div className="mx-auto max-w-7xl space-y-10">


      <CalculatorHeader
  calculatorId="has-bled"
/>



      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div>

          <div className="
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-8
            shadow-sm
          ">


            <h2 className="mb-8 text-3xl font-bold">
              Факторы риска
            </h2>



            <div className="space-y-8">



              <div>

                <CheckboxCard

                  title="Артериальная гипертензия"

                  description="Неконтролируемое АД, обычно САД >160 мм рт.ст."

                  points={1}

                  checked={data.hypertension}

                  onChange={() =>
                    toggle("hypertension")
                  }

                />


                <MedicalInfoCard
                  {...medicalData.hypertension}
                />


              </div>




              <div>

                <CheckboxCard

                  title="Нарушение функции почек"

                  description="Диализ, трансплантация почки или креатинин ≥200 мкмоль/л"

                  points={1}

                  checked={data.renal}

                  onChange={() =>
                    toggle("renal")
                  }

                />


                <MedicalInfoCard
                  {...medicalData.renal}
                />

              </div>




              <div>

                <CheckboxCard

                  title="Нарушение функции печени"

                  description="Цирроз или выраженные нарушения печёночных показателей"

                  points={1}

                  checked={data.liver}

                  onChange={() =>
                    toggle("liver")
                  }

                />


                <MedicalInfoCard
                  {...medicalData.liver}
                />

              </div>




              <div>

                <CheckboxCard

                  title="Инсульт в анамнезе"

                  description="Перенесённый инсульт или ТИА"

                  points={1}

                  checked={data.stroke}

                  onChange={() =>
                    toggle("stroke")
                  }

                />


                <MedicalInfoCard
                  {...medicalData.stroke}
                />

              </div>




              <div>

                <CheckboxCard

                  title="Кровотечение в анамнезе"

                  description="Большое кровотечение или предрасположенность"

                  points={1}

                  checked={data.bleeding}

                  onChange={() =>
                    toggle("bleeding")
                  }

                />


                <MedicalInfoCard
                  {...medicalData.bleeding}
                />

              </div>




              <div>

                <CheckboxCard

                  title="Лабильное МНО"

                  description="Плохой контроль терапии варфарином"

                  points={1}

                  checked={data.labileINR}

                  onChange={() =>
                    toggle("labileINR")
                  }

                />


                <MedicalInfoCard
                  {...medicalData.labileINR}
                />

              </div>




              <div>

                <CheckboxCard

                  title="Возраст >65 лет"

                  description="Пожилой возраст"

                  points={1}

                  checked={data.elderly}

                  onChange={() =>
                    toggle("elderly")
                  }

                />


                <MedicalInfoCard
                  {...medicalData.elderly}
                />

              </div>




              <div>

                <CheckboxCard

                  title="Лекарственные препараты"

                  description="Антиагреганты или НПВС"

                  points={1}

                  checked={data.drugs}

                  onChange={() =>
                    toggle("drugs")
                  }

                />


                <MedicalInfoCard
                  {...medicalData.drugs}
                />

              </div>




              <div>

                <CheckboxCard

                  title="Алкоголь"

                  description="Злоупотребление алкоголем"

                  points={1}

                  checked={data.alcohol}

                  onChange={() =>
                    toggle("alcohol")
                  }

                />


                <MedicalInfoCard
                  {...medicalData.alcohol}
                />

              </div>



            </div>



          </div>

          <div className="mt-6 flex justify-end">


            <button

              onClick={resetCalculator}

              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-gray-300
                bg-white
                px-6
                py-3
                font-medium
                transition
                hover:bg-gray-100
              "

            >

              <RotateCcw className="h-5 w-5" />

              Сбросить расчёт

            </button>


          </div>

        </div>

        <Result
          recommendation={recommendation}
          data={data}
        />

      </div>


    </div>

  );

}