---
category: Map
---

# useLeafletMap

Create a leaflet map.



## Demo

<ClientOnly>
  <Demo name="useLeafletMap" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMap/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

// map DOM element
const el = ref<HTMLElement | null>(null);

// create map
const map = useLeafletMap(el);

// create default tile layer
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);

// display tile layer
useLeafletDisplayLayer(map, tileLayer);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
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
export declare function useLeafletMap(
  element: MaybeComputedElementRef,
  options?: UseLeafletMapOptions
): UseLeafletMapReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMap/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMap/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMap/index.md)
