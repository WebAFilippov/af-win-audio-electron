// src/preload/index.d.ts

declare global {
  interface Window {
    context: {
      send: (channel: string, data: any) => void;
      receive: (
        channel: string,
        func: (event: any, ...args: any[]) => void
      ) => void;
    };
  }
}

// Это нужно для того, чтобы TypeScript знал, что это файл с глобальными типами
export {};
