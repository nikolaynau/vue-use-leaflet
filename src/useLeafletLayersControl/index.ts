import {
  type MaybeComputedRef,
  type MaybeRef,
  tryOnUnmounted,
  isDefined,
  resolveUnref,
  resolveRef
} from '@vueuse/shared';
import {
  type Ref,
  shallowRef,
  ref,
  toRaw,
  markRaw,
  watch,
  computed
} from 'vue-demi';
import {
  Control,
  type Layer,
  type LayersControlEvent,
  type Map
} from 'leaflet';

export interface UseLeafletLayersControlOptions extends Control.LayersOptions {
  currentBaseLayer?: MaybeRef<string | null | undefined>;
  currentOverlays?: MaybeRef<string[] | null | undefined>;
  factory?: (...args: unknown[]) => Control.Layers;
  dispose?: boolean;
}

export type UseLeafletLayersControlReturn = Ref<Control.Layers | null>;

export interface LayersObject {
  [name: string]: MaybeComputedRef<Layer | null | undefined>;
}

interface LayerEntry {
  name: string;
  layer: Layer;
  overlay: boolean;
}

interface PrivateControl extends Control.Layers {
  _addLayer(layer: Layer, name: string, overlay: boolean): this;
  _onLayerChange(): void;
  _layers: LayerEntry[];
  _map: Map;
  _update(): void;
}

