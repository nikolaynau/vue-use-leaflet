import { toRaw, type Ref } from 'vue-demi';
import type { MaybeRefOrGetter } from '@vueuse/shared';
import {
  Rectangle,
  type PolylineOptions,
  type LatLngBoundsExpression,
  type Polyline
} from 'leaflet';
import {
  useLeafletPolygon,
  type UseLeafletPolygonOptions
} from '../useLeafletPolygon';

export type UseLeafletRectangleOptions = UseLeafletPolygonOptions;

export type UseLeafletRectangleReturn = Ref<Rectangle | null>;

export function useLeafletRectangle(
  latLngBounds: MaybeRefOrGetter<LatLngBoundsExpression | null | undefined>,
  options: UseLeafletRectangleOptions = {}
): UseLeafletRectangleReturn {
  const {
    factory = create,
    updatePoints = _updatePoints,
    defOptions = Rectangle.prototype.options,
    ...otherOptions
  } = options;

  const _instance = useLeafletPolygon(latLngBounds as any, {
    factory,
    defOptions,
    updatePoints,
    ...otherOptions
  }) as Ref<Rectangle | null>;

  function create(
    latLngBounds: LatLngBoundsExpression,
    polyOptions: PolylineOptions
  ): any {
    return new Rectangle(latLngBounds, polyOptions);
  }

  function _updatePoints(instance: Polyline, val: LatLngBoundsExpression) {
    if (val) {
      (instance as unknown as Rectangle).setBounds(toRaw(val));
    }
  }

  return _instance;
}
