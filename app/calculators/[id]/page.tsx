import type { ComponentType } from "react";
import type { Metadata } from "next";
import CHA2DS2VASC from "@/components/calculators/cha2ds2vasc";
import HASBLED from "@/components/calculators/hasbled";
import CKDEPI from "@/components/calculators/ckd-epi";
import SCORE2 from "@/components/calculators/score2";
import GRACE from "@/components/calculators/grace";
import TIMI from "@/components/calculators/timi";
import WellsPE from "@/components/calculators/wells-pe";
import QTc from "@/components/calculators/qtc";
import LDL from "@/components/calculators/ldl";
import BMI from "@/components/calculators/bmi";
import Chads2Calc from "@/components/calculators/chads2";
import HeartScoreCalc from "@/components/calculators/heart-score";
import OrbitCalc from "@/components/calculators/orbit";
import RcriCalc from "@/components/calculators/rcri";
import PaduaCalc from "@/components/calculators/padua";
import GcsCalc from "@/components/calculators/gcs";
import Abcd2Calc from "@/components/calculators/abcd2";
import HuntHessCalc from "@/components/calculators/hunt-hess";
import Curb65Calc from "@/components/calculators/curb65";
import WellsDvtCalc from "@/components/calculators/wells-dvt";
import PercCalc from "@/components/calculators/perc";
import HomaIrCalc from "@/components/calculators/homa-ir";
import Hba1cCalc from "@/components/calculators/hba1c";
import Fib4Calc from "@/components/calculators/fib4";
import ChildPughCalc from "@/components/calculators/child-pugh";
import GlasgowBlatchfordCalc from "@/components/calculators/glasgow-blatchford";
import QsofaCalc from "@/components/calculators/qsofa";
import CentorCalc from "@/components/calculators/centor";
import BsaCalc from "@/components/calculators/bsa";
import ApgarCalc from "@/components/calculators/apgar";
import KillipCalc from "@/components/calculators/killip";
import MeldNaCalc from "@/components/calculators/meld-na";
import GenevaScoreCalc from "@/components/calculators/geneva-score";
import FenaCalc from "@/components/calculators/fena";
import OttawaAnkleCalc from "@/components/calculators/ottawa-ankle";
import AsaPsCalc from "@/components/calculators/asa-ps";
import IpssCalc from "@/components/calculators/ipss";
import Phq9Calc from "@/components/calculators/phq9";
import BishopScoreCalc from "@/components/calculators/bishop-score";
import AuditCCalc from "@/components/calculators/audit-c";
import CrusadeCalc from "@/components/calculators/crusade";
import PreciseDaptCalc from "@/components/calculators/precise-dapt";
import VbgCalc from "@/components/calculators/vbg";
import { notFound } from "next/navigation";
import { getCalculator } from "@/lib/getCalculator";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const calculator = getCalculator(id);

  if (!calculator) {
    return {};
  }

  const title = `${calculator.title} — калькулятор онлайн`;
  const description = `${calculator.description}. Бесплатный онлайн-калькулятор для врачей на сайте КлинЛист.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

// Реестр калькуляторов: чтобы добавить новый калькулятор,
// достаточно импортировать его компонент и добавить одну строку сюда.
const calculatorComponents: Record<string, ComponentType> = {
  "cha2ds2-vasc": CHA2DS2VASC,
  "has-bled": HASBLED,
  "ckd-epi": CKDEPI,
  "score2": SCORE2,
  "grace": GRACE,
  "timi": TIMI,
  "wells-pe": WellsPE,
  "qtc": QTc,
  "ldl": LDL,
  "bmi": BMI,
  "chads2": Chads2Calc,
  "heart-score": HeartScoreCalc,
  "orbit": OrbitCalc,
  "rcri": RcriCalc,
  "padua": PaduaCalc,
  "gcs": GcsCalc,
  "abcd2": Abcd2Calc,
  "hunt-hess": HuntHessCalc,
  "curb65": Curb65Calc,
  "wells-dvt": WellsDvtCalc,
  "perc": PercCalc,
  "homa-ir": HomaIrCalc,
  "hba1c": Hba1cCalc,
  "fib4": Fib4Calc,
  "child-pugh": ChildPughCalc,
  "glasgow-blatchford": GlasgowBlatchfordCalc,
  "qsofa": QsofaCalc,
  "centor": CentorCalc,
  "bsa": BsaCalc,
  "apgar": ApgarCalc,
  "killip": KillipCalc,
  "meld-na": MeldNaCalc,
  "geneva-score": GenevaScoreCalc,
  "fena": FenaCalc,
  "ottawa-ankle": OttawaAnkleCalc,
  "asa-ps": AsaPsCalc,
  "ipss": IpssCalc,
  "phq9": Phq9Calc,
  "bishop-score": BishopScoreCalc,
  "audit-c": AuditCCalc,
  "crusade": CrusadeCalc,
  "precise-dapt": PreciseDaptCalc,
  "vbg": VbgCalc,
};

export default async function CalculatorPage({ params }: Props) {
  const { id } = await params;

  const calculator = getCalculator(id);

  if (!calculator) {
    notFound();
  }

  const CalculatorComponent = calculatorComponents[id];

  return (
    <main className="px-4 py-8 sm:px-8 sm:py-16">

      {CalculatorComponent ? (

        <CalculatorComponent />

      ) : (

        <div className="mx-auto max-w-5xl">

          <div className="mb-3 text-sm text-gray-500">
            Медицинские калькуляторы
          </div>

          <h1 className="text-5xl font-bold">
            {calculator.title}
          </h1>

          <p className="mt-6 text-xl text-gray-500">
            Страница калькулятора находится в разработке.
          </p>

        </div>

      )}

    </main>
  );
}