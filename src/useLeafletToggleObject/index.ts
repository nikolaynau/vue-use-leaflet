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
  const flush = flushSync ? 'sync' : undefined;

  function callback(value: boolean) {
    const _source = resolveUnref(source);
    const _target = resolveUnref(target);

    if (_source && _target) {
      onToggle?.(_source, _target, value);
    }
  }

  function init() {
    if (unref(value)) {
      callback(unref(value));
    }
  }

  watch(value, callback, {
    flush
  });

  whenever(
    logicAnd(source, target),
    () => {
      init();
    },
    { flush }
  );

  if (dispose) {
    tryOnScopeDispose(() => {
      callback(false);
    });
  }

  init();

  if (controls) {
    return {
      toggle,
      value
    };
  }

  return toggle;
}
