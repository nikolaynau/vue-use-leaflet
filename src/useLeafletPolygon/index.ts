import type { Ref } from 'vue-demi';
import type { MaybeRefOrGetter } from '@vueuse/shared';
import { Polygon, type LatLngExpression, type PolylineOptions } from 'leaflet';
import {
  useLeafletPolyline,
  type UseLeafletPolylineOptions
} from '../useLeafletPolyline';

export type UseLeafletPolygonOptions = UseLeafletPolylineOptions;

export type UseLeafletPolygonReturn = Ref<Polygon | null>;

export function useLeafletPolygon(
  latlngs: MaybeRefOrGetter<
    | LatLngExpression[]
    | LatLngExpression[][]
    | LatLngExpression[][][]
    | null
    | undefined
  >,
  options: UseLeafletPolygonOptions = {}
): UseLeafletPolygonReturn {
  const {
    factory = create,
    defOptions = Polygon.prototype.options,
    ...otherOptions
  } = options;

  const _instance = useLeafletPolyline(latlngs as any, {
    factory,
    defOptions,
    ...otherOptions
  }) as Ref<Polygon | null>;

  function create(
    latlngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][],
    polyOptions: PolylineOptions
  ): any {
    return new Polygon(latlngs, polyOptions);
  }

  return _instance;
}
