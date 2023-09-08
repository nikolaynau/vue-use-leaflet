---
category: Control
---

# useLeafletZoomControl

A basic zoom control with two buttons (zoom in and zoom out).



## Demo

<ClientOnly>
  <Demo name="useLeafletZoomControl" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletZoomControl/demo.vue" />
</ClientOnly>

## Usage

It is put on the map by default unless you set its `zoomControl` option to `false`.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayControl,
  useLeafletDisplayLayer,
  useLeafletZoomControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { zoomControl: false });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// enable/disable zoom control
const disabled = ref(false);

// create zoom control
const zoomControl = useLeafletZoomControl({
  disabled
});

// display zoom control
useLeafletDisplayControl(map, zoomControl);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletZoomControlOptions
  extends Omit<Control.ZoomOptions, 'position'> {
  position?: ControlPosition | string | undefined;
  disabled?: MaybeRefOrGetter<boolean>;
  factory?: (...args: any[]) => Control.Zoom;
  dispose?: boolean;
}
export type UseLeafletZoomControlReturn = Ref<Control.Zoom | null>;
export declare function useLeafletZoomControl(
  options?: UseLeafletZoomControlOptions
): UseLeafletZoomControlReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletZoomControl/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletZoomControl/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletZoomControl/index.md)
