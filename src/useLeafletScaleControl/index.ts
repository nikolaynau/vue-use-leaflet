import { markRaw, shallowRef, type Ref } from 'vue-demi';
import { Control, type ControlPosition } from 'leaflet';
import { useLeafletRemoveControl } from '../useLeafletRemoveControl';

export interface UseLeafletScaleControlOptions
  extends Omit<Control.ScaleOptions, 'position'> {
  position?: ControlPosition | string | undefined;
  factory?: (...args: any[]) => Control.Attribution;
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
      : new Control.Scale(controlOptions as Control.ScaleOptions);

    _instance.value = markRaw(instance);
  }

  useLeafletRemoveControl(_instance, { dispose });
  create();

  return _instance;
}
