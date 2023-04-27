import { shallowRef, type Ref, markRaw } from 'vue-demi';
import { Icon, type IconOptions } from 'leaflet';

export interface UseLeafletIconOptions extends Omit<IconOptions, 'iconUrl'> {
  factory?: (...args: unknown[]) => Icon;
}

export type UseLeafletIconReturn = Ref<Icon | null>;

export function useLeafletIcon(
  iconUrl: string,
  options: UseLeafletIconOptions = {}
): UseLeafletIconReturn {
  const { factory, ...iconOptions } = options;

  const _instance = shallowRef<Icon | null>(null);

  function create() {
    const icon =
      typeof factory === 'function'
        ? factory(makeOptions())
        : new Icon(makeOptions());

    _instance.value = markRaw(icon);
  }

  function makeOptions(): IconOptions {
    return { iconUrl, ...iconOptions };
  }

  create();

  return _instance;
}
