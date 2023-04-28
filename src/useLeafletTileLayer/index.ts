import { type Ref } from 'vue-demi';
import { type MaybeRefOrGetter, toRef } from '@vueuse/shared';
import { TileLayer, type TileLayerOptions } from 'leaflet';
import { useLeafletLayer, type UpdateWatchSource } from '../useLeafletLayer';

export interface UseLeafletTileLayerOptions extends TileLayerOptions {
  updateSources?: UpdateWatchSource<TileLayer>[];
  factory?: (...args: unknown[]) => TileLayer;
  dispose?: boolean;
}

export type UseLeafletTileLayerReturn = Ref<TileLayer | null>;

export function useLeafletTileLayer(
  url: MaybeRefOrGetter<string | null | undefined>,
  options: UseLeafletTileLayerOptions = {}
): UseLeafletTileLayerReturn {
  const { factory, updateSources = [], dispose, ...layerOptions } = options;

  const _url = toRef(url);

  updateSources.push({
    watch: _url,
    handler: (instance, val) => {
      if (val != null) {
        instance.setUrl(val);
      }
    }
  });

  const _instance = useLeafletLayer(create, {
    watch: _url,
    updateSources,
    dispose
  });

  function create() {
    return factory
      ? factory(_url.value!, layerOptions)
      : new TileLayer(_url.value!, layerOptions);
  }

  return _instance;
}
