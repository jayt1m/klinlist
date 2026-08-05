import { calculators } from "@/data/calculators";

export function getCalculator(id: string) {
  return calculators.find((calculator) => calculator.id === id);
}