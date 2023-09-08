---
category: Layer
---

# useLeafletLayerTooltip

Used to bind a tooltip to layer (marker, path, etc).



## Demo

<ClientOnly>
  <Demo name="useLeafletLayerTooltip" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerTooltip/demo.vue" />
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
  useLeafletLayerTooltip
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create marker
const marker = useLeafletMarker([0, 0]);

// bind tooltip to marker
const { visible, toggle } = useLeafletLayerTooltip(marker, 'Text', {
  visible: true
});

// display marker and tooltip
useLeafletDisplayLayer(map, marker);

// visible.value = false; // hide tooltip
// toggle(); // show/hide tooltip
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletLayerTooltipOptions
  extends Omit<
    TooltipOptions,
    'offset' | 'direction' | 'opacity' | 'className'
  > {
  visible?: MaybeRef<boolean>;
  autoBind?: boolean;
  offset?: MaybeRefOrGetter<PointExpression | null | undefined>;
  direction?: MaybeRefOrGetter<Direction | null | undefined>;
  opacity?: MaybeRefOrGetter<number | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  defOptions?: TooltipOptions;
  updateSources?: UpdateWatchSource<Layer>[];
  dispose?: boolean;
}
export interface UseLeafletLayerTooltipReturn {
  visible: Ref<boolean>;
  tooltip: {
    value: Tooltip | null;
  };
  bind: () => void;
  unbind: () => void;
  open: (latlng?: LatLngExpression) => void;
  close: () => void;
  toggle: () => void;
  isOpened: () => boolean;
}
export declare function useLeafletLayerTooltip(
  source: MaybeRefOrGetter<Layer | null | undefined>,
  content?: MaybeRef<
    ((layer: Layer) => Content) | Tooltip | Content | null | undefined
  >,
  options?: UseLeafletLayerTooltipOptions
): UseLeafletLayerTooltipReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerTooltip/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerTooltip/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerTooltip/index.md)
