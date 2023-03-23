import type { Arrayable, MaybeComputedRef } from '@vueuse/shared';
import type { Control } from 'leaflet';
import {
  type UseLeafletDisplayObjectOptions,
  type UseLeafletDisplayObjectReturn,
  type UseLeafletDisplayObjectReturnWithControls,
  useLeafletDisplayObject
} from '../useLeafletDisplayObject';

export type UseLeafletDisplayControlOptions<Controls extends boolean> = Omit<
  UseLeafletDisplayObjectOptions<Controls, LeafletDisplayControl, Control>,
  'show' | 'hide' | 'shown'
>;

export interface LeafletDisplayControl {
  addControl(control: Control): this;
  removeControl(control: Control): this;
}

export type UseLeafletDisplayControlReturn = UseLeafletDisplayObjectReturn;

export type UseLeafletDisplayControlReturnWithControls =
  UseLeafletDisplayObjectReturnWithControls;

export function useLeafletDisplayControl(
  source: MaybeComputedRef<LeafletDisplayControl | null | undefined>,
  target: MaybeComputedRef<Arrayable<Control> | null | undefined>,
  options?: UseLeafletDisplayControlOptions<false>
): UseLeafletDisplayControlReturn;
export function useLeafletDisplayControl(
  source: MaybeComputedRef<LeafletDisplayControl | null | undefined>,
  target: MaybeComputedRef<Arrayable<Control> | null | undefined>,
  options: UseLeafletDisplayControlOptions<true>
): UseLeafletDisplayControlReturnWithControls;
export function useLeafletDisplayControl(
  source: MaybeComputedRef<LeafletDisplayControl | null | undefined>,
  target: MaybeComputedRef<Arrayable<Control> | null | undefined>,
  options: UseLeafletDisplayControlOptions<boolean> = {}
): UseLeafletDisplayControlReturn | UseLeafletDisplayControlReturnWithControls {
  return useLeafletDisplayObject(source, target, {
    ...(options as any),
    show: (source, target) => {
      Array.isArray(target)
        ? target.forEach(item => source.addControl(item))
        : source.addControl(target);
    },
    hide: (source, target) => {
      Array.isArray(target)
        ? target.forEach(item => source.removeControl(item))
        : source.removeControl(target);
    },
    shown: (source, target) => {
      return Array.isArray(target)
        ? target.every(item => !!(item as any)._map)
        : !!(target as any)._map;
    }
  });
}
