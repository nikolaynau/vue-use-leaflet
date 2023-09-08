---
category: Layer
---

# useLeafletRemoveLayer

Remove layer when component is unmounted, set ref to null or manually.



## Demo

<ClientOnly>
  <Demo name="useLeafletRemoveLayer" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRemoveLayer/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletRemoveLayer,
  useLeafletMarker
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const marker = useLeafletMarker([0, 0]);
useLeafletDisplayLayer(map, marker);

const remove = useLeafletRemoveLayer(marker);
// remove() // OR
// marker.value = null // OR
// component is unmounted
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface LeafletRemovableLayer {
  off(): this;
  remove(): this;
}
export declare function useLeafletRemoveLayer<
  T extends LeafletRemovableLayer = LeafletRemovableLayer
>(
  source: MaybeRefOrGetter<T | null | undefined>,
  options?: UseLeafletRemoveObjectOptions<T>
): UseLeafletRemoveObjectReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRemoveLayer/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRemoveLayer/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRemoveLayer/index.md)
