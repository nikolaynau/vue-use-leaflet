import { markRaw, shallowRef, unref, watch, type Ref } from 'vue-demi';
import { toRef, type MaybeRefOrGetter } from '@vueuse/shared';
import { Control, type ControlOptions, type Map } from 'leaflet';
import { useLeafletRemoveControl } from '../useLeafletRemoveControl';

export interface UseLeafletCustomControlOptions extends ControlOptions {
  disabled?: MaybeRefOrGetter<boolean>;
  factory?: (...args: any[]) => Control;
  dispose?: boolean;
  onAdd?: (map: Map, control: Control) => HTMLElement;
  onRemove?: (map: Map, control: Control) => void;
  onDisable?: (map: Map, control: Control) => void;
  onEnable?: (map: Map, control: Control) => void;
}

export type UseLeafletCustomControlReturn = Ref<Control | null>;

export function useLeafletCustomControl(
  options: UseLeafletCustomControlOptions = {}
): UseLeafletCustomControlReturn {
  const {
    disabled,
    factory,
    dispose = true,
    onAdd = () => document.createElement('div'),
    onRemove,
    onEnable,
    onDisable,
    ...controlOptions
  } = options;

  const _instance = shallowRef<Control | null>(null);
  const _disabled = toRef(disabled);

  function create() {
    const instance: Control = factory
      ? factory(controlOptions)
      : new Control(controlOptions);

    _instance.value = markRaw(wrap(instance));
  }

  function wrap(instance: Control): Control {
    instance.onAdd = (map: Map) => {
      const res = onAdd(map, instance);
      update();
      return res;
    };
    instance.onRemove = (map: Map) => {
      onRemove?.(map, instance);
    };
    return instance;
  }

  function update() {
    const map = (_instance.value as any)?._map;
    if (!map) {
      return;
    }
    if (unref(_disabled)) {
      onDisable?.(map, _instance.value!);
    } else {
      onEnable?.(map, _instance.value!);
    }
  }

  useLeafletRemoveControl(_instance, {
    dispose
  });

  watch(_disabled, update);

  create();
  update();

  return _instance;
}
