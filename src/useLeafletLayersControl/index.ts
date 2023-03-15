import {
  type MaybeComputedRef,
  type MaybeRef,
  tryOnUnmounted,
  isDefined,
  resolveUnref
} from '@vueuse/shared';
import {
  type UnwrapNestedRefs,
  type ShallowRef,
  type Ref,
  shallowRef,
  ref,
  toRaw,
  markRaw,
  watch,
  unref
} from 'vue-demi';
import { Control, type Layer, type Map } from 'leaflet';

export interface UseLeafletLayersControlOptions extends Control.LayersOptions {
  currentBaseLayer?: MaybeRef<string | null | undefined>;
  currentOverlays?: MaybeRef<string[] | null | undefined>;
  factory?: (...args: unknown[]) => Control.Layers;
  dispose?: boolean;
}

export type UseLeafletLayersControlReturn = Ref<Control.Layers | null>;

export interface NullableLayersObject {
  [name: string]: MaybeComputedRef<Layer | null | undefined>;
}

export type MaybeReactiveLayersObject =
  | UnwrapNestedRefs<NullableLayersObject>
  | MaybeComputedRef<NullableLayersObject | null | undefined>;

interface LayerEntry {
  name: string;
  layer: Layer;
  overlay: boolean;
}

export function useLeafletLayersControl(
  baseLayers?: MaybeReactiveLayersObject | null | undefined,
  overlays?: MaybeReactiveLayersObject | null | undefined,
  options: UseLeafletLayersControlOptions = {}
): UseLeafletLayersControlReturn {
  const {
    currentBaseLayer,
    currentOverlays,
    factory,
    dispose = true,
    ...controlOptions
  } = options;

  const instance = shallowRef<Control.Layers | null>(null);
  const currentBaseLayerRef = ref(currentBaseLayer);
  const currentOverlaysRef = ref(currentOverlays);

  function create() {
    const _baseLayers = toRawObject<Control.LayersObject>(baseLayers);
    const _overlays = toRawObject<Control.LayersObject>(overlays);
    let _instance: Control.Layers | null = null;

    if (factory) {
      _instance = factory(_baseLayers, _overlays, controlOptions);
    } else {
      _instance = new Control.Layers(_baseLayers, _overlays, controlOptions);
    }

    if (isDefined(_instance)) {
      instance.value = markRaw(addHook(_instance));
    }
  }

  function toRawObject<T = any>(obj: any): T {
    return filter(resolveUnref(obj) ?? {}) as T;
  }

  function filter(obj: Record<string, unknown>) {
    const res: Record<string, unknown> = {};
    Object.keys(obj).forEach(key => {
      if (isDefined(obj[key])) {
        res[key] = toRaw(resolveUnref(obj[key]));
      }
    });
    return res;
  }

  function sync(layers: Control.LayersObject, overlay: boolean) {
    removeAll(overlay);
    addAll(
      Object.keys(layers).map(key => ({
        name: key,
        layer: layers[key],
        overlay
      }))
    );
    update(overlay);
    redraw();
  }

  function removeAll(overlay: boolean) {
    if (!isDefined(instance)) {
      return;
    }
    const _instance = instance.value as any;
    const _layers = _instance._layers as LayerEntry[];
    const _baseLayers: LayerEntry[] = [];
    const _overlays: LayerEntry[] = [];

    _layers.forEach(entry => {
      if (entry.overlay) {
        _overlays.push(entry);
      } else {
        _baseLayers.push(entry);
      }
    });

    (overlay ? _overlays : _baseLayers).forEach(entry => {
      entry.layer?.off('add remove', _instance._onLayerChange, _instance);
    });
    _instance._layers = [...(overlay ? _baseLayers : _overlays)];
  }

  function addAll(layers: LayerEntry[]) {
    if (!isDefined(instance)) {
      return;
    }
    const _instance = instance.value as any;
    layers.forEach(entry => {
      _instance._addLayer(entry.layer, entry.name, entry.overlay);
    });
  }

  function redraw() {
    if (!isDefined(instance)) {
      return;
    }
    const _instance = instance.value as any;
    if (_instance._map) {
      _instance._update();
    }
  }

  function update(overlay: boolean) {
    if (!isDefined(instance)) {
      return;
    }
    const _instance = instance.value as any;
    const map = _instance._map as Map;
    if (!map) {
      return;
    }

    const _layers = _instance._layers as LayerEntry[];
    const _currBaseLayer = unref(currentBaseLayer);
    const _currOverlays = unref(currentOverlays);

    for (let i = 0; i < _layers.length; i++) {
      const { name, layer, overlay: _overlay } = _layers[i];
      if (!!_overlay !== overlay) {
        continue;
      }

      const checked = map.hasLayer(layer);
      if (
        (!overlay && _currBaseLayer === name) ||
        (overlay && _currOverlays && _currOverlays.includes(name))
      ) {
        if (!checked) {
          map.addLayer(layer);
        }
      } else {
        if (checked) {
          map.removeLayer(layer);
        }
      }
    }
  }

  function updateAll() {
    update(false);
    update(true);
  }

  function addHook(instance: Control.Layers): Control.Layers {
    const _superOnAdd = instance.addTo;

    instance.addTo = (map: Map) => {
      _superOnAdd.call(instance, map);
      updateAll();
      return instance;
    };
    return instance;
  }

  function clean() {
    if (isDefined(instance)) {
      instance.value.remove();
      (instance as ShallowRef<Control.Layers | null>).value = null;
    }
  }

  if (dispose) {
    tryOnUnmounted(() => {
      clean();
    });
  }

  watch(
    () => resolveUnref(baseLayers),
    () => {
      sync(toRawObject(baseLayers), false);
    },
    { deep: true }
  );

  watch(
    () => resolveUnref(overlays),
    () => {
      sync(toRawObject(overlays), true);
    },
    { deep: true }
  );

  watch(currentBaseLayerRef, () => {
    update(false);
  });

  watch(
    currentOverlaysRef,
    () => {
      update(true);
    },
    { deep: true }
  );

  create();

  return instance;
}
