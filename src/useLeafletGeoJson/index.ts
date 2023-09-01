import { toRaw, type Ref, ref } from 'vue-demi';
import {
  toRef,
  notNullish,
  type MaybeRefOrGetter,
  type MaybeRef,
  isDefined
} from '@vueuse/shared';
import {
  GeoJSON,
  type GeoJSONOptions,
  type PathOptions,
  type StyleFunction
} from 'leaflet';
import { useLeafletLayer, type UpdateWatchSource } from '../useLeafletLayer';

export interface UseLeafletGeoJsonOptions
  extends Omit<GeoJSONOptions, 'style'> {
  style?: MaybeRef<PathOptions | StyleFunction | null | undefined>;
  error?: Ref<Error | null | undefined>;
  watchDeep?: boolean;
  updateSources?: UpdateWatchSource<GeoJSON>[];
  factory?: (...args: any[]) => GeoJSON;
  dispose?: boolean;
}

export type UseLeafletGeoJsonReturn = Ref<GeoJSON | null>;

export function useLeafletGeoJson<T extends object>(
  geojson: MaybeRefOrGetter<T | null | undefined>,
  options: UseLeafletGeoJsonOptions = {}
): UseLeafletGeoJsonReturn {
  const {
    style,
    error,
    watchDeep,
    updateSources = [],
    factory,
    dispose,
    ...geojsonOptions
  } = options;

  const _data = toRef(geojson);
  const _error = ref(error);
  const _style = ref(style) as Ref<
    PathOptions | StyleFunction | null | undefined
  >;

  updateSources.push({
    watch: _data,
    handler: (instance, val) => {
      instance.clearLayers();
      if (notNullish(val)) {
        const raw = toRaw(val);
        try {
          instance.addData(raw);
          _error.value = null;
        } catch (e: any) {
          _error.value = e;
        }
      }
    },
    options: {
      deep: watchDeep
    }
  });

  if (notNullish(style)) {
    updateSources.push({
      watch: _style,
      handler: (instance, val) => {
        instance.options.style = val;
        if (notNullish(val)) {
          instance.setStyle(val);
        } else {
          instance.resetStyle();
        }
      },
      options: {
        deep: true
      }
    });
  }

  const _instance = useLeafletLayer(create, {
    updateSources,
    dispose
  });

  function create() {
    if (factory) {
      return factory(toRaw(_data.value), makeOptions());
    } else {
      try {
        return new GeoJSON(toRaw(_data.value) as any, makeOptions());
      } catch (e: any) {
        _error.value = e;
        return new GeoJSON(undefined, makeOptions());
      }
    }
  }

  function makeOptions(): GeoJSONOptions {
    const opt = {
      ...geojsonOptions
    } as GeoJSONOptions;

    if (isDefined(_style)) {
      opt.style = _style.value;
    }

    return opt;
  }

  return _instance;
}
