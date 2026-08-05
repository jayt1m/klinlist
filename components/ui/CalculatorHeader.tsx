import { calculators } from "@/data/calculators";
import FavoriteButton from "@/components/ui/FavoriteButton";


type CalculatorHeaderProps = {
  calculatorId: string;
  highlight?: string;
};


export default function CalculatorHeader({
  calculatorId,
  highlight,
}: CalculatorHeaderProps) {


  const calculator = calculators.find(
    (item) => item.id === calculatorId
  );


  if (!calculator) {
    return null;
  }


  return (

    <div className="
      rounded-3xl
      border
      border-gray-200
      bg-white
      p-8
      shadow-sm
    ">


      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">

        <div className="flex flex-wrap items-center gap-3">

          <span className="
            rounded-full
            bg-blue-50
            px-3
            py-1
            text-sm
            font-semibold
            text-blue-700
          ">
            {calculator.specialty}
          </span>



          {highlight ? (

            <span className="
              rounded-full
              bg-emerald-50
              px-3
              py-1
              text-sm
              font-semibold
              text-emerald-700
            ">
              {highlight}
            </span>

          ) : (

            <span className="
              rounded-full
              bg-gray-100
              px-3
              py-1
              text-sm
              font-semibold
              text-gray-600
            ">
              {calculator.category}
            </span>

          )}

        </div>

        <FavoriteButton calculatorId={calculatorId} size="lg" />

      </div>




      <h1 className="
        text-4xl
        font-black
      ">

        {calculator.title}

      </h1>




      <p className="
        mt-4
        max-w-3xl
        text-lg
        leading-7
        text-gray-600
      ">

        {calculator.description}

      </p>


    </div>

  );
}