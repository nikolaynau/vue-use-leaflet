---
category: Layer
---

# useLeafletWmsTileLayer

Used to display [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services as tile layers on the map.



## Demo

<ClientOnly>
  <Demo name="useLeafletWmsTileLayer" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletWmsTileLayer/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletWmsTileLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);

// create WMS tile layer
const wms = useLeafletWmsTileLayer(
  'http://ows.mundialis.de/services/service?',
  { layers: 'TOPO-OSM-WMS' }
);

// display WMS tile layer
useLeafletDisplayLayer(map, wms);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletWmsTileLayerOptions extends WMSOptions {
  updateSources?: UpdateWatchSource<TileLayer.WMS>[];
  factory?: (...args: any[]) => TileLayer.WMS;
  defParams?: WMSParams;
  dispose?: boolean;
}
export type UseLeafletWmsTileLayerReturn = Ref<TileLayer.WMS | null>;
export declare function useLeafletWmsTileLayer(
  url: MaybeRefOrGetter<string | null | undefined>,
  params?: MaybeRefOrGetter<WMSParams | null | undefined>,
  options?: UseLeafletWmsTileLayerOptions
): UseLeafletWmsTileLayerReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletWmsTileLayer/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletWmsTileLayer/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletWmsTileLayer/index.md)
