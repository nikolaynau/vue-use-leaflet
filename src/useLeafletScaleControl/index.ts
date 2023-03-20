import { markRaw, shallowRef, type Ref } from 'vue-demi';
import { isDefined, tryOnUnmounted } from '@vueuse/shared';
import { Control } from 'leaflet';

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

  function clean() {
    if (isDefined(_instance)) {
      _instance.value.remove();
      (_instance as Ref<Control.Scale | null>).value = null;
    }
  }

  if (dispose) {
    tryOnUnmounted(() => {
      clean();
    });
  }

  create();

  return _instance;
}
