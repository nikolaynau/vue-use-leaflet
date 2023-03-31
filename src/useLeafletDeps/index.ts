import { computed } from 'vue-demi';
import { logicAnd } from '@vueuse/math';
import { resolveUnref, type MaybeComputedRef } from '@vueuse/shared';

export function useLeafletDeps<T = any>(
  source: MaybeComputedRef<T>,
  ...deps: MaybeComputedRef<any>[]
) {
  return computed(() =>
    logicAnd(...deps).value ? resolveUnref(source) : undefined
  );
}

export type UseLeafletDepsReturn<T = any> = ReturnType<
  typeof useLeafletDeps<T>
>;
