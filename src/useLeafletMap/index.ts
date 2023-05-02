import { shallowRef, markRaw, watch, type Ref } from 'vue-demi';
import { type MaybeComputedElementRef, unrefElement } from '@vueuse/core';
import { isDefined, toValue, type MaybeRefOrGetter } from '@vueuse/shared';
import {
  Map,
  latLng,
  latLngBounds,
  type MapOptions,
  type LatLngExpression,
  type LatLngBoundsExpression,
  type LatLng,
  type LatLngBounds,
  type LeafletEvent
} from 'leaflet';
import { useLeafletEvent } from '../useLeafletEvent';
import { useLeafletRemoveLayer } from '../useLeafletRemoveLayer';

export interface UseLeafletMapOptions
  extends Omit<MapOptions, 'center' | 'zoom'> {
  center?: MaybeRefOrGetter<LatLngExpression | undefined>;
  zoom?: MaybeRefOrGetter<number | undefined>;
  bounds?: MaybeRefOrGetter<LatLngBoundsExpression | undefined>;
  useFly?: MaybeRefOrGetter<boolean | undefined>;
  flushSync?: boolean;
  factory?: (...args: any[]) => Map;
  dispose?: boolean;
  onViewChanged?: (event: ViewChangedEvent) => void;
}

export type UseLeafletMapReturn = Ref<Map | null>;

export interface ViewChangedEvent extends LeafletEvent {
  center: LatLng;
  zoom: number;
  bounds: LatLngBounds;
}

export function useLeafletMap(
  element: MaybeComputedElementRef,
  options: UseLeafletMapOptions = {}
): UseLeafletMapReturn {
  const {
    center = [0, 0],
    zoom = 0,
    bounds,
    useFly = false,
    flushSync,
    factory,
    dispose = true,
    onViewChanged,
    ...leafletOptions
  } = options;

  const _instance = shallowRef<Map | null>(null);

  function create(element: HTMLElement) {
    const mapOptions: MapOptions = { ...leafletOptions };

    const needInitView = toValue(bounds) || toValue(useFly);
    if (!needInitView) {
      mapOptions.center = toValue(center) as LatLngExpression;
      mapOptions.zoom = toValue(zoom) as number;
    }

    const map =
      typeof factory === 'function'
        ? factory(element, mapOptions)
        : new Map(element, mapOptions);

    if (needInitView) {
      setInitialView(map);
    }

    _instance.value = markRaw(map);
  }

  function resetView(map: Map): Map {
    return map.setView([0, 0], 0);
  }

  function setInitialView(map: Map) {
    if (toValue(bounds)) {
      if (toValue(useFly)) {
        resetView(map).flyToBounds(toValue(bounds) as LatLngBoundsExpression);
      } else {
        map.fitBounds(toValue(bounds) as LatLngBoundsExpression);
      }
    } else {
      if (toValue(useFly)) {
        resetView(map).flyTo(
          toValue(center) as LatLngExpression,
          toValue(zoom) as number
        );
      }
    }
  }

  function setBounds(bounds: LatLngBoundsExpression) {
    bounds = latLngBounds(bounds as LatLngExpression[]);
    if (!bounds.isValid()) {
      return;
    }

    if (toValue(useFly)) {
      _instance.value?.flyToBounds(bounds);
    } else {
      _instance.value?.fitBounds(bounds);
    }
  }

  function setView(center: LatLngExpression, zoom?: number) {
    if (toValue(useFly)) {
      _instance.value?.flyTo(center, zoom);
    } else {
      _instance.value?.setView(center, zoom);
    }
  }

  function setCenter(center: LatLngExpression) {
    if (toValue(useFly)) {
      _instance.value?.flyTo(center);
    } else {
      _instance.value?.panTo(center);
    }
  }

  function setZoom(zoom: number) {
    if (toValue(useFly)) {
      _instance.value?.flyTo(_instance.value?.getCenter(), zoom);
    } else {
      _instance.value?.setZoom(zoom);
    }
  }

  function latLngEquals(
    latLngA: LatLngExpression | null | undefined,
    latLngB: LatLngExpression | null | undefined
  ): boolean {
    if (latLngA === latLngB) {
      return true;
    }
    if (!isDefined(latLngA) || !isDefined(latLngB)) {
      return false;
    }
    return latLng(latLngA!).equals(latLng(latLngB!));
  }

  const remove = useLeafletRemoveLayer(_instance, {
    isRemoved: source => !(source.getContainer() as any)._leaflet_id,
    dispose
  });

  watch(
    () => toValue(bounds),
    val => {
      if (val) {
        setBounds(val as LatLngBoundsExpression);
      }
    }
  );

  watch(
    () => ({
      center: toValue(center) as LatLngExpression,
      zoom: toValue(zoom) as number
    }),
    (newValue, oldValue) => {
      if (
        !latLngEquals(newValue.center, oldValue.center) &&
        newValue.zoom !== oldValue.zoom
      ) {
        isDefined(newValue.center) && setView(newValue.center, newValue.zoom);
      } else if (!latLngEquals(newValue.center, oldValue.center)) {
        isDefined(newValue.center) && setCenter(newValue.center);
      } else if (newValue.zoom !== oldValue.zoom) {
        isDefined(newValue.zoom) && setZoom(newValue.zoom);
      }
    }
  );

  watch(
    () => unrefElement(element),
    el => {
      remove();
      if (el) {
        create(el as HTMLElement);
      }
    },
    {
      immediate: true,
      flush: flushSync ? 'sync' : 'post'
    }
  );

  if (onViewChanged) {
    useLeafletEvent(_instance, 'moveend', (ev: LeafletEvent) => {
      const map = ev.sourceTarget as Map;
      onViewChanged({
        center: map.getCenter(),
        zoom: map.getZoom(),
        bounds: map.getBounds(),
        ...ev
      });
    });
  }

  return _instance;
}
