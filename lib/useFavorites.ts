"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "klinlist:favorites";

type Listener = () => void;

const listeners = new Set<Listener>();

let cache: string[] = [];
let cacheInitialized = false;

function readFromStorage(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function writeFavorites(ids: string[]) {
  cache = ids;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage недоступен (приватный режим и т.п.) — тихо игнорируем
  }

  emitChange();
}

function getSnapshot(): string[] {
  if (!cacheInitialized) {
    cache = readFromStorage();
    cacheInitialized = true;
  }

  return cache;
}

const EMPTY_FAVORITES: string[] = [];

function getServerSnapshot(): string[] {
  return EMPTY_FAVORITES;
}

function subscribe(listener: Listener) {
  listeners.add(listener);

  function handleStorage(e: StorageEvent) {
    if (e.key === STORAGE_KEY) {
      cache = readFromStorage();
      emitChange();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function useFavorites() {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const toggleFavorite = useCallback((id: string) => {
    const current = getSnapshot();

    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];

    writeFavorites(next);
  }, []);

  // Оставлено для совместимости с уже написанными компонентами —
  // useSyncExternalStore сам корректно синхронизирует серверный и
  // клиентский снапшот, отдельный флаг гидратации больше не нужен.
  return { favorites, isFavorite, toggleFavorite, hydrated: true };
}
