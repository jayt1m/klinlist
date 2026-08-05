import Link from "next/link";

import { calculators } from "@/data/calculators";


export default function PopularCards() {

  const popular = calculators.filter(
    (calc) => calc.popular
  );

  return (
    <section className="mx-auto max-w-7xl px-8 py-20">

      <div className="mb-10 flex items-end justify-between">

        <h2 className="text-3xl font-bold">
          Популярные калькуляторы
        </h2>

        <Link
          href="/calculators"
          className="hidden font-semibold text-blue-600 transition hover:text-blue-700 md:block"
        >
          Все калькуляторы →
        </Link>

      </div>


      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">


        {popular.map((calc) => (

          <Link
            key={calc.id}
            href={`/calculators/${calc.id}`}
            className="
              flex
              flex-col
              rounded-2xl
              border
              border-gray-100
              bg-white
              p-5
              shadow-sm
              transition
              hover:-translate-y-1
              hover:border-blue-200
              hover:shadow-lg
            "
          >

            <div className="text-lg font-bold">
              {calc.title}
            </div>

            <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-500">
              {calc.description}
            </p>

            <div className="mt-4 text-sm font-semibold text-blue-600">
              Открыть →
            </div>

          </Link>

        ))}


      </div>

      <Link
        href="/calculators"
        className="mt-8 block text-center font-semibold text-blue-600 transition hover:text-blue-700 md:hidden"
      >
        Все калькуляторы →
      </Link>


    </section>
  );
}
