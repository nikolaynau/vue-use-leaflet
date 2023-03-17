import { ref, unref, watch, type Ref } from 'vue-demi';
import {
  type MaybeRef,
  type MaybeComputedRef,
  resolveUnref,
  useToggle,
  whenever
} from '@vueuse/shared';
import { logicAnd } from '@vueuse/math';
import { set, tryOnScopeDispose, type Fn } from '@vueuse/core';

export interface UseLeafletToggleObjectOptions<Controls extends boolean, S, T> {
  initialValue?: MaybeRef<boolean>;
  controls?: Controls;
  flushSync?: boolean;
  dispose?: boolean;
  add?: (source: S, target: T) => void;
  remove?: (source: S, target: T) => void;
  has?: (source: S, target: T) => boolean;
}

export type UseLeafletToggleObjectReturn = (value?: boolean) => boolean;

export interface UseLeafletToggleObjectReturnWithControls {
  toggle: (value?: boolean) => boolean;
  value: Ref<boolean>;
  add: Fn;
  remove: Fn;
  has: () => boolean;
}

export function useLeafletToggleObject<S, T>(
  source: MaybeComputedRef<S | null | undefined>,
  target: MaybeComputedRef<T | null | undefined>,
  options?: UseLeafletToggleObjectOptions<false, S, T>
): UseLeafletToggleObjectReturn;
export function useLeafletToggleObject<S, T>(
  source: MaybeComputedRef<S | null | undefined>,
  target: MaybeComputedRef<T | null | undefined>,
  options: UseLeafletToggleObjectOptions<true, S, T>
): UseLeafletToggleObjectReturnWithControls;
export function useLeafletToggleObject<S, T>(
  source: MaybeComputedRef<S | null | undefined>,
  target: MaybeComputedRef<T | null | undefined>,
  options: UseLeafletToggleObjectOptions<boolean, S, T> = {}
): UseLeafletToggleObjectReturn | UseLeafletToggleObjectReturnWithControls {
  const {
    initialValue = true,
    controls = false,
    flushSync = false,
    dispose = false,
    add,
    remove,
    has
  } = options;

  const value = ref(initialValue);
  const toggle = useToggle(value);
  const isBoth = logicAnd(source, target);

  function _add() {
    isBoth.value && add?.(resolveUnref(source)!, resolveUnref(target)!);
  }

  function _remove() {
    isBoth.value && remove?.(resolveUnref(source)!, resolveUnref(target)!);
  }

  function _has(): boolean {
    return (
      isBoth.value &&
      (has?.(resolveUnref(source)!, resolveUnref(target)!) ?? false)
    );
  }

  watch(
    value,
    val => {
      if (val) {
        _add();
      } else {
        _remove();
      }
    },
    {
      flush: flushSync ? 'sync' : undefined
    }
  );

  whenever(isBoth, () => {
    if (unref(value)) {
      _add();
    }
  });

  if (dispose) {
    tryOnScopeDispose(() => {
      _remove();
    });
  }

  if (unref(value)) {
    _add();
  }

  if (controls) {
    return {
      toggle,
      value,
      add: () => set(value, true),
      remove: () => set(value, false),
      has: _has
    };
  }

  return toggle;
}
