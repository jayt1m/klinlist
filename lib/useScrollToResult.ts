"use client";

import { useEffect, useRef } from "react";

/**
 * Возвращает ref для блока с результатом. Как только isComplete
 * впервые становится true (пользователь заполнил последний
 * необходимый параметр — независимо от порядка заполнения),
 * страница плавно прокручивается к результату. При последующих
 * изменениях уже заполненной формы повторного скролла не будет —
 * только в момент самого перехода «не готово → готово».
 */
export function useScrollToResult(isComplete: boolean) {
  const resultRef = useRef<HTMLDivElement>(null);
  const wasCompleteRef = useRef(false);

  useEffect(() => {
    if (isComplete && !wasCompleteRef.current) {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    wasCompleteRef.current = isComplete;
  }, [isComplete]);

  return resultRef;
}
