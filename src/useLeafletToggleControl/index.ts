import type { MaybeComputedRef } from '@vueuse/shared';
import type { Control } from 'leaflet';
import {
  type UseLeafletToggleObjectOptions,
  type UseLeafletToggleObjectReturn,
  type UseLeafletToggleObjectReturnWithControls,
  useLeafletToggleObject
} from '../useLeafletToggleObject';

export type UseLeafletToggleControlOptions<Controls extends boolean> = Omit<
  UseLeafletToggleObjectOptions<Controls, LeafletToggleControl, Control>,
  'add' | 'remove' | 'has'
>;

export interface LeafletToggleControl {
  addControl(control: Control): this;
  removeControl(control: Control): this;
}

export type UseLeafletToggleControlReturn = UseLeafletToggleObjectReturn;

export type UseLeafletToggleControlReturnWithControls =
  UseLeafletToggleObjectReturnWithControls;

export function useLeafletToggleControl(
  source: MaybeComputedRef<LeafletToggleControl | null | undefined>,
  target: MaybeComputedRef<Control | null | undefined>,
  options?: UseLeafletToggleControlOptions<false>
): UseLeafletToggleControlReturn;
export function useLeafletToggleControl(
  source: MaybeComputedRef<LeafletToggleControl | null | undefined>,
  target: MaybeComputedRef<Control | null | undefined>,
  options: UseLeafletToggleControlOptions<true>
): UseLeafletToggleControlReturnWithControls;
export function useLeafletToggleControl(
  source: MaybeComputedRef<LeafletToggleControl | null | undefined>,
  target: MaybeComputedRef<Control | null | undefined>,
  options: UseLeafletToggleControlOptions<boolean> = {}
): UseLeafletToggleControlReturn | UseLeafletToggleControlReturnWithControls {
  return useLeafletToggleObject<LeafletToggleControl, Control>(source, target, {
    ...(options as Object),
    add: (source, target) => source.addControl(target),
    remove: (source, target) => source.removeControl(target),
    has: (source, target) => !!(target as any)._.map
  });
}
