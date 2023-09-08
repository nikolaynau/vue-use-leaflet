---
category: Layer
---

# useLeafletRectangle

A create object for drawing rectangle overlays on a map.



## Demo

<ClientOnly>
  <Demo name="useLeafletRectangle" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRectangle/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletRectangle
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// path color
const color = ref<string>('green');

// create rectangle
const rectangle = useLeafletRectangle(
  [
    [0, 0],
    [-20, -20]
  ],
  { color }
);

// display rectangle
useLeafletDisplayLayer(map, rectangle);

// color.value = 'black'; // redraw path
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export type UseLeafletRectangleOptions = UseLeafletPolygonOptions;
export type UseLeafletRectangleReturn = Ref<Rectangle | null>;
export declare function useLeafletRectangle(
  latLngBounds: MaybeRefOrGetter<LatLngBoundsExpression | null | undefined>,
  options?: UseLeafletRectangleOptions
): UseLeafletRectangleReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRectangle/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRectangle/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRectangle/index.md)
