import { calculators } from "@/data/calculators";


export function getCalculatorInfo(id: string) {

  return calculators.find(
    (calculator) => calculator.id === id
  );

}