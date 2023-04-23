import type { MaybeRefOrGetter } from '@vueuse/shared';
import {
  useLeafletRemoveObject,
  type UseLeafletRemoveObjectOptions,
  type UseLeafletRemoveObjectReturn
} from '../useLeafletRemoveObject';

export interface LeafletRemovableControl {
  remove(): this;
}

export function useLeafletRemoveControl<
  T extends LeafletRemovableControl = LeafletRemovableControl
>(
  source: MaybeRefOrGetter<T | null | undefined>,
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
