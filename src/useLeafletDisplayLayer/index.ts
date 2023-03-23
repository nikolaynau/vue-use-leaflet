import type { Arrayable, MaybeComputedRef } from '@vueuse/shared';
import type { Layer } from 'leaflet';
import {
  type UseLeafletDisplayObjectOptions,
  type UseLeafletDisplayObjectReturn,
  type UseLeafletDisplayObjectReturnWithControls,
  useLeafletDisplayObject
} from '../useLeafletDisplayObject';

export type UseLeafletDisplayLayerOptions<Controls extends boolean> = Omit<
  UseLeafletDisplayObjectOptions<Controls, LeafletDisplayLayer, Layer>,
  'show' | 'hide' | 'shown'
>;

export interface LeafletDisplayLayer {
  addLayer(layer: Layer): this;
  removeLayer(layer: Layer): this;
  hasLayer(layer: Layer): boolean;
}

export type UseLeafletDisplayLayerReturn = UseLeafletDisplayObjectReturn;

export type UseLeafletDisplayLayerReturnWithControls =
  UseLeafletDisplayObjectReturnWithControls;

export function useLeafletDisplayLayer(
  source: MaybeComputedRef<LeafletDisplayLayer | null | undefined>,
  target: MaybeComputedRef<Arrayable<Layer> | null | undefined>,
  options?: UseLeafletDisplayLayerOptions<false>
): UseLeafletDisplayLayerReturn;
export function useLeafletDisplayLayer(
  source: MaybeComputedRef<LeafletDisplayLayer | null | undefined>,
  target: MaybeComputedRef<Arrayable<Layer> | null | undefined>,
  options: UseLeafletDisplayLayerOptions<true>
): UseLeafletDisplayLayerReturnWithControls;
export function useLeafletDisplayLayer(
  source: MaybeComputedRef<LeafletDisplayLayer | null | undefined>,
  target: MaybeComputedRef<Arrayable<Layer> | null | undefined>,
  options: UseLeafletDisplayLayerOptions<boolean> = {}
): UseLeafletDisplayLayerReturn | UseLeafletDisplayLayerReturnWithControls {
  return useLeafletDisplayObject(source, target, {
    ...(options as any),
    show: (source, target) => {
      Array.isArray(target)
        ? target.forEach(item => {
            source.addLayer(item);
          })
        : source.addLayer(target);
    },
    hide: (source, target) => {
      Array.isArray(target)
        ? target.forEach(item => {
            source.removeLayer(item);
          })
        : source.removeLayer(target);
    },
    shown: (source, target) =>
      Array.isArray(target)
        ? target.every(item => source.hasLayer(item))
        : source.hasLayer(target)
  });
}
