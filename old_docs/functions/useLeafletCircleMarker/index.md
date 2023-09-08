---
category: Layer
---

# useLeafletCircleMarker

A circle of a fixed size with radius specified in pixels.



## Demo

<ClientOnly>
  <Demo name="useLeafletCircleMarker" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCircleMarker/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletCircleMarker
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [0, 0], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// path color
const color = ref<string>('green');

// radius of the circle, in pixels
const radius = ref<number>(10);

// create circle marker
const circleMarker = useLeafletCircleMarker([0, 0], { radius, color });

// display circle marker
useLeafletDisplayLayer(map, circleMarker);

// color.value = 'black'; // redraw path
// radius.value = 20; // change radius and redraw path
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletCircleMarkerOptions
  extends Omit<Omit<CircleMarkerOptions, 'radius'>, keyof PathOptions>,
    UseLeafletPathOptions<CircleMarker> {
  radius?: MaybeRefOrGetter<number | null | undefined>;
  defOptions?: CircleMarkerOptions;
  factory?: (...args: any[]) => CircleMarker;
}
export type UseLeafletCircleMarkerReturn = Ref<CircleMarker | null>;
export declare function useLeafletCircleMarker(
  latlng: MaybeRefOrGetter<LatLngExpression | null | undefined>,
  options?: UseLeafletCircleMarkerOptions
): UseLeafletCircleMarkerReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCircleMarker/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCircleMarker/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCircleMarker/index.md)
