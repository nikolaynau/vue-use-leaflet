---
category: Layer
---

# useLeafletTooltip

Used to display small texts on top of map layers.



## Demo

<ClientOnly>
  <Demo name="useLeafletTooltip" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletTooltip/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';
import type { LatLngTuple } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletTooltip
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// tooltip position
const latlng = ref<LatLngTuple>([0, 0]);

// tooltip content
const content = computed(() => `LatLng: ${latlng.value[0]},${latlng.value[1]}`);

// create tooltip
const tooltip = useLeafletTooltip(latlng, { content });

// display tooltip
useLeafletDisplayLayer(map, tooltip);

// latlng.value = [-10, -10]; // change tooltip position and redraw content
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletTooltipOptions
  extends Omit<
    TooltipOptions,
    'offset' | 'direction' | 'opacity' | 'className' | 'content'
  > {
  offset?: MaybeRefOrGetter<PointExpression | null | undefined>;
  direction?: MaybeRefOrGetter<Direction | null | undefined>;
  opacity?: MaybeRefOrGetter<number | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  content?: MaybeRef<
    | string
    | HTMLElement
    | ((layer: Layer) => string)
    | ((layer: Layer) => HTMLElement)
    | null
    | undefined
  >;
  source?: MaybeRefOrGetter<Layer | null | undefined>;
  defOptions?: TooltipOptions;
  updateSources?: UpdateWatchSource<Tooltip>[];
  factory?: (...args: any[]) => Tooltip;
  dispose?: boolean;
}
export type UseLeafletTooltipReturn = Ref<Tooltip | null>;
export declare function useLeafletTooltip(
  latlng?: MaybeRefOrGetter<LatLngExpression | null | undefined>,
  options?: UseLeafletTooltipOptions
): UseLeafletTooltipReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletTooltip/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletTooltip/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletTooltip/index.md)
