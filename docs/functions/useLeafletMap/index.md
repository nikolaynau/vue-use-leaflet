---
category: Map
---

# useLeafletMap

Create a leaflet map.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMap
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);

const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
import { type Ref } from 'vue-demi';
import { type MaybeComputedElementRef } from '@vueuse/core';
import { type MaybeComputedRef } from '@vueuse/shared';
import { Map, type MapOptions, type LatLngExpression, type LatLngBoundsExpression, type LatLng, type LatLngBounds, type LeafletEvent } from 'leaflet';
export interface UseLeafletMapOptions extends Omit<MapOptions, 'center' | 'zoom'>, UseLeafletMapCallbacks {
    center?: MaybeComputedRef<LatLngExpression | undefined>;
    zoom?: MaybeComputedRef<number | undefined>;
    bounds?: MaybeComputedRef<LatLngBoundsExpression | undefined>;
    useFly?: MaybeComputedRef<boolean | undefined>;
    flushSync?: boolean;
    factory?: (...args: unknown[]) => Map;
    dispose?: boolean;
}
export interface UseLeafletMapCallbacks {
    onViewChanged?: ViewChangedCallback;
}
export type UseLeafletMapReturn = Ref<Map | null>;
export interface ViewChangedEvent extends LeafletEvent {
    center: LatLng;
    zoom: number;
    bounds: LatLngBounds;
}
export type ViewChangedCallback = (event: ViewChangedEvent) => void;
export declare function useLeafletMap(element: MaybeComputedElementRef, options?: UseLeafletMapOptions): UseLeafletMapReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMap/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMap/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMap/index.md)
