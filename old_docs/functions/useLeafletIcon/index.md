---
category: Layer
---

# useLeafletIcon

Represents an icon to provide when creating a marker.



## Demo

<ClientOnly>
  <Demo name="useLeafletIcon" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletIcon/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker,
  useLeafletIcon
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// icon image url
const iconUrl = ref('custom/marker-icon.png');

// create icon
const icon = useLeafletIcon(iconUrl, {
  iconSize: [32, 42],
  iconAnchor: [16, 42]
});

// create marker with icon
const marker = useLeafletMarker([0, 0], { icon });

// display icon
useLeafletDisplayLayer(map, marker);

// change icon image
// iconUrl.value = 'custom/marker-icon-alt.png';
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletIconOptions
  extends Omit<
    IconOptions,
    | 'iconUrl'
    | 'iconRetinaUrl'
    | 'iconSize'
    | 'iconAnchor'
    | 'shadowUrl'
    | 'shadowRetinaUrl'
    | 'shadowSize'
    | 'shadowAnchor'
    | 'className'
  > {
  iconRetinaUrl?: MaybeRefOrGetter<string | null | undefined>;
  iconSize?: MaybeRefOrGetter<PointExpression | null | undefined>;
  iconAnchor?: MaybeRefOrGetter<PointExpression | null | undefined>;
  shadowUrl?: MaybeRefOrGetter<string | null | undefined>;
  shadowRetinaUrl?: MaybeRefOrGetter<string | null | undefined>;
  shadowSize?: MaybeRefOrGetter<PointExpression | null | undefined>;
  shadowAnchor?: MaybeRefOrGetter<PointExpression | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  knownClasses?: MaybeRefOrGetter<string[] | null | undefined>;
  factory?: (...args: any[]) => Icon;
}
export type UseLeafletIconReturn = Ref<Icon | null>;
export declare function useLeafletIcon(
  iconUrl: MaybeRefOrGetter<string | null | undefined>,
  options?: UseLeafletIconOptions
): UseLeafletIconReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletIcon/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletIcon/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletIcon/index.md)
