---
category: Layer
---

# useLeafletCircle

A create object for drawing circle overlays on a map.



## Demo

<ClientOnly>
  <Demo name="useLeafletCircle" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCircle/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletCircle
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [0, 0], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// path color
const color = ref<string>('green');

// radius of the circle, in meters
const radius = ref<number>(100000); // 100km

// create circle
const circle = useLeafletCircle([0, 0], { radius, color });

// display circle
useLeafletDisplayLayer(map, circle);

// color.value = 'black'; // redraw path
// radius.value = 200000; // change radius and redraw path
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export type UseLeafletCircleOptions = UseLeafletCircleMarkerOptions;
export type UseLeafletCircleReturn = Ref<Circle | null>;
export declare function useLeafletCircle(
  latlng: MaybeRefOrGetter<LatLngExpression | null | undefined>,
  options?: UseLeafletCircleOptions
): UseLeafletCircleReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCircle/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCircle/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCircle/index.md)
