import type { MaybeRefOrGetter } from '@vueuse/shared';
import {
  useLeafletRemoveObject,
  type UseLeafletRemoveObjectOptions,
  type UseLeafletRemoveObjectReturn
} from '../useLeafletRemoveObject';

export interface LeafletRemovableLayer {
  off(): this;
  remove(): this;
}

export function useLeafletRemoveLayer<
  T extends LeafletRemovableLayer = LeafletRemovableLayer
>(
  source: MaybeRefOrGetter<T | null | undefined>,
  options: UseLeafletRemoveObjectOptions<T> = {}
): UseLeafletRemoveObjectReturn {
  const {
    remove = source => source.off().remove(),
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
