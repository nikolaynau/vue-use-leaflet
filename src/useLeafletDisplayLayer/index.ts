import type { MaybeComputedRef } from '@vueuse/shared';
import type { Layer } from 'leaflet';
import {
  type UseLeafletToggleObjectOptions,
  type UseLeafletToggleObjectReturn,
  type UseLeafletToggleObjectReturnWithControls,
  useLeafletToggleObject
} from '../useLeafletToggleObject';

export type UseLeafletDisplayLayerOptions<Controls extends boolean> = Omit<
  UseLeafletToggleObjectOptions<Controls, LeafletDisplayLayer, Layer>,
  'add' | 'remove' | 'has'
>;

export interface LeafletDisplayLayer {
  addLayer(layer: Layer): this;
  removeLayer(layer: Layer): this;
  hasLayer(layer: Layer): boolean;
}

export type UseLeafletDisplayLayerReturn = UseLeafletToggleObjectReturn;

export type UseLeafletDisplayLayerReturnWithControls =
  UseLeafletToggleObjectReturnWithControls;

export function useLeafletDisplayLayer(
  source: MaybeComputedRef<LeafletDisplayLayer | null | undefined>,
  target: MaybeComputedRef<Layer | null | undefined>,
  options?: UseLeafletDisplayLayerOptions<false>
): UseLeafletDisplayLayerReturn;
export function useLeafletDisplayLayer(
  source: MaybeComputedRef<LeafletDisplayLayer | null | undefined>,
  target: MaybeComputedRef<Layer | null | undefined>,
  options: UseLeafletDisplayLayerOptions<true>
): UseLeafletDisplayLayerReturnWithControls;
export function useLeafletDisplayLayer(
  source: MaybeComputedRef<LeafletDisplayLayer | null | undefined>,
  target: MaybeComputedRef<Layer | null | undefined>,
  options: UseLeafletDisplayLayerOptions<boolean> = {}
): UseLeafletDisplayLayerReturn | UseLeafletDisplayLayerReturnWithControls {
  return useLeafletToggleObject<LeafletDisplayLayer, Layer>(source, target, {
    ...(options as Object),
    add: (source, target) =>
      !source.hasLayer(target) && source.addLayer(target),
    remove: (source, target) =>
      source.hasLayer(target) && source.removeLayer(target),
    has: (source, target) => source.hasLayer(target)
  });
}
