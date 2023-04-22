import type { ComputedRef } from 'vue-demi';
import { logicAnd } from '@vueuse/math';

export type UseLeafletReadyReturn = ComputedRef<boolean>;

export function useLeafletReady(...args: any[]): UseLeafletReadyReturn {
  return logicAnd(...args);
}
