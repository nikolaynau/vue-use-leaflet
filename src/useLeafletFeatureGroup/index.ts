import type { Ref } from 'vue-demi';
import type { Arrayable, MaybeRefOrGetter } from '@vueuse/shared';
import {
  FeatureGroup,
  LayerGroup,
  type Layer,
  type LayerOptions
} from 'leaflet';
import {
  useLeafletLayerGroup,
  type UseLeafletLayerGroupOptions
} from '../useLeafletLayerGroup';

export type UseLeafletFeatureGroupOptions = UseLeafletLayerGroupOptions;

export type UseLeafletFeatureGroupReturn = Ref<FeatureGroup | null>;

export function useLeafletFeatureGroup(
  layers: MaybeRefOrGetter<
    Arrayable<MaybeRefOrGetter<Layer | null | undefined>> | null | undefined
  >,
  options: UseLeafletFeatureGroupOptions = {}
): UseLeafletFeatureGroupReturn {
  const { factory = create, ..._options } = options;

  const _instance = useLeafletLayerGroup(layers, {
    factory,
    ..._options
  }) as Ref<FeatureGroup | null>;

  function create(
    layers: Layer[] | undefined,
    options: LayerOptions
  ): LayerGroup {
    return new FeatureGroup(layers, options);
  }

  return _instance;
}
