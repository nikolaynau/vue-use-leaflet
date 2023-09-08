---
category: Map
---

# useLeafletPane

Creates a new map panes. Panes are DOM elements used to control the ordering of layers on the map.



## Demo

<ClientOnly>
  <Demo name="useLeafletPane" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPane/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { CircleMarker, Marker } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletLayer,
  useLeafletMarker,
  useLeafletDeps,
  useLeafletPane
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create paneA with z-index 800
const { paneElements } = useLeafletPane(map, 'paneA', { zIndex: 800 });

// create sync paneA with z-index 900
useLeafletPane(map, 'paneB', { zIndex: 900, flushSync: true });

// create a marker and place it on paneA
const marker = useLeafletMarker([0, 0], { pane: 'paneA' });

// create a circle marker and place it on paneB
const circle = useLeafletLayer(
  () =>
    new CircleMarker([0, 0], { radius: 20, pane: 'paneB', fillColor: '#000' })
);

// wait for the pane to be created and display marker on the map
useLeafletDisplayLayer(
  map,
  useLeafletDeps(marker, () => paneElements.value.paneA)
);

// display circle marker
useLeafletDisplayLayer(map, circle);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletPaneOptions {
  zIndex?: MaybeRefOrGetter<number | null | undefined>;
  flushSync?: boolean;
  dispose?: boolean;
}
export interface UseLeafletPaneReturn {
  currentPanes: ComputedRef<HTMLElement[]>;
  paneElements: LeafletPaneElements;
}
export type LeafletPaneElements = Readonly<Ref<Record<string, HTMLElement>>>;
export interface LeafletPaneProvider {
  createPane(name: string, container?: HTMLElement): HTMLElement;
  getPane(name: string | HTMLElement): HTMLElement | undefined;
  getPanes(): Record<string, HTMLElement>;
}
export declare function useLeafletPane(
  source: MaybeRefOrGetter<LeafletPaneProvider | null | undefined>,
  pane: MaybeRefOrGetter<Arrayable<string> | null | undefined>,
  options?: UseLeafletPaneOptions
): UseLeafletPaneReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPane/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPane/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPane/index.md)
