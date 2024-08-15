declare module 'react-hotkeys-hook' {
  export function useHotkeys(
    keys: string,
    callback: (event: KeyboardEvent) => void,
    options?: any
  ): void;
}
