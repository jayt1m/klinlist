"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CircleCheck,
  CircleX,
  BookOpen,
  Info,
} from "lucide-react";

type Props = {
  title: string;
  included: string[];
  excluded?: string[];
  comment?: string;
  references?: string[];
};

export default function MedicalInfoCard({
  title,
  included,
  excluded = [],
  comment,
  references = [],
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50">

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5"
      >

        <div className="flex items-center gap-3">

          <Info className="h-5 w-5 text-blue-600" />

          <span className="font-semibold">
            Подробнее
          </span>

        </div>

        {open ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}

      </button>

      {open && (

        <div className="space-y-8 border-t p-6">

          <div>

            <h3 className="mb-4 text-lg font-semibold">
              {title}
            </h3>

          </div>

          <div>

            <div className="mb-3 flex items-center gap-2">

              <CircleCheck className="h-5 w-5 text-green-600" />

              <h4 className="font-semibold">
                Учитывается
              </h4>

            </div>

            <ul className="space-y-2 pl-7 list-disc">

              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}

            </ul>

          </div>

          {excluded.length > 0 && (

            <div>

              <div className="mb-3 flex items-center gap-2">

                <CircleX className="h-5 w-5 text-red-600" />

                <h4 className="font-semibold">
                  Не учитывается
                </h4>

              </div>

              <ul className="space-y-2 pl-7 list-disc">

                {excluded.map((item) => (
                  <li key={item}>{item}</li>
                ))}

              </ul>

            </div>

          )}

          {comment && (

            <div>

              <h4 className="mb-3 font-semibold">
                Комментарий
              </h4>

              <p className="leading-7 text-gray-700">
                {comment}
              </p>

            </div>

          )}

          {references.length > 0 && (

            <div>

              <div className="mb-3 flex items-center gap-2">

                <BookOpen className="h-5 w-5 text-blue-600" />

                <h4 className="font-semibold">
                  Источники
                </h4>

              </div>

              <ul className="space-y-2 pl-7 list-disc">

                {references.map((item) => (
                  <li key={item}>{item}</li>
                ))}

              </ul>

            </div>

          )}

        </div>

      )}

    </div>
  );
}