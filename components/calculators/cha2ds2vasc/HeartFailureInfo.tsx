import ExpandableCard from "@/components/ui/ExpandableCard";

export default function HeartFailureInfo() {
  return (
    <ExpandableCard title="Критерии включения в шкалу CHA₂DS₂-VASc">

      <div className="space-y-8">

        <section>

          <h3 className="mb-3 text-lg font-semibold text-green-700">
            ✔ Учитывается
          </h3>

          <ul className="list-disc space-y-2 pl-6 text-gray-700 leading-7">

            <li>
              Клинически подтверждённая хроническая сердечная недостаточность.
            </li>

            <li>
              Симптомная ХСН независимо от этиологии.
            </li>

            <li>
              Сниженная систолическая функция левого желудочка
              (ФВ ЛЖ ≤40%).
            </li>

            <li>
              Ранее установленный диагноз ХСН при продолжающемся наблюдении.
            </li>

          </ul>

        </section>

        <section>

          <h3 className="mb-3 text-lg font-semibold text-red-700">
            ✖ Не учитывается
          </h3>

          <ul className="list-disc space-y-2 pl-6 text-gray-700 leading-7">

            <li>
              Изолированная диастолическая дисфункция без клинической ХСН.
            </li>

            <li>
              Бессимптомное снижение фракции выброса без установленного диагноза.
            </li>

            <li>
              Подозрение на ХСН без клинического подтверждения.
            </li>

          </ul>

        </section>

        <section>

          <h3 className="mb-3 text-lg font-semibold">
            💡 Комментарий
          </h3>

          <p className="leading-7 text-gray-700">

            В оригинальной шкале CHA₂DS₂-VASc учитывается наличие
            клинической сердечной недостаточности или сниженной
            сократительной функции левого желудочка.
            На практике это соответствует пациентам с установленным
            диагнозом ХСН или сниженной фракцией выброса ЛЖ
            (обычно ≤40%).

          </p>

        </section>

        <section>

          <h3 className="mb-3 text-lg font-semibold">
            📚 Источники
          </h3>

          <ul className="list-disc space-y-2 pl-6 text-gray-700">

            <li>
              Клинические рекомендации РКО «Фибрилляция и трепетание предсердий».
            </li>

            <li>
              ESC Guidelines for the management of atrial fibrillation.
            </li>

          </ul>

        </section>

      </div>

    </ExpandableCard>
  );
}