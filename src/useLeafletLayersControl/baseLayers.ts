import { toValue, type MaybeRefOrGetter } from '@vueuse/shared';
import type { Layer } from 'leaflet';
import { computed, toRaw, watch } from 'vue-demi';
import type { LayerEntry, LayersItemConfig } from './types';

export interface UseBaseLayersOptions {
  current?: MaybeRefOrGetter<string | number | null | undefined>;
  changed?: (layers: LayerEntry[]) => void;
  add?: (layer: LayerEntry) => void;
  remove?: (layer: LayerEntry) => void;
  nameTemplate?: (index: number, layer: Layer) => string;
}

export function useBaseLayers(
  layers: MaybeRefOrGetter<LayersItemConfig[] | null | undefined>,
  options: UseBaseLayersOptions = {}
) {
  const { current, changed, add, remove, nameTemplate = i => `${i}` } = options;

  const _layers = computed(() => {
    if (!Array.isArray(toValue(layers))) {
      return [];
    }

    return toValue(layers)!
      .filter(item => !!toValue(item.layer))
      .map((item, i) => {
        const layer = toRaw(toValue(item.layer)!);

        return {
          name: item.name ?? nameTemplate(i + 1, layer),
          layer: toRaw(toValue(item.layer)!),
          overlay: false
        };
      });
  });

  const _current = computed<LayerEntry | null>(() => {
    const val = toValue(current);
    if (val == null) {
      return null;
    }

    const byIndex = typeof val === 'number';
    const entry: LayersItemConfig | undefined = byIndex
      ? _layers.value[val as number]
      : _layers.value.find(item => item.name === val);

    if (!entry || !toValue(entry.layer)) {
      return null;
    }

    return {
      name: entry.name!,
      layer: toRaw(toValue(entry.layer)!),
      overlay: false
    };
  });

  if (changed) {
    watch(
      _layers,
      val => {
        changed(val);
      },
      { deep: true }
    );
  }

  if (add || remove) {
    watch(_current, (_new, old) => {
      old && remove?.(old);
      _new && add?.(_new);
    });
  }

  return {
    layers: _layers,
    currentLayer: _current
  };
}
