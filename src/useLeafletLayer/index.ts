import { watch, type Ref, type WatchSource } from 'vue-demi';
import type { Layer } from 'leaflet';
import { useLeafletCreate } from '../useLeafletCreate';
import { useLeafletRemoveLayer } from '../useLeafletRemoveLayer';

export interface UpdateWatchSource<T> {
  watch: WatchSource<any>;
  handler: (instance: T, newVal: any, oldVal: any) => void;
}

export interface UseLeafletLayerOptions<T> {
  watch?: WatchSource<any>;
  flushSync?: boolean;
  updateSources?: UpdateWatchSource<T>[];
  remove?: (instance: T) => void;
  dispose?: boolean;
}

export type UseLeafletLayerReturn<T> = Ref<T | null>;

export function useLeafletLayer<T extends Layer = Layer>(
  factory: () => T,
  options: UseLeafletLayerOptions<T> = {}
): UseLeafletLayerReturn<T> {
  const { watch: _watch, flushSync, updateSources, remove, dispose } = options;

  const _instance = useLeafletCreate(factory, {
    watch: _watch,
    flushSync
  });
  const _flush = flushSync ? 'sync' : undefined;

  if (Array.isArray(updateSources)) {
    updateSources.forEach(watchUpdate);
  }

  function watchUpdate(watchSource: UpdateWatchSource<T>) {
    const { handler } = watchSource;
    watch(
      watchSource.watch,
      (newVal, oldVal) => {
        if (_instance.value) {
          handler(_instance.value, newVal, oldVal);
        }
      },
      { flush: _flush }
    );
  }

  useLeafletRemoveLayer(_instance, {
    remove,
    dispose
  });

  return _instance;
}
