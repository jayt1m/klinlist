export type BMICategory =
  | "underweight"
  | "normal"
  | "overweight"
  | "obesity1"
  | "obesity2"
  | "obesity3";

export type BMIData = {
  weight: number;
  height: number;
};
