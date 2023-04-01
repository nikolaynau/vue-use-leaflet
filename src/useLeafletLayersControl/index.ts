import {
  type MaybeComputedRef,
  type MaybeRef,
  isDefined,
  resolveRef
} from '@vueuse/shared';
import { type Ref, shallowRef, ref, markRaw, computed } from 'vue-demi';
import {
  Control,
  type Layer,
  type LayersControlEvent,
  type Map
} from 'leaflet';
import type {
  LayerEntry,
  LayersItemConfig,
  PrivateLayersControl
} from './types';
import { useBaseLayers } from './baseLayers';
import { useOverlayLayers } from './overlays';
import { useLeafletRemoveControl } from 'src/useLeafletRemoveControl';

export interface UseLeafletLayersControlOptions extends Control.LayersOptions {
  currentBaseLayer?: MaybeRef<string | number | null | undefined>;
  currentOverlays?: MaybeRef<string[] | number[] | null | undefined>;
  indexes?: boolean;
  factory?: (...args: unknown[]) => Control.Layers;
  dispose?: boolean;
}

export type UseLeafletLayersControlReturn = Ref<Control.Layers | null>;

export type { LayersItemConfig };

export function useLeafletLayersControl(
  layers: MaybeComputedRef<LayersItemConfig[] | null | undefined>,
  options: UseLeafletLayersControlOptions = {}
): UseLeafletLayersControlReturn {
  const {
    currentBaseLayer,
    currentOverlays,
    indexes = false,
    factory,
    dispose = true,
    ...controlOptions
  } = options;

  const _instance = shallowRef<Control.Layers | null>(null);
  const _currentBaseLayer = ref(currentBaseLayer);
  const _currentOverlays = ref(currentOverlays);
  const _layers = resolveRef(layers);

  const { layers: _baseLayers, currentLayer: _currentBaseEntry } =
    useBaseLayers(
      computed(() => _layers.value?.filter(({ overlay }) => !overlay)),
      {
        current: _currentBaseLayer,
        changed: layers => updateLayers(layers, false),
        add: entry => addToMap(entry.layer),
        remove: entry => removeFromMap(entry.layer)
      }
    );

  const { layers: _overlayLayers, currentLayers: _currentOverlayEntries } =
    useOverlayLayers(
      computed(() => _layers.value?.filter(({ overlay }) => overlay)),
      {
        current: _currentOverlays,
        changed: layers => updateLayers(layers, true),
        add: entry => addToMap(entry.layer),
        remove: entry => removeFromMap(entry.layer)
      }
    );

  function create() {
    const instance: Control.Layers = factory
      ? factory(controlOptions)
      : new Control.Layers(undefined, undefined, controlOptions);

    _instance.value = markRaw(addHooks(instance));
  }

  function init() {
    updateLayers(_baseLayers.value, false);
    updateLayers(_overlayLayers.value, true);
  }

  function addHooks(instance: Control.Layers): Control.Layers {
    const _superOnAdd = instance.onAdd;
    const _superOnRemove = instance.onRemove;

    instance.onAdd = (map: Map) => {
      const res = _superOnAdd!.call(instance, map);
      addEvents(map);
      onAddCallback(map);
      return res;
    };
    instance.onRemove = (map: Map) => {
      _superOnRemove!.call(instance, map);
      removeEvents(map);
    };
    return instance;
  }

  function onAddCallback(map: Map) {
    _currentBaseEntry.value && addToMap(_currentBaseEntry.value.layer, map);
    _currentOverlayEntries.value.forEach(({ layer }) => addToMap(layer, map));
  }

  function addEvents(map: Map) {
    map
      .on('baselayerchange', onBaseLayerChanged)
      .on('overlayadd', onOverlayAdd)
      .on('overlayremove', onOverlayRemove);
  }

  function removeEvents(map: Map) {
    map
      .off('baselayerchange', onBaseLayerChanged)
      .off('overlayadd', onOverlayAdd)
      .off('overlayremove', onOverlayRemove);
  }

  function onBaseLayerChanged(e: LayersControlEvent) {
    if (indexes) {
      _currentBaseLayer.value = findIndex(_baseLayers.value, e.layer);
    } else {
      _currentBaseLayer.value = e.name;
    }
  }

  function onOverlayAdd(e: LayersControlEvent) {
    if (!isDefined(_currentOverlays)) {
      _currentOverlays.value = [];
    }

    if (indexes) {
      const index = findIndex(_overlayLayers.value, e.layer);
      const arr = _currentOverlays.value as number[];
      if (index !== undefined && !arr.includes(index)) {
        arr.push(index);
      }
    } else {
      const arr = _currentOverlays.value as string[];
      !arr.includes(e.name) && arr.push(e.name);
    }
  }

  function onOverlayRemove(e: LayersControlEvent) {
    if (!isDefined(_currentOverlays)) {
      _currentOverlays.value = [];
    }

    if (indexes) {
      const arr = _currentOverlays.value as number[];
      const index = findIndex(_overlayLayers.value, e.layer);
      if (index !== undefined) {
        removeFromArray(arr, index);
      }
    } else {
      const arr = _currentOverlays.value as string[];
      removeFromArray(arr, e.name);
    }
  }

  function updateLayers(layers: LayerEntry[], overlay: boolean) {
    removeAllLayers(overlay);
    addAllLayers(layers);
    repaintControl();
  }

  function addAllLayers(layers: LayerEntry[]) {
    layers.forEach(entry => {
      (_instance.value as PrivateLayersControl)?._addLayer(
        entry.layer,
        entry.name,
        entry.overlay
      );
    });
  }

  function removeAllLayers(overlay: boolean) {
    const instance = _instance.value as PrivateLayersControl;
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

  function repaintControl() {
    const instance = _instance.value as PrivateLayersControl | null;
    if (instance?._map) {
      instance._update();
    }
  }

  function addToMap(layer: Layer, map?: Map) {
    map = map ?? (_instance.value as PrivateLayersControl)?._map;
    if (map && !map.hasLayer(layer)) {
      map.addLayer(layer);
    }
  }

  function removeFromMap(layer: Layer, map?: Map) {
    map = map ?? (_instance.value as PrivateLayersControl)?._map;
    if (map && map.hasLayer(layer)) {
      map.removeLayer(layer);
    }
  }

  function findIndex(layers: LayerEntry[], obj: Layer): number | undefined {
    const index = layers.findIndex(item => item.layer === obj);
    return index > -1 ? index : undefined;
  }

  function removeFromArray<T>(arr: T[], val: T) {
    const index = arr.indexOf(val);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }

  useLeafletRemoveControl(_instance, { dispose });

  create();
  init();

  return _instance;
}
