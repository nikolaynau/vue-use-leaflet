import { toRef, type MaybeRefOrGetter } from '@vueuse/shared';
import { markRaw, shallowRef, unref, watch, type Ref } from 'vue-demi';
import { Control } from 'leaflet';
import { useLeafletRemoveControl } from '../useLeafletRemoveControl';

export interface UseLeafletZoomControlOptions extends Control.ZoomOptions {
  disabled?: MaybeRefOrGetter<boolean>;
  factory?: (...args: unknown[]) => Control.Zoom;
  dispose?: boolean;
}

export type UseLeafletZoomControlReturn = Ref<Control.Zoom | null>;

export function useLeafletZoomControl(
  options: UseLeafletZoomControlOptions = {}
): UseLeafletZoomControlReturn {
  const { disabled, factory, dispose = true, ...controlOptions } = options;

  const _instance = shallowRef<Control.Zoom | null>(null);
  const _disabled = toRef(disabled);

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
    if (instance && typeof instance.enable === 'function' && instance._map) {
      instance.enable();
    }
  }

  function disable() {
    const instance = _instance.value as any;
    if (instance && typeof instance.disable === 'function' && instance._map) {
      instance.disable();
    }
  }

  useLeafletRemoveControl(_instance, { dispose });

  watch(_disabled, update);

  create();
  update();

  return _instance;
}
