---
category: Layer
---

# useLeafletImageOverlay

Used to load and display a single image over specific bounds of the map.



## Demo

<ClientOnly>
  <Demo name="useLeafletImageOverlay" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletImageOverlay/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletImageOverlay
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create image overlay
const imageOverlay = useLeafletImageOverlay(
  'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
  [
    [0, 0],
    [-20, -20]
  ]
);

// display image overlay
useLeafletDisplayLayer(map, imageOverlay);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletImageOverlayOptions
  extends Omit<
    ImageOverlayOptions,
    'opacity' | 'alt' | 'zIndex' | 'className'
  > {
  opacity?: MaybeRefOrGetter<number | null | undefined>;
  alt?: MaybeRefOrGetter<string | null | undefined>;
  zIndex?: MaybeRefOrGetter<number | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  defOptions?: ImageOverlayOptions;
  updateSources?: UpdateWatchSource<ImageOverlay>[];
  factory?: (...args: any[]) => ImageOverlay;
  dispose?: boolean;
}
export type UseLeafletImageOverlayReturn = Ref<ImageOverlay | null>;
export declare function useLeafletImageOverlay(
  imageUrl: MaybeRefOrGetter<string | null | undefined>,
  bounds: MaybeRefOrGetter<LatLngBoundsExpression | null | undefined>,
  options?: UseLeafletImageOverlayOptions
): UseLeafletImageOverlayReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletImageOverlay/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletImageOverlay/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletImageOverlay/index.md)
