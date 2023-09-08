---
category: Layer
---

# useLeafletSvgOverlay

Used to load, display and provide DOM access to an SVG file over specific bounds of the map.



## Demo

<ClientOnly>
  <Demo name="useLeafletSvgOverlay" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletSvgOverlay/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import type { LatLngBoundsLiteral } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletSvgOverlay
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create svg element
const svgElement = document.createElementNS(
  'http://www.w3.org/2000/svg',
  'svg'
);
svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
svgElement.setAttribute('viewBox', '0 0 200 200');
svgElement.innerHTML =
  '<rect width="200" height="200"/><rect x="75" y="23" width="50" height="50" style="fill:red"/><rect x="75" y="123" width="50" height="50" style="fill:#0013ff"/>';

// svg overlay bounds
const bounds: LatLngBoundsLiteral = [
  [0, 0],
  [-20, -20]
];

// create svg overlay
const videoOverlay = useLeafletSvgOverlay(svgElement, bounds);

// display image overlay
useLeafletDisplayLayer(map, videoOverlay);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletSvgOverlayOptions
  extends Omit<ImageOverlayOptions, 'opacity' | 'zIndex' | 'className'> {
  opacity?: MaybeRefOrGetter<number | null | undefined>;
  zIndex?: MaybeRefOrGetter<number | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  defOptions?: ImageOverlayOptions;
  updateSources?: UpdateWatchSource<SVGOverlay>[];
  factory?: (...args: any[]) => SVGOverlay;
  dispose?: boolean;
}
export type UseLeafletSvgOverlayReturn = Ref<SVGOverlay | null>;
export declare function useLeafletSvgOverlay(
  svgElement: MaybeRefOrGetter<SVGElement | null | undefined>,
  bounds: MaybeRefOrGetter<LatLngBoundsExpression | null | undefined>,
  options?: UseLeafletSvgOverlayOptions
): UseLeafletSvgOverlayReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletSvgOverlay/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletSvgOverlay/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletSvgOverlay/index.md)
