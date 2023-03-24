import { isNumber, resolveUnref, type MaybeComputedRef } from '@vueuse/shared';
import type { Layer } from 'leaflet';
import { computed, toRaw, watch } from 'vue-demi';
import type { LayerEntry, LayersItemConfig } from './types';

export interface UseBaseLayersOptions {
  current?: MaybeComputedRef<string | number | null | undefined>;
  changed?: (layers: LayerEntry[]) => void;
  add?: (layer: LayerEntry) => void;
  remove?: (layer: LayerEntry) => void;
  nameTemplate?: (index: number, layer: Layer) => string;
}

export function useBaseLayers(
  layers: MaybeComputedRef<LayersItemConfig[] | null | undefined>,
  options: UseBaseLayersOptions = {}
) {
  const { current, changed, add, remove, nameTemplate = i => `${i}` } = options;

  const _layers = computed(() => {
    if (!Array.isArray(resolveUnref(layers))) {
      return [];
    }

    return resolveUnref(layers)!
      .filter(item => !!resolveUnref(item.layer))
      .map((item, i) => {
        const layer = toRaw(resolveUnref(item.layer)!);

        return {
          name: item.name ?? nameTemplate(i + 1, layer),
          layer: toRaw(resolveUnref(item.layer)!),
          overlay: false
        };
      });
  });

  const _current = computed<LayerEntry | null>(() => {
    const val = resolveUnref(current);
    if (val == null) {
      return null;
    }

    const byIndex = isNumber(val);
    const entry: LayersItemConfig | undefined = byIndex
      ? _layers.value[val as number]
      : _layers.value.find(item => item.name === val);

    if (!entry || !resolveUnref(entry.layer)) {
      return null;
    }

    return {
      name: entry.name!,
      layer: toRaw(resolveUnref(entry.layer)!),
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
