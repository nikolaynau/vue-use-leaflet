import { markRaw, shallowRef, type Ref } from 'vue-demi';
import { Control, type ControlPosition } from 'leaflet';
import { useLeafletRemoveControl } from '../useLeafletRemoveControl';
import type { Locate, LocateConstructor, LocateOptions } from './types';

export interface UseLeafletLocateControlOptions extends LocateOptions {
  position?: ControlPosition | string | undefined;
  factory?: (...args: any[]) => Locate;
  dispose?: boolean;
}

export type UseLeafletLocateControlReturn = Ref<Locate | null>;

export function useLeafletLocateControl(
  options: UseLeafletLocateControlOptions = {}
): UseLeafletLocateControlReturn {
  const { factory, dispose = true, ...controlOptions } = options;

  const _instance = shallowRef<Locate | null>(null);

  function create() {
    const instance: Locate = factory
      ? factory(controlOptions)
      : checkExtension<true>() &&
        new ((Control as any).Locate as LocateConstructor)(controlOptions);

    _instance.value = markRaw(instance);
  }

  function checkExtension<T>(): T | never {
    if (typeof (Control as any).Locate !== 'function') {
      throw new Error(
        'Leaflet extension not installed: "@leaflet-extensions/locatecontrol"'
      );
    }
    return true as T;
  }

  useLeafletRemoveControl(_instance, { dispose });

  create();

  return _instance;
}
