import type { Ref } from 'vue-demi';
import type { MaybeRefOrGetter } from '@vueuse/shared';
import type { PathOptions, Polyline, PolylineOptions } from 'leaflet';
import type { UseLeafletPathOptions } from '../useLeafletPath';

export interface UseLeafletPolylineOptions
  extends Omit<
      Omit<PolylineOptions, 'smoothFactor' | 'noClip'>,
      keyof PathOptions
    >,
    UseLeafletPathOptions<Polyline> {
  smoothFactor?: MaybeRefOrGetter<number | null | undefined>;
  noClip?: MaybeRefOrGetter<boolean | null | undefined>;
  factory?: (...args: any[]) => Polyline;
}

export type UseLeafletPolylineReturn = Ref<Polyline | null>;
