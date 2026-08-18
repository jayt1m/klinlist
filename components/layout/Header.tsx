"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, Menu, Star, X } from "lucide-react";

import { useFavorites } from "@/lib/useFavorites";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { favorites, hydrated } = useFavorites();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const favoritesCount = hydrated ? favorites.length : 0;

  function handleLogoClick(e: React.MouseEvent) {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-6">

        {/* Кнопка назад */}
        {!isHome && (
          <button
            onClick={() => router.back()}
            aria-label="Назад"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}

        <div className="flex flex-1 items-center justify-between">

          {/* Логотип */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-800 text-lg font-bold text-white shadow-sm">
              К
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Клин<span className="text-blue-600">Лист</span>
              </h1>
            </div>
          </Link>

          {/* Меню (десктоп) */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">

            <Link href="/calculators" className="transition hover:text-blue-600">
              Калькуляторы
            </Link>

            <Link href="/calculators/perfusor" className="transition hover:text-blue-600">
              Перфузор
            </Link>

            <Link
              href="/favorites"
              className="flex items-center gap-1.5 transition hover:text-blue-600"
            >
              <Star className="h-4 w-4" />
              Избранное
              {favoritesCount > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-400 px-1.5 text-xs font-bold text-white">
                  {favoritesCount}
                </span>
              )}
            </Link>

          </nav>

          {/* Кнопка мобильного меню */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>

      </div>

      {/* Меню (мобильное) */}
      {mobileOpen && (
        <nav className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">

          <Link
            href="/calculators"
            onClick={() => setMobileOpen(false)}
            className="block py-3 text-base font-medium text-gray-700"
          >
            Калькуляторы
          </Link>

          <Link
            href="/calculators/perfusor"
            onClick={() => setMobileOpen(false)}
            className="block py-3 text-base font-medium text-gray-700"
          >
            Перфузор
          </Link>

          <Link
            href="/favorites"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 py-3 text-base font-medium text-gray-700"
          >
            <Star className="h-4 w-4" />
            Избранное
            {favoritesCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-400 px-1.5 text-xs font-bold text-white">
                {favoritesCount}
              </span>
            )}
          </Link>

        </nav>
      )}
    </header>
  );
}
