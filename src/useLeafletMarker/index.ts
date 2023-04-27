import { type Ref, watch, isReadonly } from 'vue-demi';
import { toRef, isDefined, type MaybeRefOrGetter, isDef } from '@vueuse/shared';
import {
  Marker,
  Icon,
  type DivIcon,
  type LatLngExpression,
  type MarkerOptions
} from 'leaflet';
import { useLeafletLayer } from '../useLeafletLayer';
import { useLeafletEvent } from '../useLeafletEvent';

export interface UseLeafletMarkerOptions
  extends Omit<
    MarkerOptions,
    'icon' | 'opacity' | 'zIndexOffset' | 'draggable'
  > {
  icon?: MaybeRefOrGetter<Icon | DivIcon | undefined>;
  opacity?: MaybeRefOrGetter<number | undefined>;
  zIndexOffset?: MaybeRefOrGetter<number | undefined>;
  draggable?: MaybeRefOrGetter<boolean | undefined>;
  defIcon?: Icon | DivIcon | undefined;
  update?: (instance: Marker | null) => void;
  factory?: (...args: unknown[]) => Marker;
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
    update,
    dispose,
    defIcon = new Icon.Default(),
    ...markerOptions
  } = options;

  const _latlng = toRef(latlng);
  const _icon = toRef(icon);
  const _opacity = toRef(opacity);
  const _zIndexOffset = toRef(zIndexOffset);
  const _draggable = toRef(draggable);

  const _instance = useLeafletLayer(create, {
    watch: _latlng,
    update,
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

  watch(_latlng, val => {
    if (val != null) {
      _instance.value?.setLatLng(val);
    }
  });

  if (isDef(icon)) {
    watch(_icon, val => {
      if (val) {
        _instance.value?.setIcon(val);
      } else if (defIcon) {
        _instance.value?.setIcon(defIcon);
      }
    });
  }

  if (isDef(opacity)) {
    watch(_opacity, val => {
      if (val != null) {
        _instance.value?.setOpacity(val);
      }
    });
  }

  if (isDef(zIndexOffset)) {
    watch(_zIndexOffset, val => {
      if (val != null) {
        _instance.value?.setZIndexOffset(val);
      }
    });
  }

  if (isDef(draggable)) {
    watch(_draggable, val => {
      if (val) {
        _instance.value?.dragging?.enable();
      } else {
        _instance.value?.dragging?.disable();
      }
    });

    useLeafletEvent(_instance, 'moveend', () => {
      if (!isReadonly(_latlng) && isDefined(_instance)) {
        _latlng.value = _instance.value.getLatLng().clone();
      }
    });
  }

  return _instance;
}
