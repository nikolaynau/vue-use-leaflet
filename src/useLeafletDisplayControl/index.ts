import type { MaybeComputedRef } from '@vueuse/shared';
import type { Control } from 'leaflet';
import {
  type UseLeafletToggleObjectOptions,
  type UseLeafletToggleObjectReturn,
  type UseLeafletToggleObjectReturnWithControls,
  useLeafletToggleObject
} from '../useLeafletToggleObject';

export type UseLeafletDisplayControlOptions<Controls extends boolean> = Omit<
  UseLeafletToggleObjectOptions<Controls, LeafletDisplayControl, Control>,
  'add' | 'remove' | 'has'
>;

export interface LeafletDisplayControl {
  addControl(control: Control): this;
  removeControl(control: Control): this;
}

export type UseLeafletDisplayControlReturn = UseLeafletToggleObjectReturn;

export type UseLeafletDisplayControlReturnWithControls =
  UseLeafletToggleObjectReturnWithControls;

export function useLeafletDisplayControl(
  source: MaybeComputedRef<LeafletDisplayControl | null | undefined>,
  target: MaybeComputedRef<Control | null | undefined>,
  options?: UseLeafletDisplayControlOptions<false>
): UseLeafletDisplayControlReturn;
export function useLeafletDisplayControl(
  source: MaybeComputedRef<LeafletDisplayControl | null | undefined>,
  target: MaybeComputedRef<Control | null | undefined>,
  options: UseLeafletDisplayControlOptions<true>
): UseLeafletDisplayControlReturnWithControls;
export function useLeafletDisplayControl(
  source: MaybeComputedRef<LeafletDisplayControl | null | undefined>,
  target: MaybeComputedRef<Control | null | undefined>,
  options: UseLeafletDisplayControlOptions<boolean> = {}
): UseLeafletDisplayControlReturn | UseLeafletDisplayControlReturnWithControls {
  function hasControl(target: Control) {
    return !!(target as any)._map;
  }
  return useLeafletToggleObject<LeafletDisplayControl, Control>(
    source,
    target,
    {
      ...(options as Object),
      add: (source, target) => !hasControl(target) && source.addControl(target),
      remove: (source, target) =>
        hasControl(target) && source.removeControl(target),
      has: (source, target) => hasControl(target)
    }
  );
}
