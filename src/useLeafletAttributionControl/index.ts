import { markRaw, shallowRef, watch, type Ref } from 'vue-demi';
import { isDefined, toRef, type MaybeRefOrGetter } from '@vueuse/shared';
import { Control, type ControlPosition } from 'leaflet';
import { useLeafletRemoveControl } from '../useLeafletRemoveControl';

export interface UseLeafletAttributionControlOptions
  extends Omit<Control.AttributionOptions, 'prefix' | 'position'> {
  attributions?: MaybeRefOrGetter<string[] | null | undefined>;
  prefix?: MaybeRefOrGetter<string | null | undefined>;
  position?: ControlPosition | string | undefined;
  factory?: (...args: any[]) => Control.Attribution;
  dispose?: boolean;
}

export type UseLeafletAttributionControlReturn =
  Ref<Control.Attribution | null>;

export function useLeafletAttributionControl(
  options: UseLeafletAttributionControlOptions = {}
): UseLeafletAttributionControlReturn {
  const {
    attributions,
    prefix,
    factory,
    dispose = true,
    ...controlOptions
  } = options;

  const _instance = shallowRef<Control.Attribution | null>(null);
  const _attributions = toRef(attributions);
  const _prefix = toRef(prefix);

  function create() {
    const instance: Control.Attribution = factory
      ? factory(controlOptions)
      : new Control.Attribution(controlOptions as Control.AttributionOptions);

    _instance.value = markRaw(instance);
  }

  function init() {
    if (_prefix.value !== undefined) {
      _instance.value?.setPrefix(_prefix.value!);
    }
    if (isDefined(_attributions)) {
      add(_attributions.value);
    }
  }

  function add(attributions: string[]) {
    attributions.forEach(text => _instance.value?.addAttribution(text));
  }

  function remove(attributions: string[]) {
    attributions.forEach(text => _instance.value?.removeAttribution(text));
  }

  function diff<T>(arrA: T[], arrB: T[]): T[] {
    return arrA.filter(x => !arrB.includes(x));
  }

  useLeafletRemoveControl(_instance, { dispose });

  watch(_prefix, value => {
    _instance.value?.setPrefix(value!);
  });

  watch(
    () => (isDefined(_attributions) ? [..._attributions.value] : []),
    (_new, old) => {
      if (old && _new) {
        remove(diff(old, _new));
        add(diff(_new, old));
      } else if (old) {
        remove(old);
      } else if (_new) {
        add(_new);
      }
    }
  );

  create();
  init();

  return _instance;
}
