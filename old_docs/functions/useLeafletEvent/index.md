---
category: Event
---

# useLeafletEvent

A set of methods shared between event-powered classes (like Map and Marker).



## Demo

<ClientOnly>
  <Demo name="useLeafletEvent" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletEvent/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import type { LatLng, LeafletEvent, Map } from 'leaflet';
import {
  useLeafletMap,
  useLeafletEvent,
  useLeafletTileLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// subscribe to moveend map event
const cleanup = useLeafletEvent(map, 'moveend', (e: LeafletEvent) => {
  // called when the center of the map stops changing
});
// cleanup() // unregister the listener
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export declare function useLeafletEvent(
  target: MaybeRefOrGetter<Evented | null | undefined> | undefined,
  event: Arrayable<string>,
  listener: Arrayable<(ev: LeafletEvent) => any>
): import('@vueuse/shared').Fn;
export type UseLeafletEventReturn = ReturnType<typeof useLeafletEvent>;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletEvent/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletEvent/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletEvent/index.md)
