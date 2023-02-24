import { logicAnd } from '@vueuse/math';

export function useLeafletReady(...args: any[]) {
  return logicAnd(...args);
}

export type UseLeafletReadyReturn = ReturnType<typeof useLeafletReady>;
