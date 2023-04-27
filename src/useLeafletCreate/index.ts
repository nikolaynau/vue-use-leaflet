import {
  type Ref,
  type WatchSource,
  shallowRef,
  watch,
  nextTick,
  markRaw
} from 'vue-demi';
import { toRef } from '@vueuse/shared';

export interface UseLeafletCreateOptions {
  watch?: WatchSource<any>;
  flushSync?: boolean;
}

export type UseLeafletCreateReturn<T> = Ref<T | null>;

export function useLeafletCreate<T extends object>(
  fn: () => T,
  options: UseLeafletCreateOptions = {}
): UseLeafletCreateReturn<T> {
  const { watch: _watch, flushSync } = options;

  const _instance = shallowRef<T | null>(null);
  const _flush = flushSync ? 'sync' : undefined;

  function create() {
    _instance.value = markRaw(fn());
  }

  if (_watch) {
    const _watchRef = toRef(_watch);
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
