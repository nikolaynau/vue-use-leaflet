import { computed, type ComputedRef } from 'vue-demi';
import { logicAnd } from '@vueuse/math';
import { toValue, type MaybeRefOrGetter } from '@vueuse/shared';

export type UseLeafletDepsReturn<T> = ComputedRef<T | undefined>;

export function useLeafletDeps<T = any>(
  source: MaybeRefOrGetter<T>,
  ...deps: MaybeRefOrGetter<any>[]
): UseLeafletDepsReturn<T> {
  return computed(() =>
    logicAnd(...deps).value ? toValue(source) : undefined
  );
}
