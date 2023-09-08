---
category: Layer
---

# useLeafletLayer

Factory for creating map layers. Supports auto-remove.



## Demo

<ClientOnly>
  <Demo name="useLeafletLayer" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayer/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Marker, type LatLngExpression } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// initial marker position
const position = ref<LatLngExpression>([0, 0]);

// create marker
const marker = useLeafletLayer(() => new Marker(position.value), {
  updateSources: [
    {
      watch: position,
      handler: instance => instance.setLatLng(position.value)
    }
  ]
});

// display marker
useLeafletDisplayLayer(map, marker);

// change marker position
// position.value = [-10, -10];
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UpdateWatchSource<T> {
  watch: WatchSource<any>;
  handler: (instance: T, newVal: any, oldVal: any) => void;
  options?: WatchOptions;
}
export interface UseLeafletLayerOptions<T> {
  watch?: WatchSource<any>;
  flushSync?: boolean;
  updateSources?: UpdateWatchSource<T>[];
  remove?: (instance: T) => void;
  dispose?: boolean;
}
export type UseLeafletLayerReturn<T> = Ref<T | null>;
export declare function useLeafletLayer<T extends Layer = Layer>(
  factory: () => T,
  options?: UseLeafletLayerOptions<T>
): UseLeafletLayerReturn<T>;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayer/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayer/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayer/index.md)
