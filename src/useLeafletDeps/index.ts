import { computed, type ComputedRef } from 'vue-demi';
import { logicAnd } from '@vueuse/math';
import { resolveUnref, type MaybeComputedRef } from '@vueuse/shared';

export type UseLeafletDepsReturn<T> = ComputedRef<T | undefined>;

export function useLeafletDeps<T = any>(
  source: MaybeComputedRef<T>,
  ...deps: MaybeComputedRef<any>[]
): UseLeafletDepsReturn<T> {
  return computed(() =>
    logicAnd(...deps).value ? resolveUnref(source) : undefined
  );
}
