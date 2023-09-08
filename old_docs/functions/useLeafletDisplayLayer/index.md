---
category: Layer
---

# useLeafletDisplayLayer

Show the layer object on the map.



## Demo

<ClientOnly>
  <Demo name="useLeafletDisplayLayer" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayLayer/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// initial visible value
const visible = ref(true);

// create marker
const marker = useLeafletMarker([0, 0]);

// display marker
const toggle = useLeafletDisplayLayer(map, marker, {
  initialValue: visible
});

// toggle() // show / hide control
// visible.value = false // hide control
// visible.value = true // show control
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export type UseLeafletDisplayLayerOptions<Controls extends boolean> = Omit<
  UseLeafletDisplayObjectOptions<Controls, LeafletDisplayLayer, Layer>,
  'show' | 'hide' | 'shown'
>;
export interface LeafletDisplayLayer {
  addLayer(layer: Layer): this;
  removeLayer(layer: Layer): this;
  hasLayer(layer: Layer): boolean;
}
export type UseLeafletDisplayLayerReturn = UseLeafletDisplayObjectReturn;
export type UseLeafletDisplayLayerReturnWithControls =
  UseLeafletDisplayObjectReturnWithControls;
export declare function useLeafletDisplayLayer(
  source: MaybeRefOrGetter<LeafletDisplayLayer | null | undefined>,
  target: MaybeRefOrGetter<Layer | null | undefined>,
  options?: UseLeafletDisplayLayerOptions<false>
): UseLeafletDisplayLayerReturn;
export declare function useLeafletDisplayLayer(
  source: MaybeRefOrGetter<LeafletDisplayLayer | null | undefined>,
  target: MaybeRefOrGetter<Layer | null | undefined>,
  options: UseLeafletDisplayLayerOptions<true>
): UseLeafletDisplayLayerReturnWithControls;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayLayer/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayLayer/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayLayer/index.md)
