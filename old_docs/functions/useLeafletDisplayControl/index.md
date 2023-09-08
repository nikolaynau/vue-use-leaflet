---
category: Control
---

# useLeafletDisplayControl

Show the control object on the map.



## Demo

<ClientOnly>
  <Demo name="useLeafletDisplayControl" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayControl/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletDisplayControl,
  useLeafletLayersControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// initial visible value
const visible = ref(true);

// create layers control
const layersControl = useLeafletLayersControl([
  { name: 'Open Street Map', layer: tileLayer }
]);

// display layers control
const { toggle } = useLeafletDisplayControl(map, layersControl, {
  controls: true,
  initialValue: visible
});

// toggle() // show / hide control
// visible.value = false // hide control
// visible.value = true // show control
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export type UseLeafletDisplayControlOptions<Controls extends boolean> = Omit<
  UseLeafletDisplayObjectOptions<Controls, LeafletDisplayControl, Control>,
  'show' | 'hide' | 'shown'
>;
export interface LeafletDisplayControl {
  addControl(control: Control): this;
  removeControl(control: Control): this;
}
export type UseLeafletDisplayControlReturn = UseLeafletDisplayObjectReturn;
export type UseLeafletDisplayControlReturnWithControls =
  UseLeafletDisplayObjectReturnWithControls;
export declare function useLeafletDisplayControl(
  source: MaybeRefOrGetter<LeafletDisplayControl | null | undefined>,
  target: MaybeRefOrGetter<Control | null | undefined>,
  options?: UseLeafletDisplayControlOptions<false>
): UseLeafletDisplayControlReturn;
export declare function useLeafletDisplayControl(
  source: MaybeRefOrGetter<LeafletDisplayControl | null | undefined>,
  target: MaybeRefOrGetter<Control | null | undefined>,
  options: UseLeafletDisplayControlOptions<true>
): UseLeafletDisplayControlReturnWithControls;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayControl/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayControl/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayControl/index.md)
