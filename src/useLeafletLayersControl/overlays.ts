import { isNumber, resolveUnref, type MaybeComputedRef } from '@vueuse/shared';
import { type Layer, Util } from 'leaflet';
import { computed, toRaw, watch } from 'vue-demi';
import type { LayerEntry, LayersItemConfig } from './types';

export interface UseOverlayLayersOptions {
  current?: MaybeComputedRef<string[] | number[] | null | undefined>;
  changed?: (layers: LayerEntry[]) => void;
  add?: (layer: LayerEntry) => void;
  remove?: (layer: LayerEntry) => void;
  nameTemplate?: (index: number, layer: Layer) => string;
}

export function useOverlayLayers(
  layers: MaybeComputedRef<LayersItemConfig[] | null | undefined>,
  options: UseOverlayLayersOptions = {}
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
          overlay: true
        };
      });
  });

  const _current = computed<LayerEntry[]>(() => {
    const val = resolveUnref(current);
    if (!Array.isArray(val)) {
      return [];
    }

    const result: LayerEntry[] = [];
    for (const nameOrIndex of val) {
      let entry: LayersItemConfig | undefined = undefined;
      if (isNumber(nameOrIndex) && _layers.value[nameOrIndex]) {
        entry = _layers.value[nameOrIndex];
      } else {
        entry = _layers.value.find(item => item.name === nameOrIndex);
      }

      if (entry && resolveUnref(entry.layer)) {
        result.push({
          name: entry.name!,
          layer: toRaw(resolveUnref(entry.layer)!),
          overlay: true
        });
      }
    }

    return result;
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
    watch(
      () => [..._current.value],
      (_new, old) => {
        const toAdd = diff(_new, old, compare);
        const toRemove = diff(old, _new, compare);
        remove && toRemove.forEach(entry => remove(entry));
        add && toAdd.forEach(entry => add(entry));
      },
      { deep: true }
    );
  }

  function compare(a: LayerEntry, b: LayerEntry): boolean {
    return Util.stamp(a.layer) === Util.stamp(b.layer);
  }

  function diff<T>(
    arrA: T[],
    arrB: T[],
    compare: (a: T, b: T) => boolean
  ): T[] {
    return arrA.filter(a => !arrB.some(b => compare(a, b)));
  }

  return {
    layers: _layers,
    currentLayers: _current
  };
}
