import HeroSearch from "./HeroSearch";

export default function Hero() {

  return (
    <section className="relative z-20 bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Декоративные круги */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl"></div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 py-8 text-center sm:px-8 sm:py-16 lg:py-28">

        <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 sm:px-4 sm:py-2 sm:text-sm">
          Медицинская платформа для врачей
        </span>

        <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:mt-6 sm:text-5xl lg:mt-8 lg:text-6xl">
          Всё необходимое врачу
          <br />
          <span className="text-blue-600">
            в одном месте
          </span>
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-6 text-gray-600 sm:mt-6 sm:text-lg sm:leading-7 lg:mt-8 lg:text-xl lg:leading-8">
          Клинические калькуляторы и медицинские шкалы для
          ежедневной практики.
        </p>

        <HeroSearch />

      </div>
    </section>
  );
}
