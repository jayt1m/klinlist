import HeroSearch from "./HeroSearch";

export default function Hero() {

  return (
    <section className="relative z-20 bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Декоративные круги */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl"></div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-8 py-28 text-center">

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          Медицинская платформа для врачей
        </span>

        <h1 className="mt-8 max-w-4xl text-6xl font-black leading-tight tracking-tight">
          Всё необходимое врачу
          <br />
          <span className="text-blue-600">
            в одном месте
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-8 text-gray-600">
          Клинические калькуляторы и медицинские шкалы для
          ежедневной практики.
        </p>

        <HeroSearch />

      </div>
    </section>
  );
}