"use client";

import { useState } from "react";
import { getCalculatorInfo } from "@/lib/getCalculatorInfo";
import CalculatorHeader from "@/components/ui/CalculatorHeader";

import Info from "./Info";
import PatientSection from "./PatientSection";
import RiskFactorsSection from "./RiskFactorsSection";
import Result from "./Result";

import { CHA2DS2VASCData } from "./types";
import { getRecommendation } from "./recommendations";


const initialData: CHA2DS2VASCData = {
  sex: "male",

  heartFailure: false,
  hypertension: false,
  age75: false,
  age6574: false,
  diabetes: false,
  stroke: false,
  vascularDisease: false,
};



export default function CHA2DS2VASC() {


  const [data, setData] =
    useState<CHA2DS2VASCData>(initialData);



  function toggle(
    field: keyof CHA2DS2VASCData
  ) {

    if (field === "sex") return;


    setData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));

  }



  function resetCalculator() {

    setData(initialData);

  }



  const recommendation =
    getRecommendation(data);
const calculatorInfo =
    getCalculatorInfo("cha2ds2-vasc");


  return (

    <div className="mx-auto max-w-7xl space-y-10">


      <CalculatorHeader
  calculatorId="cha2ds2-vasc"
/>



      <Info />



      <div className="
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-8
        shadow-sm
      ">


        <PatientSection

          data={data}

          setData={setData}

        />



        <hr className="my-10" />



        <RiskFactorsSection

          data={data}

          toggle={toggle}

        />


      </div>




      <div className="flex justify-end">


        <button

          onClick={resetCalculator}

          className="
            rounded-xl
            border
            border-gray-300
            px-6
            py-3
            font-medium
            transition
            hover:bg-gray-100
          "

        >

          Сбросить

        </button>


      </div>





      <Result

        recommendation={recommendation}

        data={data}

      />



    </div>

  );

}