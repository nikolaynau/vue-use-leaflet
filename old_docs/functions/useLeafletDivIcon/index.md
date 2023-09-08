---
category: Layer
---

# useLeafletDivIcon

Represents a lightweight icon for markers that uses a simple \<div\> element instead of an image.



## Demo

<ClientOnly>
  <Demo name="useLeafletDivIcon" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDivIcon/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker,
  useLeafletDivIcon
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create counter
const counter = ref(10);

// create div icon html
const html = computed(() => `<div>${counter.value}</div>`);

// create div icon
const iconA = useLeafletDivIcon(html, {
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  className: 'custom-marker'
});

// create marker with icon
const markerA = useLeafletMarker([0, 0], { icon: iconA });

// display marker
useLeafletDisplayLayer(map, markerA);

// icon dom element
const iconEl = ref<HTMLElement | null>(null);

// create icon with dom element
const iconB = useLeafletDivIcon(iconEl, {
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  className: 'counter-marker'
});

// create marker
const markerB = useLeafletMarker([-25, -25], { icon: iconB });

// display marker
useLeafletDisplayLayer(map, markerB);

// counter.value += 1; // update icons
</script>

<template>
  <div ref="el" style="height: 250px"></div>
  <div ref="iconEl">{{ counter }}</div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletDivIconOptions
  extends Omit<
    DivIconOptions,
    'html' | 'bgPos' | 'iconSize' | 'iconAnchor' | 'className'
  > {
  bgPos?: MaybeRefOrGetter<PointExpression | null | undefined>;
  iconSize?: MaybeRefOrGetter<PointExpression | null | undefined>;
  iconAnchor?: MaybeRefOrGetter<PointExpression | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  knownClasses?: MaybeRefOrGetter<string[] | null | undefined>;
  watch?: WatchSource<any>;
  factory?: (...args: any[]) => DivIcon;
}
export type UseLeafletDivIconReturn = Ref<DivIcon | null>;
export declare function useLeafletDivIcon(
  html?: MaybeRefOrGetter<string | HTMLElement | false | null | undefined>,
  options?: UseLeafletDivIconOptions
): UseLeafletDivIconReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDivIcon/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDivIcon/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDivIcon/index.md)
