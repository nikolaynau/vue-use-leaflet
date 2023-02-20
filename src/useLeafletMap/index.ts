import { ref, unref, markRaw, watch } from 'vue-demi';
import { type MaybeComputedElementRef, unrefElement } from '@vueuse/core';
import {
  isDefined,
  isFunction,
  tryOnMounted,
  tryOnScopeDispose,
  type MaybeComputedRef
} from '@vueuse/shared';
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

export interface UseLeafletMapOptions
  extends Omit<MapOptions, 'center' | 'zoom'> {
  center?: MaybeComputedRef<LatLngExpression | undefined>;
  zoom?: MaybeComputedRef<number | undefined>;
  bounds?: MaybeComputedRef<LatLngBoundsExpression | undefined>;
  useFly?: MaybeComputedRef<boolean | undefined>;
  factory?: (...args: unknown[]) => Map;
  onViewChanged?: ViewChangedCallback;
}

export interface ViewChangedEvent extends LeafletEvent {
  center: LatLng;
  zoom: number;
  bounds: LatLngBounds;
}

export type ViewChangedCallback = (event: ViewChangedEvent) => void;

export function useLeafletMap(
  element: MaybeComputedElementRef,
  options: UseLeafletMapOptions = {}
) {
  const {
    center = [0, 0],
    zoom = 0,
    bounds,
    useFly = false,
    factory,
    onViewChanged,
    ...leafletOptions
  } = options;

  const map = ref<Map | null>(null);

  function initializeMap(element: HTMLElement) {
    const mapOptions: MapOptions = { ...leafletOptions };

    const needInitView = unref(bounds) || unref(useFly);
    if (!needInitView) {
      mapOptions.center = unref(center) as LatLngExpression;
      mapOptions.zoom = unref(zoom) as number;
    }

    const mapInstance = isFunction(factory)
      ? factory(element, mapOptions)
      : new Map(element, mapOptions);

    if (needInitView) {
      setInitialView(mapInstance);
    }

    map.value = markRaw(mapInstance);
  }

  function destroyMap() {
    map.value?.off().remove();
    map.value = null;
  }

  function resetView(map: Map): Map {
    return map.setView([0, 0], 0);
  }

  function setInitialView(map: Map) {
    if (unref(bounds)) {
      if (unref(useFly)) {
        resetView(map).flyToBounds(unref(bounds) as LatLngBoundsExpression);
      } else {
        map.fitBounds(unref(bounds) as LatLngBoundsExpression);
      }
    } else {
      if (unref(useFly)) {
        resetView(map).flyTo(
          unref(center) as LatLngExpression,
          unref(zoom) as number
        );
      }
    }
  }

  function setBounds(bounds: LatLngBoundsExpression) {
    bounds = latLngBounds(bounds as LatLngExpression[]);
    if (!bounds.isValid()) {
      return;
    }

    if (unref(useFly)) {
      map.value?.flyToBounds(bounds);
    } else {
      map.value?.fitBounds(bounds);
    }
  }

  function setView(center: LatLngExpression, zoom?: number) {
    if (unref(useFly)) {
      map.value?.flyTo(center, zoom);
    } else {
      map.value?.setView(center, zoom);
    }
  }

  function setCenter(center: LatLngExpression) {
    if (unref(useFly)) {
      map.value?.flyTo(center);
    } else {
      map.value?.panTo(center);
    }
  }

  function setZoom(zoom: number) {
    if (unref(useFly)) {
      map.value?.flyTo(map.value?.getCenter(), zoom);
    } else {
      map.value?.setZoom(zoom);
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

  watch(
    () => unref(element),
    () => {
      if (
        isDefined(element) &&
        isDefined(map) &&
        unrefElement(element) === unref(map).getContainer()
      ) {
        return;
      }

      destroyMap();
      if (isDefined(element)) {
        initializeMap(unrefElement(element) as HTMLElement);
      }
    },
    {
      immediate: true,
      flush: 'post'
    }
  );

  watch(
    () => unref(bounds),
    () => {
      if (isDefined(bounds)) {
        setBounds(unref(bounds) as LatLngBoundsExpression);
      }
    }
  );

  watch(
    () => ({
      center: unref(center) as LatLngExpression,
      zoom: unref(zoom) as number
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

  if (onViewChanged) {
    useLeafletEvent(map, 'moveend', (ev: LeafletEvent) => {
      const map = ev.sourceTarget as Map;
      onViewChanged({
        center: map.getCenter(),
        zoom: map.getZoom(),
        bounds: map.getBounds(),
        ...ev
      });
    });
  }

  tryOnMounted(() => {
    if (isDefined(map)) {
      return;
    }
    if (isDefined(element)) {
      initializeMap(unrefElement(element) as HTMLElement);
    }
  });

  tryOnScopeDispose(() => {
    destroyMap();
  });

  return map;
}

export type UseLeafletMapReturn = ReturnType<typeof useLeafletMap>;
