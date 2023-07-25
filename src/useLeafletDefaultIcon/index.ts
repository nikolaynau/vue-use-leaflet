import { Icon, type IconOptions } from 'leaflet';
import { toRef, toValue, type MaybeRefOrGetter } from '@vueuse/shared';
import {
  useLeafletIcon,
  type UseLeafletIconOptions,
  type UseLeafletIconReturn
} from '../useLeafletIcon';

export interface UseLeafletDefaultIconOptions extends UseLeafletIconOptions {
  iconUrl?: MaybeRefOrGetter<string | null | undefined>;
  imagePath?: string | undefined;
}

export type UseLeafletDefaultIconReturn = UseLeafletIconReturn;

export function useLeafletDefaultIcon(
  options: UseLeafletDefaultIconOptions = {}
): UseLeafletDefaultIconReturn {
  const { iconUrl, factory = create, ...iconOptions } = options;

  const _iconUrl = toRef(
    () => toValue(iconUrl) ?? Icon.Default.prototype.options.iconUrl
  );

  function create(options: any): Icon {
    return new Icon.Default(
      options as Icon.DefaultIconOptions
    ) as Icon<IconOptions>;
  }

  return useLeafletIcon(_iconUrl, {
    ...iconOptions,
    factory
  });
}
