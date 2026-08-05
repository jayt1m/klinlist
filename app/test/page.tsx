import Link from "next/link";

export default function TestPage() {
  return (
    <main className="p-10">
      <Link
        href="/calculators/cha2ds2-vasc"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Перейти к калькулятору
      </Link>
    </main>
  );
}