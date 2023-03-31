import { isReadonly, watch, type WatchSource } from 'vue-demi';
import {
  tryOnUnmounted,
  type MaybeComputedRef,
  resolveRef,
  isDefined,
  whenever
} from '@vueuse/shared';

export interface UseLeafletRemoveObjectOptions<T> {
  remove?: (source: T) => void;
  watch?: WatchSource<any>;
  cleanRef?: boolean;
  cleanVal?: any;
  dispose?: boolean;
  flushSync?: boolean;
}

export type UseLeafletRemoveObjectReturn = () => void;

export function useLeafletRemoveObject<T = any>(
  source: MaybeComputedRef<T | null | undefined>,
  options: UseLeafletRemoveObjectOptions<T> = {}
): UseLeafletRemoveObjectReturn {
  const {
    remove,
    watch: _watch,
    cleanRef,
    cleanVal = null,
    flushSync,
    dispose
  } = options;

  const _source = resolveRef(source);
  const _flush = flushSync ? 'sync' : undefined;
  let _locked = false;

  watch(
    _source,
    (_new, old) => {
      if (!_locked) {
        !_new && old && remove?.(old);
      } else {
        _locked = false;
      }
    },
    { flush: _flush }
  );

  if (_watch) {
    whenever(
      _watch,
      () => {
        clean();
      },
      { flush: _flush }
    );
  }

  function clean() {
    if (isDefined(_source) && remove) {
      remove(_source.value);
      if (cleanRef && !isReadonly(_source)) {
        _locked = true;
        _source.value = cleanVal;
      }
    }
  }

  if (dispose) {
    tryOnUnmounted(() => {
      clean();
    });
  }

  return clean;
}
