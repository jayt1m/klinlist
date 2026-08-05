export default function Info() {
  return (
    <div className="rounded-3xl border border-blue-100 bg-blue-50 p-8">

      <h2 className="text-2xl font-bold">
        О шкале
      </h2>

      <p className="mt-4 leading-8 text-gray-700">
        Шкала CHA₂DS₂-VASc применяется для оценки риска
        ишемического инсульта и системных тромбоэмболий
        у пациентов с неклапанной фибрилляцией предсердий.
      </p>

      <div className="mt-8 rounded-2xl bg-white p-6">

        <div className="font-semibold">
          Показания
        </div>

        <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
          <li>Фибрилляция предсердий</li>
          <li>Трепетание предсердий</li>
          <li>Определение показаний к антикоагулянтной терапии</li>
        </ul>

      </div>

    </div>
  );
}