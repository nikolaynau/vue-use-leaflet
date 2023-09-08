---
category: Layer
---

# useLeafletTileLayer

Used to load and display tile layers on the map.



## Demo

<ClientOnly>
  <Demo name="useLeafletTileLayer" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletTileLayer/demo.vue" />
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

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);

// create tile layer
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  { attribution: 'Open Street Map' }
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
export interface UseLeafletTileLayerOptions extends TileLayerOptions {
  updateSources?: UpdateWatchSource<TileLayer>[];
  factory?: (...args: any[]) => TileLayer;
  dispose?: boolean;
}
export type UseLeafletTileLayerReturn = Ref<TileLayer | null>;
export declare function useLeafletTileLayer(
  url: MaybeRefOrGetter<string | null | undefined>,
  options?: UseLeafletTileLayerOptions
): UseLeafletTileLayerReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletTileLayer/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletTileLayer/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletTileLayer/index.md)
