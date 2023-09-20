import { markRaw, shallowRef, type Ref } from 'vue-demi';
import { Control, type ControlPosition } from 'leaflet';
import { useLeafletRemoveControl } from '../useLeafletRemoveControl';
import type {
  LocateControlExtension,
  LocateControlExtensionConstructor,
  LocateControlExtensionOptions
} from './extension';

export * from './extension';

export interface UseLeafletLocateControlOptions
  extends LocateControlExtensionOptions {
  position?: ControlPosition | string | undefined;
  factory?: (...args: any[]) => LocateControlExtension;
  dispose?: boolean;
}

export type UseLeafletLocateControlReturn = Ref<LocateControlExtension | null>;

export function useLeafletLocateControl(
  options: UseLeafletLocateControlOptions = {}
): UseLeafletLocateControlReturn {
  const { factory, dispose = true, ...controlOptions } = options;

  const _instance = shallowRef<LocateControlExtension | null>(null);

  function create() {
    const instance: LocateControlExtension = factory
      ? factory(controlOptions)
      : checkExtension<true>() &&
        new ((Control as any).Locate as LocateControlExtensionConstructor)(
          controlOptions
        );

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
