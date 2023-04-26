import { type Ref, watch } from 'vue-demi';
import { type MaybeRefOrGetter, toRef } from '@vueuse/shared';
import { TileLayer, type TileLayerOptions } from 'leaflet';
import { useLeafletLayer } from '../useLeafletLayer';

export interface UseLeafletTileLayerOptions extends TileLayerOptions {
  update?: (instance: TileLayer | null) => void;
  factory?: (...args: unknown[]) => TileLayer;
  dispose?: boolean;
}

export type UseLeafletTileLayerReturn = Ref<TileLayer | null>;

export function useLeafletTileLayer(
  url: MaybeRefOrGetter<string | null | undefined>,
  options: UseLeafletTileLayerOptions = {}
): UseLeafletTileLayerReturn {
  const { factory, update, dispose, ...layerOptions } = options;

  const _url = toRef(url);

  const _instance = useLeafletLayer(create, {
    watch: _url,
    update,
    dispose
  });

  function create() {
    return factory
      ? factory(_url.value!, layerOptions)
      : new TileLayer(_url.value!, layerOptions);
  }

  watch(_url, val => {
    if (val != null) {
      _instance.value?.setUrl(val);
    }
  });

  return _instance;
}
