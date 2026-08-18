"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail, ShieldAlert } from "lucide-react";

const FEEDBACK_EMAIL = "feedback@klinlist.ru";

export default function Footer() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const mailtoHref = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(
    `КлинЛист — сообщение об ошибке (${pathname})`
  )}`;

  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">

      <div className="mx-auto max-w-7xl px-8 py-10">

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">

          <div className="flex items-start gap-3">

            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />

            <div className="flex-1">

              <p>
                КлинЛист — справочный информационный ресурс для
                медицинских работников. Результаты расчётов не
                заменяют клиническое суждение врача.
              </p>

              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 flex items-center gap-1 font-semibold text-amber-800 hover:text-amber-900"
              >
                {expanded ? "Свернуть" : "Читать полностью"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </button>

              {expanded && (

                <div className="mt-4 space-y-3 leading-6">

                  <p>
                    Материалы сайта не являются медицинским изделием,
                    программой поддержки принятия врачебных решений
                    или указанием к действию, а носят исключительно
                    информационно-справочный характер.
                  </p>

                  <p>
                    Все расчёты выполняются по формулам и балльным
                    таблицам из открытых источников (оригинальные
                    публикации, действующие клинические
                    рекомендации) — ссылки на источники указаны под
                    каждым калькулятором. Несмотря на тщательную
                    проверку, авторы сайта не гарантируют абсолютную
                    точность и актуальность расчётов и не несут
                    ответственности за решения, принятые на
                    основании данных сайта.
                  </p>

                  <p>
                    Ответственность за диагностические и лечебные
                    решения полностью лежит на использующем сайт
                    специалисте — результаты расчётов необходимо
                    сверять с действующими клиническими
                    рекомендациями, инструкциями к препаратам и
                    клинической картиной конкретного пациента.
                  </p>

                  <p>
                    Сайт не собирает и не хранит персональные данные
                    пациентов. Данные об избранных калькуляторах
                    сохраняются только в браузере устройства
                    пользователя и не передаются на сервер.
                  </p>

                  <p>
                    Нашли неточность в формуле или ошибку на сайте —
                    сообщите, пожалуйста, по ссылке ниже. Это
                    помогает держать сайт точным.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">

          <div className="flex items-center gap-2 text-lg font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-800 text-sm text-white shadow-sm">
              К
            </div>
            Клин<span className="text-blue-600">Лист</span>
          </div>

          <a
            href={mailtoHref}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600"
          >
            <Mail className="h-4 w-4" />
            Сообщить об ошибке
          </a>

        </div>

        <p className="mt-6 text-xs text-gray-400">
          © {new Date().getFullYear()} КлинЛист
        </p>

      </div>

    </footer>
  );
}
