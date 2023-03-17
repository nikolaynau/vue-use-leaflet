import { type MaybeComputedRef, resolveUnref } from '@vueuse/shared';
import type { Fn } from '@vueuse/core';
import {
  useLeafletToggleObject,
  type UseLeafletToggleObjectOptions,
  type UseLeafletToggleObjectReturn,
  type UseLeafletToggleObjectReturnWithControls
} from '../useLeafletToggleObject';

export interface UseLeafletDisplayObjectOptions<Controls extends boolean, S, T>
  extends Omit<UseLeafletToggleObjectOptions<Controls, S, T>, 'onToggle'> {
  show?: (source: S, target: T) => void;
  hide?: (source: S, target: T) => void;
  shown?: (source: S, target: T) => boolean;
}

export type UseLeafletDisplayObjectReturn = UseLeafletToggleObjectReturn;

export interface UseLeafletDisplayObjectReturnWithControls
  extends UseLeafletToggleObjectReturnWithControls {
  show: Fn;
  hide: Fn;
  shown: () => boolean;
}

export function useLeafletDisplayObject<S, T>(
  source: MaybeComputedRef<S | null | undefined>,
  target: MaybeComputedRef<T | null | undefined>,
  options?: UseLeafletDisplayObjectOptions<false, S, T>
): UseLeafletDisplayObjectReturn;
export function useLeafletDisplayObject<S, T>(
  source: MaybeComputedRef<S | null | undefined>,
  target: MaybeComputedRef<T | null | undefined>,
  options: UseLeafletDisplayObjectOptions<true, S, T>
): UseLeafletDisplayObjectReturnWithControls;
export function useLeafletDisplayObject<S, T>(
  source: MaybeComputedRef<S | null | undefined>,
  target: MaybeComputedRef<T | null | undefined>,
  options: UseLeafletDisplayObjectOptions<boolean, S, T> = {}
): UseLeafletDisplayObjectReturn | UseLeafletDisplayObjectReturnWithControls {
  const { show, hide, shown, ...toggleOptions } = options;

  function onToggle(source: S, target: T, value: boolean) {
    if (value) {
      !(shown?.(source, target) ?? false) && show?.(source, target);
    } else {
      (shown?.(source, target) ?? true) && hide?.(source, target);
    }
  }

  const toggle = useLeafletToggleObject(source, target, {
    ...(toggleOptions as any),
    onToggle
  });

  if (options.controls) {
    const { toggle: _toggle, value } =
      toggle as unknown as UseLeafletToggleObjectReturnWithControls;
    return {
      toggle: _toggle,
      value,
      show: () => {
        toggle(true);
      },
      hide: () => {
        toggle(false);
      },
      shown: () => resolveUnref(value)
    };
  }

  return toggle;
}