export function useLeafletLayersControl(
  baseLayers?: MaybeComputedRef<LayersObject | null | undefined>,
  overlays?: MaybeComputedRef<LayersObject | null | undefined>,
  options: UseLeafletLayersControlOptions = {}
): UseLeafletLayersControlReturn {
  const {
    currentBaseLayer,
    currentOverlays,
    factory,
    dispose = true,
    ...controlOptions
  } = options;

  const _instance = shallowRef<Control.Layers | null>(null);
  const _currentBaseLayer = ref(currentBaseLayer);
  const _currentOverlays = ref(currentOverlays);
  const _baseLayers = resolveRef(baseLayers);
  const _overlays = resolveRef(overlays);

  const _currentBaseObject = computed(() =>
    isDefined(_baseLayers) && isDefined(_currentBaseLayer)
      ? (_baseLayers.value[_currentBaseLayer.value] as Layer | null | undefined)
      : undefined
  );

  const _currentOverlayObjects = computed(() => {
    if (isDefined(_overlays) && isDefined(_currentOverlays)) {
      const obj = _overlays.value;
      return _currentOverlays.value
        .map(k => obj[k] as Layer)
        .filter(v => isDefined(v));
    }
    return [];
  });

  function create() {
    const instance: Control.Layers = factory
      ? factory(raw(_baseLayers), raw(_overlays), controlOptions)
      : new Control.Layers(raw(_baseLayers), raw(_overlays), controlOptions);

    _instance.value = markRaw(addHooks(instance));
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
    repaint();
  }

  function addAll(layers: LayerEntry[]) {
    layers.forEach(entry => {
      (_instance.value as PrivateControl)?._addLayer(
        entry.layer,
        entry.name,
        entry.overlay
      );
    });
  }

  function removeAll(overlay: boolean) {
    if (!isDefined(_instance)) {
      return;
    }
    const instance = _instance.value as PrivateControl;
    const layers = instance._layers;
    const baseLayers: LayerEntry[] = [];
    const overlays: LayerEntry[] = [];

    layers.forEach(entry => {
      if (entry.overlay) {
        overlays.push(entry);
      } else {
        baseLayers.push(entry);
      }
    });

    (overlay ? overlays : baseLayers).forEach(entry => {
      entry.layer?.off('add remove', instance._onLayerChange, instance);
    });

    instance._layers = [...(overlay ? baseLayers : overlays)];
  }

  function repaint() {
    const instance = _instance.value as PrivateControl | null;
    if (instance?._map) {
      instance._update();
    }
  }

  function addHooks(instance: Control.Layers): Control.Layers {
    const _superOnAdd = instance.onAdd;
    const _superOnRemove = instance.onRemove;

    instance.onAdd = (map: Map) => {
      const res = _superOnAdd!.call(instance, map);
      addEvents(map);
      onAdd(map);
      return res;
    };
    instance.onRemove = (map: Map) => {
      _superOnRemove!.call(instance, map);
      removeEvents(map);
    };
    return instance;
  }

  function addEvents(map: Map) {
    map
      .on('baselayerchange', onBaseLayer)
      .on('overlayadd', onOverlayAdd)
      .on('overlayremove', onOverlayRemove);
  }

  function removeEvents(map: Map) {
    map
      .off('baselayerchange', onBaseLayer)
      .off('overlayadd', onOverlayAdd)
      .off('overlayremove', onOverlayRemove);
  }

  function onBaseLayer(e: LayersControlEvent) {
    _currentBaseLayer.value = e.name;
  }

  function onOverlayAdd(e: LayersControlEvent) {
    if (!isDefined(_currentOverlays)) {
      _currentOverlays.value = [];
    }
    if (!_currentOverlays.value!.includes(e.name)) {
      _currentOverlays.value!.push(e.name);
    }
  }

  function onOverlayRemove(e: LayersControlEvent) {
    if (_currentOverlays.value?.includes(e.name)) {
      const index = _currentOverlays.value!.indexOf(e.name);
      if (index > -1) {
        _currentOverlays.value!.splice(index, 1);
      }
    }
  }

  function onAdd(map: Map) {
    if (isDefined(_currentBaseObject)) {
      addTo(rawObj(_currentBaseObject) as Layer, map);
    }
    _currentOverlayObjects.value.forEach(layer => {
      addTo(rawObj(layer), map);
    });
  }

  function addTo(layer: Layer, map?: Map) {
    const instance = _instance.value as PrivateControl | null;
    map = map ?? instance?._map;
    if (map && !map.hasLayer(layer)) {
      map.addLayer(layer);
    }
  }

  function removeFrom(layer: Layer, map?: Map) {
    const instance = _instance.value as PrivateControl | null;
    map = map ?? instance?._map;
    if (map && map.hasLayer(layer)) {
      map.removeLayer(layer);
    }
  }

  function raw<T = any>(obj: any): T {
    return filter(resolveUnref(obj) ?? {}) as T;
  }

  function rawObj<T = any>(layer: MaybeComputedRef<T>): T {
    return toRaw(resolveUnref(layer));
  }

  function filter(obj: Record<string, unknown>) {
    const res: Record<string, unknown> = {};
    Object.keys(obj).forEach(key => {
      if (isDefined(obj[key])) {
        res[key] = rawObj(obj[key]);
      }
    });
    return res;
  }

  function diff<T>(arrA: T[], arrB: T[]): T[] {
    return arrA.filter(x => !arrB.includes(x));
  }

  function clean() {
    if (isDefined(_instance)) {
      _instance.value.remove();
      (_instance as Ref<Control.Layers | null>).value = null;
    }
  }

  if (dispose) {
    tryOnUnmounted(() => {
      clean();
    });
  }

  watch(
    _baseLayers,
    () => {
      sync(raw(_baseLayers), false);
    },
    { deep: true }
  );

  watch(
    _overlays,
    () => {
      sync(raw(_overlays), true);
    },
    { deep: true }
  );

  watch(_currentBaseObject, (_new, old) => {
    old && removeFrom(rawObj(old));
    _new && addTo(rawObj(_new));
  });

  watch(
    () => [..._currentOverlayObjects.value],
    (_new, old) => {
      const add = diff(_new, old);
      const remove = diff(old, _new);
      remove.forEach(layer => removeFrom(rawObj(layer)));
      add.forEach(layer => addTo(rawObj(layer)));
    },
    { deep: true }
  );

  create();

  return _instance;
}
