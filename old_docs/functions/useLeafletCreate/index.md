---
category: Other
---

# useLeafletCreate

Lazy creation object with source watching.



## Demo

<ClientOnly>
  <Demo name="useLeafletCreate" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCreate/demo.vue" />
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
  useLeafletCreate
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// marker position
const position = ref<LatLngExpression | undefined>(undefined);

// lazy create
const marker = useLeafletCreate(() => new Marker(position.value!), {
  watch: position
});

// display marker when created
useLeafletDisplayLayer(map, marker);

// create and show marker
// position.value = [0, 0];
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletCreateOptions {
  watch?: WatchSource<any>;
  flushSync?: boolean;
}
export type UseLeafletCreateReturn<T> = Ref<T | null>;
export declare function useLeafletCreate<T extends object>(
  fn: () => T,
  options?: UseLeafletCreateOptions
): UseLeafletCreateReturn<T>;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCreate/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCreate/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCreate/index.md)
