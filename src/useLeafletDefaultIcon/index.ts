import { Icon, type IconOptions } from 'leaflet';
import type { MaybeRefOrGetter } from '@vueuse/shared';
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
  const {
    iconUrl = Icon.Default.prototype.options.iconUrl,
    factory = create,
    ...iconOptions
  } = options;

  function create(options: any): Icon {
    return new Icon.Default(
      options as Icon.DefaultIconOptions
    ) as Icon<IconOptions>;
  }

  return useLeafletIcon(iconUrl, {
    ...iconOptions,
    factory
  });
}
