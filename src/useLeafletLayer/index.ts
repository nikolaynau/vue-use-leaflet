import {
  markRaw,
  shallowRef,
  watchEffect,
  watch,
  type Ref,
  type WatchSource,
  nextTick
} from 'vue-demi';
import type { Layer } from 'leaflet';
import { useLeafletRemoveLayer } from '../useLeafletRemoveLayer';
import { resolveRef } from '@vueuse/shared';

export interface UseLeafletLayerOptions<T> {
  watch?: WatchSource<any>;
  flushSync?: boolean;
  update?: (instance: T | null) => void;
  remove?: (instance: T) => void;
  dispose?: boolean;
}

export type UseLeafletLayerReturn<T> = Ref<T | null>;

export function useLeafletLayer<T extends Layer = Layer>(
  factory: () => T,
  options: UseLeafletLayerOptions<T> = {}
): UseLeafletLayerReturn<T> {
  const { watch: _watch, flushSync, update, remove, dispose } = options;

  const _instance = shallowRef<T | null>(null);
  const _flush = flushSync ? 'sync' : undefined;

  function create() {
    _instance.value = markRaw(factory());
  }

  if (update) {
    watchEffect(() => {
      update(_instance.value);
    });
  }

  useLeafletRemoveLayer(_instance, {
    remove,
    dispose
  });

  if (_watch) {
    const _watchRef = resolveRef(_watch);
    if (_watchRef.value) {
      create();
    } else {
      const stop = watch(
        _watchRef,
        val => {
          if (val) {
            nextTick(() => stop());
            create();
          }
        },
        { flush: _flush }
      );
    }
  } else {
    create();
  }

  return _instance;
}
