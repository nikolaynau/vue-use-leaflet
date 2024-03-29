import { watch } from 'vue-demi';
import { type MaybeRefOrGetter, toRef } from '@vueuse/shared';
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
  source: MaybeRefOrGetter<S | null | undefined>,
  target: MaybeRefOrGetter<T | null | undefined>,
  options?: UseLeafletDisplayObjectOptions<false, S, T>
): UseLeafletDisplayObjectReturn;
export function useLeafletDisplayObject<S, T>(
  source: MaybeRefOrGetter<S | null | undefined>,
  target: MaybeRefOrGetter<T | null | undefined>,
  options: UseLeafletDisplayObjectOptions<true, S, T>
): UseLeafletDisplayObjectReturnWithControls;
export function useLeafletDisplayObject<S, T>(
  source: MaybeRefOrGetter<S | null | undefined>,
  target: MaybeRefOrGetter<T | null | undefined>,
  options: UseLeafletDisplayObjectOptions<boolean, S, T> = {}
): UseLeafletDisplayObjectReturn | UseLeafletDisplayObjectReturnWithControls {
  const { show, hide, shown, flushSync, ...toggleOptions } = options;

  const _source = toRef(source);
  const _target = toRef(target);
  const _flush = flushSync ? 'sync' : undefined;

  const toggle = useLeafletToggleObject(source, target, {
    ...(toggleOptions as any),
    flushSync,
    onToggle
  });

  function onToggle(source: S, target: T, value: boolean) {
    if (value) {
      !(shown?.(source, target) ?? false) && show?.(source, target);
    } else {
      (shown?.(source, target) ?? true) && hide?.(source, target);
    }
  }

  function _shown(): boolean {
    return !!(
      _source.value &&
      _target.value &&
      shown?.(_source.value, _target.value)
    );
  }

  watch(
    _target,
    (_new, old) => {
      if (!_source.value) {
        return;
      }

      if (!_new && old) {
        onToggle(_source.value, old, false);
      } else if (_new && !old) {
        onToggle(_source.value, _new, true);
      } else if (_new && old && _new !== old) {
        onToggle(_source.value, old, false);
        onToggle(_source.value, _new, true);
      }
    },
    { flush: _flush }
  );

  if (options.controls) {
    const { toggle: _toggle, value } =
      toggle as unknown as UseLeafletToggleObjectReturnWithControls;
    return {
      toggle: _toggle,
      value,
      show: () => {
        _toggle(true);
      },
      hide: () => {
        _toggle(false);
      },
      shown: _shown
    };
  }

  return toggle;
}
