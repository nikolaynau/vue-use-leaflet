import {
  isDefined,
  isNumber,
  resolveRef,
  resolveUnref,
  type MaybeComputedRef
} from '@vueuse/shared';
import { computed, toRaw, unref, watch } from 'vue-demi';
import type { LayerEntry, LayerConfig } from './types';

export interface UseBaseLayersOptions {
  current?: MaybeComputedRef<string | number | null | undefined>;
  changed?: (layers: LayerEntry[]) => void;
  add?: (layer: LayerEntry) => void;
  remove?: (layer: LayerEntry) => void;
}

export function useBaseLayers(
  layers: MaybeComputedRef<LayerConfig[] | null | undefined>,
  options: UseBaseLayersOptions = {}
) {
  const { current, changed, add, remove } = options;

  const _layers = resolveRef(layers);

  const _current = computed<LayerEntry | null>(() => {
    const val = resolveUnref(current);
    if (!Array.isArray(unref(_layers)) || !val) {
      return null;
    }

    const byIndex = isNumber(val);
    let entry: LayerConfig | undefined = undefined;

    if (byIndex) {
      entry = unref(_layers)![val as number];
    } else {
      entry = unref(_layers)!.find(item => item.name === val);
    }

    if (!entry || !isDefined(entry.layer)) {
      return null;
    }

    return {
      name: entry.name ?? `${val}`,
      layer: toRaw(resolveUnref(entry.layer)!),
      overlay: false
    };
  });

  watch(
    _layers,
    val => {
      changed?.(
        (val ?? [])
          .filter(item => isDefined(item.layer))
          .map((item, i) => ({
            name: item.name ?? `${i + 1}`,
            layer: toRaw(resolveUnref(item.layer)!),
            overlay: false
          }))
      );
    },
    { deep: true }
  );

  watch(_current, (_new, old) => {
    old && remove?.(old);
    _new && add?.(_new);
  });

  return {
    layers: _layers,
    current: _current
  };
}
