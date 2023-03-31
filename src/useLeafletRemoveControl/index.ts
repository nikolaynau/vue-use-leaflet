import type { MaybeComputedRef } from '@vueuse/shared';
import type { Control } from 'leaflet';
import {
  useLeafletRemoveObject,
  type UseLeafletRemoveObjectOptions,
  type UseLeafletRemoveObjectReturn
} from '../useLeafletRemoveObject';

export function useLeafletRemoveControl<T extends Control = Control>(
  source: MaybeComputedRef<T | null | undefined>,
  options: UseLeafletRemoveObjectOptions<T> = {}
): UseLeafletRemoveObjectReturn {
  const {
    remove = source => source.remove(),
    isRemoved = source => !(source as any)._map,
    cleanRef = true,
    flushSync = true,
    dispose = true,
    ..._options
  } = options;

  return useLeafletRemoveObject(source, {
    remove,
    isRemoved,
    cleanRef,
    flushSync,
    dispose,
    ..._options
  });
}
