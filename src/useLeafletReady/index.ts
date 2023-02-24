import { ref } from 'vue-demi';
import { logicAnd } from '@vueuse/math';
import { set, whenever } from '@vueuse/shared';

export function useLeafletReady(...args: any[]) {
  const ready = ref(false);
  whenever(logicAnd(...args), () => {
    set(ready, true);
  });
  return ready;
}

export type UseLeafletReadyReturn = ReturnType<typeof useLeafletReady>;
