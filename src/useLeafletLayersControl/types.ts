import type { MaybeComputedRef } from '@vueuse/shared';
import type { Control, Layer, Map } from 'leaflet';

export interface LayersItemConfig {
  name?: string;
  layer?: MaybeComputedRef<Layer | null | undefined>;
  overlay?: boolean;
}

export interface PrivateLayersControl extends Control.Layers {
  _addLayer(layer: Layer, name: string, overlay: boolean): this;
  _onLayerChange(): void;
  _layers: LayerEntry[];
  _map: Map;
  _update(): void;
}

export interface LayerEntry {
  name: string;
  layer: Layer;
  overlay: boolean;
}
