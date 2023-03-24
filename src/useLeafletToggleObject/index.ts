import { unref, watch, type Ref } from 'vue-demi';
import {
  type MaybeRef,
  type MaybeComputedRef,
  resolveUnref,
  useToggle,
  whenever,
  resolveRef
} from '@vueuse/shared';
import { logicAnd } from '@vueuse/math';
import { tryOnScopeDispose } from '@vueuse/core';

export interface UseLeafletToggleObjectOptions<Controls extends boolean, S, T> {
  initialValue?: MaybeRef<boolean>;
  controls?: Controls;
  flushSync?: boolean;
  dispose?: boolean;
  onToggle?: (source: S, target: T, value: boolean) => void;
}

export type UseLeafletToggleObjectReturn = (value?: boolean) => boolean;

export interface UseLeafletToggleObjectReturnWithControls {
  toggle: (value?: boolean) => boolean;
  value: Ref<boolean>;
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
    onToggle
  } = options;

  const value = resolveRef(initialValue);
  const toggle = useToggle(value);
  const isBoth = logicAnd(source, target);

  function callback(value: boolean) {
    isBoth.value &&
      onToggle?.(resolveUnref(source)!, resolveUnref(target)!, value);
  }

  function initial() {
    if (unref(value)) {
      callback(unref(value));
    }
  }

  watch(value, callback, {
    flush: flushSync ? 'sync' : undefined
  });

  whenever(isBoth, () => {
    initial();
  });

  if (dispose) {
    tryOnScopeDispose(() => {
      callback(false);
    });
  }

  initial();

  if (controls) {
    return {
      toggle,
      value
    };
  }

  return toggle;
}
