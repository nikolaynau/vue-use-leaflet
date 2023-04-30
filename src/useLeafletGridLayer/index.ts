import type { Ref } from 'vue-demi';
import {
  GridLayer,
  type Coords,
  type DoneCallback,
  type GridLayerOptions
} from 'leaflet';
import { type UpdateWatchSource, useLeafletLayer } from '../useLeafletLayer';

export interface UseLeafletGridLayerOptions<T extends GridLayer = GridLayer>
  extends GridLayerOptions {
  updateSources?: UpdateWatchSource<T>[];
  factory?: (...args: unknown[]) => T;
  dispose?: boolean;
}

export type UseLeafletGridLayerReturn<T extends GridLayer = GridLayer> =
  Ref<T | null>;

export function useLeafletGridLayer<T extends GridLayer = GridLayer>(
  createTile: (coords: Coords, done?: DoneCallback) => HTMLElement,
  options: UseLeafletGridLayerOptions<T> = {}
): UseLeafletGridLayerReturn<T> {
  const { factory, updateSources, dispose, ...gridOptions } = options;

  const _instance = useLeafletLayer(create, {
    updateSources,
    dispose
  });

  function create(): T {
    if (factory) {
      return factory(createTile, gridOptions);
    } else {
      const ExtendedClass = GridLayer.extend({ createTile }) as {
        new (options: GridLayerOptions): any;
      };
      return new ExtendedClass(gridOptions);
    }
  }

  return _instance;
}
