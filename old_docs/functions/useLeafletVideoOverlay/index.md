---
category: Layer
---

# useLeafletVideoOverlay

Used to load and display a video player over specific bounds of the map.



## Demo

<ClientOnly>
  <Demo name="useLeafletVideoOverlay" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletVideoOverlay/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletVideoOverlay
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create video overlay
const videoOverlay = useLeafletVideoOverlay(
  'https://labs.mapbox.com/bites/00188/patricia_nasa.webm',
  [
    [0, 0],
    [-20, -20]
  ]
);

// display video overlay
useLeafletDisplayLayer(map, videoOverlay);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletVideoOverlayOptions
  extends Omit<
    VideoOverlayOptions,
    | 'autoplay'
    | 'loop'
    | 'keepAspectRatio'
    | 'muted'
    | 'playsInline'
    | 'opacity'
    | 'zIndex'
    | 'className'
  > {
  autoplay?: MaybeRefOrGetter<boolean | null | undefined>;
  loop?: MaybeRefOrGetter<boolean | null | undefined>;
  keepAspectRatio?: MaybeRefOrGetter<boolean | null | undefined>;
  muted?: MaybeRefOrGetter<boolean | null | undefined>;
  playsInline?: MaybeRefOrGetter<boolean | null | undefined>;
  opacity?: MaybeRefOrGetter<number | null | undefined>;
  zIndex?: MaybeRefOrGetter<number | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  defOptions?: VideoOverlayOptions;
  updateSources?: UpdateWatchSource<VideoOverlay>[];
  factory?: (...args: any[]) => VideoOverlay;
  dispose?: boolean;
}
export type UseLeafletVideoOverlayReturn = Ref<VideoOverlay | null>;
export declare function useLeafletVideoOverlay(
  video: MaybeRefOrGetter<
    string | string[] | HTMLVideoElement | null | undefined
  >,
  bounds: MaybeRefOrGetter<LatLngBoundsExpression | null | undefined>,
  options?: UseLeafletVideoOverlayOptions
): UseLeafletVideoOverlayReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletVideoOverlay/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletVideoOverlay/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletVideoOverlay/index.md)
