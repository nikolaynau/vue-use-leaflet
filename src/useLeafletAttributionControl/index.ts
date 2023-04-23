import { markRaw, shallowRef, unref, watch, type Ref } from 'vue-demi';
import { isDefined, toRef, type MaybeRefOrGetter } from '@vueuse/shared';
import { Control } from 'leaflet';
import { useLeafletRemoveControl } from '../useLeafletRemoveControl';

export interface UseLeafletAttributionControlOptions
  extends Omit<Control.AttributionOptions, 'prefix'> {
  attributions?: MaybeRefOrGetter<string[] | null | undefined>;
  prefix?: MaybeRefOrGetter<string | null | undefined>;
  factory?: (...args: unknown[]) => Control.Attribution;
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
      : new Control.Attribution(controlOptions);

    _instance.value = markRaw(instance);
  }

  function init() {
    if (unref(_prefix) !== undefined) {
      _instance.value?.setPrefix(unref(_prefix)!);
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
    () => (isDefined(_attributions) ? [...unref(_attributions)!] : []),
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
