import { shallowRef, markRaw, watch, type Ref } from 'vue-demi';
import { type MaybeComputedElementRef, unrefElement } from '@vueuse/core';
import {
  isDefined,
  isFunction,
  resolveUnref,
  tryOnUnmounted,
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
  dispose?: boolean;
  onViewChanged?: ViewChangedCallback;
}

export type UseLeafletMapReturn = Ref<Map | null>;

export interface ViewChangedEvent extends LeafletEvent {
  center: LatLng;
  zoom: number;
  bounds: LatLngBounds;
}

export type ViewChangedCallback = (event: ViewChangedEvent) => void;

export function useLeafletMap(
  element: MaybeComputedElementRef,
  options: UseLeafletMapOptions = {}
): UseLeafletMapReturn {
  const {
    center = [0, 0],
    zoom = 0,
    bounds,
    useFly = false,
    factory,
    dispose = true,
    onViewChanged,
    ...leafletOptions
  } = options;

  const instance = shallowRef<Map | null>(null);

  function create(element: HTMLElement) {
    const mapOptions: MapOptions = { ...leafletOptions };

    const needInitView = resolveUnref(bounds) || resolveUnref(useFly);
    if (!needInitView) {
      mapOptions.center = resolveUnref(center) as LatLngExpression;
      mapOptions.zoom = resolveUnref(zoom) as number;
    }

    const map = isFunction(factory)
      ? factory(element, mapOptions)
      : new Map(element, mapOptions);

    if (needInitView) {
      setInitialView(map);
    }

    instance.value = markRaw(map);
  }

  function resetView(map: Map): Map {
    return map.setView([0, 0], 0);
  }

  function setInitialView(map: Map) {
    if (resolveUnref(bounds)) {
      if (resolveUnref(useFly)) {
        resetView(map).flyToBounds(
          resolveUnref(bounds) as LatLngBoundsExpression
        );
      } else {
        map.fitBounds(resolveUnref(bounds) as LatLngBoundsExpression);
      }
    } else {
      if (resolveUnref(useFly)) {
        resetView(map).flyTo(
          resolveUnref(center) as LatLngExpression,
          resolveUnref(zoom) as number
        );
      }
    }
  }

  function setBounds(bounds: LatLngBoundsExpression) {
    bounds = latLngBounds(bounds as LatLngExpression[]);
    if (!bounds.isValid()) {
      return;
    }

    if (resolveUnref(useFly)) {
      instance.value?.flyToBounds(bounds);
    } else {
      instance.value?.fitBounds(bounds);
    }
  }

  function setView(center: LatLngExpression, zoom?: number) {
    if (resolveUnref(useFly)) {
      instance.value?.flyTo(center, zoom);
    } else {
      instance.value?.setView(center, zoom);
    }
  }

  function setCenter(center: LatLngExpression) {
    if (resolveUnref(useFly)) {
      instance.value?.flyTo(center);
    } else {
      instance.value?.panTo(center);
    }
  }

  function setZoom(zoom: number) {
    if (resolveUnref(useFly)) {
      instance.value?.flyTo(instance.value?.getCenter(), zoom);
    } else {
      instance.value?.setZoom(zoom);
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
    () => resolveUnref(bounds),
    val => {
      if (val) {
        setBounds(val as LatLngBoundsExpression);
      }
    }
  );

  watch(
    () => ({
      center: resolveUnref(center) as LatLngExpression,
      zoom: resolveUnref(zoom) as number
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
      clean();
      if (el) {
        create(el as HTMLElement);
      }
    },
    {
      immediate: true,
      flush: 'post'
    }
  );

  if (onViewChanged) {
    useLeafletEvent(instance, 'moveend', (ev: LeafletEvent) => {
      const map = ev.sourceTarget as Map;
      onViewChanged({
        center: map.getCenter(),
        zoom: map.getZoom(),
        bounds: map.getBounds(),
        ...ev
      });
    });
  }

  function clean() {
    if (isDefined(instance)) {
      instance.value.off().remove();
      (instance as Ref<Map | null>).value = null;
    }
  }

  if (dispose) {
    tryOnUnmounted(() => {
      clean();
    });
  }

  return instance;
}
