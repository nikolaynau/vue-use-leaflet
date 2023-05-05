import { type Ref, isReadonly } from 'vue-demi';
import {
  toRef,
  isDefined,
  notNullish,
  type MaybeRefOrGetter
} from '@vueuse/shared';
import {
  Marker,
  Icon,
  type DivIcon,
  type LatLngExpression,
  type MarkerOptions
} from 'leaflet';
import { useLeafletLayer, type UpdateWatchSource } from '../useLeafletLayer';
import { useLeafletEvent } from '../useLeafletEvent';

export interface UseLeafletMarkerOptions
  extends Omit<
    MarkerOptions,
    'icon' | 'opacity' | 'zIndexOffset' | 'draggable'
  > {
  icon?: MaybeRefOrGetter<Icon | DivIcon | null | undefined>;
  opacity?: MaybeRefOrGetter<number | null | undefined>;
  zIndexOffset?: MaybeRefOrGetter<number | null | undefined>;
  draggable?: MaybeRefOrGetter<boolean | null | undefined>;
  updateSources?: UpdateWatchSource<Marker>[];
  factory?: (...args: any[]) => Marker;
  dispose?: boolean;
}

export type UseLeafletMarkerReturn = Ref<Marker | null>;

export function useLeafletMarker(
  latlng: MaybeRefOrGetter<LatLngExpression | null | undefined>,
  options: UseLeafletMarkerOptions = {}
): UseLeafletMarkerReturn {
  const {
    icon,
    opacity,
    zIndexOffset,
    draggable,
    factory,
    dispose,
    updateSources = [],
    ...markerOptions
  } = options;

  const _latlng = toRef(latlng);
  const _icon = toRef(icon);
  const _opacity = toRef(opacity);
  const _zIndexOffset = toRef(zIndexOffset);
  const _draggable = toRef(draggable);
  const _defOptions = Marker.prototype.options;

  updateSources.push({
    watch: _latlng,
    handler: (instance, val) => {
      if (notNullish(val)) {
        instance.setLatLng(val);
      }
    }
  });

  if (notNullish(icon)) {
    updateSources.push({
      watch: _icon,
      handler: (instance, val) => {
        instance.setIcon(val ?? _defOptions.icon);
      }
    });
  }

  if (notNullish(opacity)) {
    updateSources.push({
      watch: _opacity,
      handler: (instance, val) => {
        instance.setOpacity(val ?? _defOptions.opacity);
      }
    });
  }

  if (notNullish(zIndexOffset)) {
    updateSources.push({
      watch: _zIndexOffset,
      handler: (instance, val) => {
        instance.setZIndexOffset(val ?? _defOptions.zIndexOffset);
      }
    });
  }

  if (notNullish(draggable)) {
    updateSources.push({
      watch: _draggable,
      handler: (instance, val) => {
        const { dragging, options } = instance;
        options.draggable = val ?? _defOptions.draggable;
        if (options.draggable) {
          if (dragging && !dragging.enabled()) {
            dragging.enable();
          }
        } else {
          if (dragging && dragging.enabled()) {
            dragging.disable();
          }
        }
      }
    });
  }

  const _instance = useLeafletLayer(create, {
    watch: _latlng,
    updateSources,
    dispose
  });

  function create(): Marker {
    return factory
      ? factory(_latlng.value!, makeOptions())
      : new Marker(_latlng.value!, makeOptions());
  }

  function makeOptions(): MarkerOptions {
    const opt = {
      ...markerOptions
    } as MarkerOptions;

    if (isDefined(_icon)) {
      opt.icon = _icon.value;
    }
    if (isDefined(_opacity)) {
      opt.opacity = _opacity.value;
    }
    if (isDefined(_zIndexOffset)) {
      opt.zIndexOffset = _zIndexOffset.value;
    }
    if (isDefined(_draggable)) {
      opt.draggable = _draggable.value;
    }

    return opt;
  }

  if (notNullish(draggable)) {
    useLeafletEvent(_instance, 'moveend', () => {
      if (!isReadonly(_latlng) && isDefined(_instance)) {
        _latlng.value = _instance.value.getLatLng().clone();
      }
    });
  }

  return _instance;
}
