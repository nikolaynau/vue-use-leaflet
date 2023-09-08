---
category: Layer
---

# useLeafletGeoJson

Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse GeoJSON data and display it on the map.



## Demo

<ClientOnly>
  <Demo name="useLeafletGeoJson" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletGeoJson/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { PathOptions } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletGeoJson
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { zoom: 2 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// GeoJSON data
const geojson = ref({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [0, 0] },
      properties: { name: 'a' }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [0, 0],
          [-10, -10],
          [-20, -20]
        ]
      },
      properties: {
        name: 'b'
      }
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-20, -20] },
      properties: { name: 'c' }
    }
  ]
});

// vector layers style
const style = reactive({ color: 'green' }) as PathOptions;

// create geojson layer
const geoJsonLayer = useLeafletGeoJson(geojson, { style });

// display geojson
useLeafletDisplayLayer(map, geoJsonLayer);

// style.color = 'red'; // change the color of vector layers
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletGeoJsonOptions
  extends Omit<GeoJSONOptions, 'style'> {
  style?: MaybeRef<PathOptions | StyleFunction | null | undefined>;
  error?: Ref<Error | null | undefined>;
  watchDeep?: boolean;
  updateSources?: UpdateWatchSource<GeoJSON>[];
  factory?: (...args: any[]) => GeoJSON;
  dispose?: boolean;
}
export type UseLeafletGeoJsonReturn = Ref<GeoJSON | null>;
export declare function useLeafletGeoJson<T extends object>(
  geojson: MaybeRefOrGetter<T | null | undefined>,
  options?: UseLeafletGeoJsonOptions
): UseLeafletGeoJsonReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletGeoJson/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletGeoJson/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletGeoJson/index.md)
