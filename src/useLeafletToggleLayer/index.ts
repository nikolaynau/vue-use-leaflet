import { ref, unref, watch, type Ref } from 'vue-demi';
import {
  resolveUnref,
  useToggle,
  whenever,
  type MaybeRef,
  type MaybeComputedRef
} from '@vueuse/shared';
import { logicAnd } from '@vueuse/math';
import { set, tryOnScopeDispose, type Fn } from '@vueuse/core';
import type { Layer } from 'leaflet';

export interface UseLeafletToggleLayerOptions<Controls extends boolean> {
  initialValue?: MaybeRef<boolean>;
  controls?: Controls;
  flushSync?: boolean;
  dispose?: boolean;
}

export interface LeafletAddableLayer {
  addLayer(layer: Layer): this;
  removeLayer(layer: Layer): this;
  hasLayer(layer: Layer): boolean;
}

export type UseLeafletToggleLayerReturn = (value?: boolean) => boolean;
export interface UseLeafletToggleLayerReturnWithControls {
  toggle: (value?: boolean) => boolean;
  value: Ref<boolean>;
  add: Fn;
  remove: Fn;
  has: () => boolean;
}

export function useLeafletToggleLayer(
  source: MaybeComputedRef<LeafletAddableLayer | null | undefined>,
  target: MaybeComputedRef<Layer | null | undefined>,
  options?: UseLeafletToggleLayerOptions<false>
): UseLeafletToggleLayerReturn;
export function useLeafletToggleLayer(
  source: MaybeComputedRef<LeafletAddableLayer | null | undefined>,
  target: MaybeComputedRef<Layer | null | undefined>,
  options: UseLeafletToggleLayerOptions<true>
): UseLeafletToggleLayerReturnWithControls;
export function useLeafletToggleLayer(
  source: MaybeComputedRef<LeafletAddableLayer | null | undefined>,
  target: MaybeComputedRef<Layer | null | undefined>,
  options: UseLeafletToggleLayerOptions<boolean> = {}
): UseLeafletToggleLayerReturn | UseLeafletToggleLayerReturnWithControls {
  const {
    initialValue = true,
    controls = false,
    flushSync = false,
    dispose = false
  } = options;

  const value = ref(initialValue);
  const toggle = useToggle(value);
  const isBoth = logicAnd(source, target);

  function _add() {
    isBoth.value && resolveUnref(source)!.addLayer(resolveUnref(target)!);
  }

  function _remove() {
    isBoth.value && resolveUnref(source)!.removeLayer(resolveUnref(target)!);
  }

  function _has(): boolean {
    return (
      isBoth.value && resolveUnref(source)!.hasLayer(resolveUnref(target)!)
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
      immediate: true,
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
