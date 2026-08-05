import { calculators } from "./calculators";


export type Specialty = {
  name: string;
  icon: string;
  count: number;
};


const specialtyIcons: Record<string, string> = {
  "Кардиология": "❤️",
  "Нефрология": "🫘",
  "Терапия": "🩺",
  "Пульмонология": "🫁",
  "Неврология": "🧠",
  "Эндокринология": "🧬",
};


export function getSpecialtyIcon(
  name: string
): string {

  return specialtyIcons[name] ?? "📋";

}


export function getSpecialties(): Specialty[] {

  const counts = new Map<string, number>();

  for (const calc of calculators) {

    counts.set(
      calc.specialty,
      (counts.get(calc.specialty) ?? 0) + 1
    );

  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      count,
      icon: getSpecialtyIcon(name),
    }))
    .sort((a, b) => b.count - a.count);

}
