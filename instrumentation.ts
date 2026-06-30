export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Node.js 22+ exposes a partial localStorage global that breaks next-themes
    // during SSR (localStorage exists but getItem is not a function).
    // Nullifying it restores the expected browser-only behaviour.
    if (
      typeof localStorage !== "undefined" &&
      typeof (localStorage as Storage).getItem !== "function"
    ) {
      Object.defineProperty(globalThis, "localStorage", {
        value: undefined,
        writable: true,
        configurable: true,
      });
    }
  }
}
