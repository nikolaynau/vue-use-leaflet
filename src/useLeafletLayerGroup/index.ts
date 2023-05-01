import { computed, type Ref } from 'vue-demi';
import {
  type Arrayable,
  type MaybeRefOrGetter,
  notNullish,
  toValue
} from '@vueuse/shared';
import { Layer, LayerGroup, Util, type LayerOptions } from 'leaflet';
import { useLeafletLayer, type UpdateWatchSource } from '../useLeafletLayer';
import { useLeafletDiff, type ArrayDiffFunction } from '../useLeafletDiff';

export interface UseLeafletLayerGroupOptions extends LayerOptions {
  diff?: ArrayDiffFunction<Layer> | boolean;
  compareFn?: (value: Layer, othVal: Layer) => boolean;
  updateSources?: UpdateWatchSource<LayerGroup>[];
  factory?: (...args: unknown[]) => LayerGroup;
  dispose?: boolean;
}

export type UseLeafletLayerGroupReturn = Ref<LayerGroup | null>;

export function useLeafletLayerGroup(
  layers: MaybeRefOrGetter<
    Arrayable<MaybeRefOrGetter<Layer | null | undefined>> | null | undefined
  >,
  options: UseLeafletLayerGroupOptions = {}
): UseLeafletLayerGroupReturn {
  const { diff, compareFn, factory, updateSources, dispose, ...layerOptions } =
    options;

  const _layers = computed<Layer[]>(() => {
    const val = toValue(layers);
    if (!notNullish(val)) {
      return [];
    }
    const valArr = toArray(val);
    const newArr = new Array(valArr.length);
    for (let i = 0, len = valArr.length; i < len; i++) {
      const item = toValue(valArr[i]);
      if (notNullish(item)) {
        newArr.push(item);
      }
    }
    return newArr;
  });

  const _instance = useLeafletLayer(create, {
    updateSources,
    dispose
  });

  useLeafletDiff(_layers, compareFn ?? compare, {
    enabled: diff !== false,
    diffFn: typeof diff === 'function' ? diff : undefined,
    update: clearAndAdd,
    add,
    remove
  });

  function create() {
    return factory
      ? factory(_layers.value, layerOptions)
      : new LayerGroup(_layers.value, layerOptions);
  }

  function clearAndAdd(layers: Layer[]) {
    _instance.value?.clearLayers();
    add(layers);
  }

  function add(layers: Layer[]) {
    for (let i = 0, len = layers.length; i < len; i++) {
      _instance.value?.addLayer(layers[i]);
    }
  }

  function remove(layers: Layer[]) {
    for (let i = 0, len = layers.length; i < len; i++) {
      _instance.value?.removeLayer(layers[i]);
    }
  }

  function compare(a: Layer, b: Layer): boolean {
    return Util.stamp(a) === Util.stamp(b);
  }

  function toArray<T>(value: Arrayable<T>): T[] {
    return Array.isArray(value) ? value : [value];
  }

  return _instance;
}
