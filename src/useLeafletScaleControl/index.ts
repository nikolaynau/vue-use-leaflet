import { markRaw, shallowRef, type Ref } from 'vue-demi';
import { Control } from 'leaflet';
import { useLeafletRemoveControl } from '../useLeafletRemoveControl';

export interface UseLeafletScaleControlOptions extends Control.ScaleOptions {
  factory?: (...args: unknown[]) => Control.Attribution;
  dispose?: boolean;
}

export type UseLeafletScaleControlReturn = Ref<Control.Scale | null>;

export function useLeafletScaleControl(
  options: UseLeafletScaleControlOptions = {}
): UseLeafletScaleControlReturn {
  const { factory, dispose = true, ...controlOptions } = options;

  const _instance = shallowRef<Control.Scale | null>(null);

  function create() {
    const instance: Control.Scale = factory
      ? factory(controlOptions)
      : new Control.Scale(controlOptions);

    _instance.value = markRaw(instance);
  }

  useLeafletRemoveControl(_instance, { dispose });
  create();

  return _instance;
}
