import {
  BadgeCheck,
  CheckCircle2,
  CircleAlert,
  CircleX,
  ShieldAlert,
  Wrench,
} from "lucide-react";

import ResultCard from "@/components/ui/ResultCard";

import { HASBLEDData } from "./types";
import { Recommendation } from "./recommendations";
import { getExplanation } from "./explanation";


type Props = {
  recommendation: Recommendation;
  data: HASBLEDData;
};


export default function Result({
  recommendation,
  data,
}: Props) {


  const explanation = getExplanation(data);


  const color =
    recommendation.risk === "low"
      ? "green"
      : recommendation.risk === "intermediate"
      ? "yellow"
      : "red";



  let annualRisk = "";
  let riskDescription = "";


  if (recommendation.score <= 1) {

    annualRisk = "Низкий риск";
    riskDescription =
      "Обычно соответствует низкой вероятности больших кровотечений.";

  } else if (recommendation.score === 2) {

    annualRisk = "Умеренный риск";
    riskDescription =
      "Требуется оценка и коррекция модифицируемых факторов риска.";

  } else {

    annualRisk = "Высокий риск";
    riskDescription =
      "Необходимо активное управление факторами риска кровотечения.";

  }



  return (

    <div className="space-y-8">


      <ResultCard
        score={recommendation.score}
        title={recommendation.title}
        recommendation={recommendation.recommendation}
        color={color}
      />



      <div className="
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-8
        shadow-sm
      ">



        <div className="mb-6 flex items-center gap-3">

          <BadgeCheck className="h-7 w-7 text-blue-600" />

          <h2 className="text-2xl font-bold">
            Клиническое заключение
          </h2>

        </div>




        <div className="
          rounded-2xl
          border
          border-gray-100
          bg-gray-50
          p-6
        ">

          <div className="flex items-center gap-3">

            <ShieldAlert className="h-6 w-6 text-red-600" />

            <h3 className="text-lg font-semibold">
              HAS-BLED: {recommendation.score} балл
            </h3>

          </div>


          <p className="mt-3 font-medium">
            {annualRisk}
          </p>


          <p className="mt-2 text-gray-700">
            {riskDescription}
          </p>


        </div>





        <p className="
          mt-6
          leading-7
          text-gray-700
        ">

          {recommendation.text}

        </p>





        <div className="
          mt-8
          rounded-2xl
          border
          border-amber-200
          bg-amber-50
          p-6
        ">


          <div className="mb-3 flex items-center gap-2">


            <CircleAlert className="h-5 w-5 text-amber-600" />


            <h3 className="font-semibold">
              Важно
            </h3>


          </div>



          <p className="leading-7 text-amber-900">

            Высокий балл HAS-BLED не является
            противопоказанием к назначению
            антикоагулянтной терапии.

            Он указывает на необходимость
            коррекции модифицируемых факторов
            риска и более тщательного наблюдения.

          </p>


        </div>






        <div className="mt-8">


          <div className="mb-3 flex items-center gap-2">


            <CheckCircle2 className="h-5 w-5 text-green-600" />


            <h3 className="font-semibold">
              Причины начисления баллов
            </h3>


          </div>




          {
            explanation.length === 0 ? (

              <div className="flex gap-2 text-gray-500">

                <CircleX className="h-5 w-5" />

                Факторы риска отсутствуют.

              </div>


            ) : (


              <ul className="space-y-3">


                {explanation.map((item) => (

                  <li
                    key={item}
                    className="flex gap-2"
                  >

                    <CheckCircle2
                      className="h-5 w-5 text-green-600"
                    />

                    {item}

                  </li>

                ))}


              </ul>


            )
          }


        </div>






        <div className="
          mt-8
          rounded-2xl
          border
          border-blue-100
          bg-blue-50
          p-6
        ">


          <div className="mb-3 flex items-center gap-2">


            <Wrench className="h-5 w-5 text-blue-700" />


            <h3 className="font-semibold">
              Коррекция факторов риска
            </h3>


          </div>



          <ul className="
            list-disc
            space-y-2
            pl-6
            text-blue-900
          ">


            <li>
              Контроль артериального давления.
            </li>


            <li>
              Исключение необоснованного применения НПВС.
            </li>


            <li>
              Оценка необходимости сочетания антикоагулянтов
              и антиагрегантов.
            </li>


            <li>
              Контроль МНО при терапии варфарином.
            </li>


            <li>
              Ограничение употребления алкоголя.
            </li>


          </ul>


        </div>



      </div>


    </div>

  );
}