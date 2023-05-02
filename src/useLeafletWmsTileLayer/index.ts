import { type Ref } from 'vue-demi';
import { type MaybeRefOrGetter, toRef, notNullish } from '@vueuse/shared';
import { TileLayer, type WMSOptions, type WMSParams } from 'leaflet';
import type { UpdateWatchSource } from '../useLeafletLayer';
import { useLeafletTileLayer } from '../useLeafletTileLayer';

export interface UseLeafletWmsTileLayerOptions extends WMSOptions {
  updateSources?: UpdateWatchSource<TileLayer.WMS>[];
  factory?: (...args: any[]) => TileLayer.WMS;
  defParams?: WMSParams;
  dispose?: boolean;
}

export type UseLeafletWmsTileLayerReturn = Ref<TileLayer.WMS | null>;

export function useLeafletWmsTileLayer(
  url: MaybeRefOrGetter<string | null | undefined>,
  params?: MaybeRefOrGetter<WMSParams | null | undefined>,
  options: UseLeafletWmsTileLayerOptions = {}
): UseLeafletWmsTileLayerReturn {
  const {
    factory,
    updateSources = [],
    dispose,
    defParams = (TileLayer.WMS.prototype as any).defaultWmsParams,
    ...layerOptions
  } = options;

  const _params = toRef(params);

  if (notNullish(params)) {
    updateSources.push({
      watch: _params,
      options: { deep: true },
      handler: (instance, val) => {
        if (val) {
          instance.setParams(val);
        } else if (defParams) {
          instance.setParams(defParams);
        }
      }
    });
  }

  const _instance = useLeafletTileLayer(url, {
    factory: create as any,
    updateSources: updateSources as any,
    dispose,
    ...layerOptions,
    ..._params.value
  }) as Ref<TileLayer.WMS | null>;

  function create(url: string, options: WMSOptions) {
    return factory ? factory(url, options) : new TileLayer.WMS(url, options);
  }

  return _instance;
}
