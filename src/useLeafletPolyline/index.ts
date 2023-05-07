import { toRaw, type Ref } from 'vue-demi';
import {
  toRef,
  isDefined,
  notNullish,
  type MaybeRefOrGetter
} from '@vueuse/shared';
import {
  Polyline,
  type LatLngExpression,
  type PathOptions,
  type PolylineOptions
} from 'leaflet';
import { useLeafletPath, type UseLeafletPathOptions } from '../useLeafletPath';

export interface UseLeafletPolylineOptions
  extends Omit<
      Omit<PolylineOptions, 'smoothFactor' | 'noClip'>,
      keyof PathOptions
    >,
    UseLeafletPathOptions<Polyline> {
  smoothFactor?: MaybeRefOrGetter<number | null | undefined>;
  noClip?: MaybeRefOrGetter<boolean | null | undefined>;
  defOptions?: PolylineOptions;
  watchDeep?: boolean;
  factory?: (...args: any[]) => Polyline;
}

export type UseLeafletPolylineReturn = Ref<Polyline | null>;

export function useLeafletPolyline(
  latlngs: MaybeRefOrGetter<
    LatLngExpression[] | LatLngExpression[][] | null | undefined
  >,
  options: UseLeafletPolylineOptions = {}
): UseLeafletPolylineReturn {
  const {
    smoothFactor,
    noClip,
    watchDeep,
    factory,
    defOptions,
    updateSources = [],
    ...pathOptions
  } = options;

  const _latlngs = toRef(latlngs);
  const _smoothFactor = toRef(smoothFactor);
  const _noClip = toRef(noClip);
  const _defOptions = defOptions ?? Polyline.prototype.options;

  updateSources.push({
    watch: _latlngs,
    handler: (instance, val) => {
      if (val) {
        instance.setLatLngs(toRaw(val));
      }
    },
    options: {
      deep: watchDeep
    }
  });

  if (notNullish(smoothFactor)) {
    updateSources.push({
      watch: _smoothFactor,
      handler: (instance, val) => {
        instance.options.smoothFactor = val ?? _defOptions.smoothFactor;
        instance.redraw();
      }
    });
  }

  if (notNullish(noClip)) {
    updateSources.push({
      watch: _noClip,
      handler: (instance, val) => {
        instance.options.noClip = val ?? _defOptions.noClip;
        instance.redraw();
      }
    });
  }

  const _instance = useLeafletPath(create, {
    ...pathOptions,
    defOptions: _defOptions,
    updateSources,
    watch: _latlngs
  });

  function create(opt: PathOptions): Polyline {
    return factory
      ? factory(toRaw(_latlngs.value), makeOptions(opt))
      : new Polyline(toRaw(_latlngs.value) as any, makeOptions(opt));
  }

  function makeOptions(pathOpt: PathOptions): PolylineOptions {
    const opt = pathOpt as PolylineOptions;

    if (isDefined(_smoothFactor)) {
      opt.smoothFactor = _smoothFactor.value;
    }
    if (isDefined(_noClip)) {
      opt.noClip = _noClip.value;
    }

    return opt;
  }

  return _instance;
}
