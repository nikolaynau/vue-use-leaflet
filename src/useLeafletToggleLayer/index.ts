import type { MaybeComputedRef } from '@vueuse/shared';
import type { Layer } from 'leaflet';
import {
  type UseLeafletToggleObjectOptions,
  type UseLeafletToggleObjectReturn,
  type UseLeafletToggleObjectReturnWithControls,
  useLeafletToggleObject
} from '../useLeafletToggleObject';

export type UseLeafletToggleLayerOptions<Controls extends boolean> = Omit<
  UseLeafletToggleObjectOptions<Controls, LeafletToggleLayer, Layer>,
  'add' | 'remove' | 'has'
>;

export interface LeafletToggleLayer {
  addLayer(layer: Layer): this;
  removeLayer(layer: Layer): this;
  hasLayer(layer: Layer): boolean;
}

export type UseLeafletToggleLayerReturn = UseLeafletToggleObjectReturn;

export type UseLeafletToggleLayerReturnWithControls =
  UseLeafletToggleObjectReturnWithControls;

export function useLeafletToggleLayer(
  source: MaybeComputedRef<LeafletToggleLayer | null | undefined>,
  target: MaybeComputedRef<Layer | null | undefined>,
  options?: UseLeafletToggleLayerOptions<false>
): UseLeafletToggleLayerReturn;
export function useLeafletToggleLayer(
  source: MaybeComputedRef<LeafletToggleLayer | null | undefined>,
  target: MaybeComputedRef<Layer | null | undefined>,
  options: UseLeafletToggleLayerOptions<true>
): UseLeafletToggleLayerReturnWithControls;
export function useLeafletToggleLayer(
  source: MaybeComputedRef<LeafletToggleLayer | null | undefined>,
  target: MaybeComputedRef<Layer | null | undefined>,
  options: UseLeafletToggleLayerOptions<boolean> = {}
): UseLeafletToggleLayerReturn | UseLeafletToggleLayerReturnWithControls {
  return useLeafletToggleObject<LeafletToggleLayer, Layer>(source, target, {
    ...(options as Object),
    add: (source, target) =>
      !source.hasLayer(target) && source.addLayer(target),
    remove: (source, target) =>
      source.hasLayer(target) && source.removeLayer(target),
    has: (source, target) => source.hasLayer(target)
  });
}
