import type { Ref } from 'vue-demi';
import { type MaybeComputedRef, resolveRef } from '@vueuse/shared';
import { TileLayer, type TileLayerOptions } from 'leaflet';
import { useLeafletLayer } from '../useLeafletLayer';

export interface UseLeafletTileLayerOptions extends TileLayerOptions {
  update?: (insatnce: TileLayer | null) => void;
  factory?: (...args: unknown[]) => TileLayer;
  dispose?: boolean;
}

export type UseLeafletTileLayerReturn = Ref<TileLayer | null>;

export function useLeafletTileLayer(
  url: MaybeComputedRef<string | null | undefined>,
  options: UseLeafletTileLayerOptions = {}
): UseLeafletTileLayerReturn {
  const { factory, update, dispose, ...layerOptions } = options;

  const _url = resolveRef(url);

  return useLeafletLayer(
    () =>
      factory
        ? factory(_url.value, layerOptions)
        : new TileLayer(_url.value!, layerOptions),
    {
      watch: _url,
      update: instance => {
        _url.value && instance?.setUrl(_url.value);
        update?.(instance);
      },
      dispose
    }
  );
}
