---
category: Layer
---

# useLeafletMarker

Marker is used to display clickable/draggable icons on the map.



## Demo

<ClientOnly>
  <Demo name="useLeafletMarker" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMarker/demo.vue" />
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

// create marker
const marker = useLeafletMarker([0, 0]);

// display marker
useLeafletDisplayLayer(map, marker);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletMarkerOptions
  extends Omit<
    MarkerOptions,
    'icon' | 'opacity' | 'zIndexOffset' | 'draggable'
  > {
  icon?: MaybeRefOrGetter<Icon | DivIcon | null | undefined>;
  opacity?: MaybeRefOrGetter<number | null | undefined>;
  zIndexOffset?: MaybeRefOrGetter<number | null | undefined>;
  draggable?: MaybeRefOrGetter<boolean | null | undefined>;
  defOptions?: MarkerOptions;
  updateSources?: UpdateWatchSource<Marker>[];
  factory?: (...args: any[]) => Marker;
  dispose?: boolean;
}
export type UseLeafletMarkerReturn = Ref<Marker | null>;
export declare function useLeafletMarker(
  latlng: MaybeRefOrGetter<LatLngExpression | null | undefined>,
  options?: UseLeafletMarkerOptions
): UseLeafletMarkerReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMarker/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMarker/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletMarker/index.md)
