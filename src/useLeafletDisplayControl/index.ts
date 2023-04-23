import type { MaybeRefOrGetter } from '@vueuse/shared';
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
  source: MaybeRefOrGetter<LeafletDisplayControl | null | undefined>,
  target: MaybeRefOrGetter<Control | null | undefined>,
  options?: UseLeafletDisplayControlOptions<false>
): UseLeafletDisplayControlReturn;
export function useLeafletDisplayControl(
  source: MaybeRefOrGetter<LeafletDisplayControl | null | undefined>,
  target: MaybeRefOrGetter<Control | null | undefined>,
  options: UseLeafletDisplayControlOptions<true>
): UseLeafletDisplayControlReturnWithControls;
export function useLeafletDisplayControl(
  source: MaybeRefOrGetter<LeafletDisplayControl | null | undefined>,
  target: MaybeRefOrGetter<Control | null | undefined>,
  options: UseLeafletDisplayControlOptions<boolean> = {}
): UseLeafletDisplayControlReturn | UseLeafletDisplayControlReturnWithControls {
  return useLeafletDisplayObject(source, target, {
    ...(options as any),
    show: (source, target) => source.addControl(target),
    hide: (source, target) => source.removeControl(target),
    shown: (source, target) => !!(target as any)._map
  });
}
