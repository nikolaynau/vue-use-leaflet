import type { Ref } from 'vue-demi';
import type { MaybeRefOrGetter } from '@vueuse/shared';
import { Circle, type CircleOptions, type LatLngExpression } from 'leaflet';
import {
  useLeafletCircleMarker,
  type UseLeafletCircleMarkerOptions
} from '../useLeafletCircleMarker';

export type UseLeafletCircleOptions = UseLeafletCircleMarkerOptions;

export type UseLeafletCircleReturn = Ref<Circle | null>;

export function useLeafletCircle(
  latlng: MaybeRefOrGetter<LatLngExpression | null | undefined>,
  options: UseLeafletCircleOptions = {}
): UseLeafletCircleReturn {
  const {
    factory = create,
    defOptions = Circle.prototype.options,
    ...otherOptions
  } = options;

  const _instance = useLeafletCircleMarker(latlng, {
    factory,
    defOptions,
    ...otherOptions
  }) as Ref<Circle | null>;

  function create(latlng: LatLngExpression, circleOptions: CircleOptions): any {
    return new Circle(latlng, circleOptions);
  }

  return _instance;
}
