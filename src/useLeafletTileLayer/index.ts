import { resolveUnref, type MaybeComputedRef } from '@vueuse/shared';
import { TileLayer, type TileLayerOptions } from 'leaflet';
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
      if (!resolveUnref(url)) {
        return null;
      }
      if (factory) {
        return factory(resolveUnref(url), layerOptions);
      } else {
        return new TileLayer(resolveUnref(url) as string, layerOptions);
      }
    },
    update: instance =>
      resolveUnref(url) ? instance.setUrl(resolveUnref(url)!) : null,
    dispose
  });
}

export type UseLeafletTileLayerReturn = ReturnType<typeof useLeafletTileLayer>;
