import { toRaw, type Ref } from 'vue-demi';
import {
  toRef,
  type MaybeRefOrGetter,
  notNullish,
  isDefined
} from '@vueuse/shared';
import {
  CircleMarker,
  type CircleMarkerOptions,
  type LatLngExpression,
  type PathOptions
} from 'leaflet';
import { useLeafletPath, type UseLeafletPathOptions } from '../useLeafletPath';

export interface UseLeafletCircleMarkerOptions
  extends Omit<Omit<CircleMarkerOptions, 'radius'>, keyof PathOptions>,
    UseLeafletPathOptions<CircleMarker> {
  radius?: MaybeRefOrGetter<number | null | undefined>;
  defOptions?: CircleMarkerOptions;
  factory?: (...args: any[]) => CircleMarker;
}

export type UseLeafletCircleMarkerReturn = Ref<CircleMarker | null>;

export function useLeafletCircleMarker(
  latlng: MaybeRefOrGetter<LatLngExpression | null | undefined>,
  options: UseLeafletCircleMarkerOptions = {}
): UseLeafletCircleMarkerReturn {
  const {
    radius,
    factory,
    defOptions = CircleMarker.prototype.options,
    updateSources = [],
    ...pathOptions
  } = options;

  const _latlng = toRef(latlng);
  const _radius = toRef(radius);

  updateSources.push({
    watch: _latlng,
    handler: (instance, val) => {
      if (val) {
        instance.setLatLng(toRaw(val));
      }
    }
  });

  if (notNullish(radius)) {
    updateSources.push({
      watch: _radius,
      handler: (instance, val) => {
        instance.setRadius(val ?? defOptions.radius);
      }
    });
  }

  const _instance = useLeafletPath(create, {
    ...pathOptions,
    defOptions,
    updateSources,
    watch: _latlng
  });

  function create(opt: PathOptions): CircleMarker {
    return factory
      ? factory(toRaw(_latlng.value), makeOptions(opt))
      : new CircleMarker(toRaw(_latlng.value) as any, makeOptions(opt));
  }

  function makeOptions(pathOpt: PathOptions): CircleMarkerOptions {
    const opt = pathOpt as CircleMarkerOptions;

    if (isDefined(_radius)) {
      opt.radius = _radius.value;
    }

    return opt;
  }

  return _instance;
}
