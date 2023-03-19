import {
  isDefined,
  isFunction,
  resolveRef,
  tryOnUnmounted,
  type MaybeComputedRef
} from '@vueuse/shared';
import { markRaw, shallowRef, unref, watch, type Ref } from 'vue-demi';
import { Control } from 'leaflet';

export interface UseLeafletZoomControlOptions extends Control.ZoomOptions {
  disabled?: MaybeComputedRef<boolean>;
  factory?: (...args: unknown[]) => Control.Zoom;
  dispose?: boolean;
}

export type UseLeafletZoomControlReturn = Ref<Control.Zoom | null>;

export function useLeafletZoomControl(
  options: UseLeafletZoomControlOptions = {}
): UseLeafletZoomControlReturn {
  const { disabled, factory, dispose = true, ...controlOptions } = options;

  const _instance = shallowRef<Control.Zoom | null>(null);
  const _disabled = resolveRef(disabled);

  function create() {
    const instance: Control.Zoom = factory
      ? factory(controlOptions)
      : new Control.Zoom(controlOptions);

    _instance.value = markRaw(instance);
  }

  function update() {
    unref(_disabled) ? disable() : enable();
  }

  function enable() {
    const instance = _instance.value as any;
    if (isFunction(instance?.enable) && instance._map) {
      instance.enable();
    }
  }

  function disable() {
    const instance = _instance.value as any;
    if (isFunction(instance?.disable) && instance._map) {
      instance.disable();
    }
  }

  function clean() {
    if (isDefined(_instance)) {
      _instance.value.remove();
      (_instance as Ref<Control.Zoom | null>).value = null;
    }
  }

  if (dispose) {
    tryOnUnmounted(() => {
      clean();
    });
  }

  watch(_disabled, update);

  create();
  update();

  return _instance;
}
