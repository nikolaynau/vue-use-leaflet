import { isDefined, type MaybeComputedRef } from '@vueuse/shared';
import { TileLayer, type TileLayerOptions } from 'leaflet';
import { unref } from 'vue-demi';
import { useLeafletLayer } from '../useLeafletLayer';

export interface UseLeafletTileLayerOptions extends TileLayerOptions {
  factory?: (...args: unknown[]) => TileLayer;
  dispose?: boolean;
}

export function useLeafletTileLayer(
  url: MaybeComputedRef<string | null | undefined>,
  options: UseLeafletTileLayerOptions = {}
) {
  const { factory, dispose, ...layerOptions } = options;
  return useLeafletLayer<TileLayer>({
    create: () => {
      if (!isDefined(url)) {
        return null;
      }
      if (factory) {
        return factory(unref(url), layerOptions);
      } else {
        return new TileLayer(unref(url) as string, layerOptions);
      }
    },
    update: instance => {
      if (!isDefined(url)) {
        return null;
      }
      return instance.setUrl(unref(url) as string);
    },
    dispose
  });
}

export type UseLeafletTileLayerReturn = ReturnType<typeof useLeafletTileLayer>;
