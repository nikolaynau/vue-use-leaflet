---
category: Control
---

# useLeafletScaleControl

A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems.



## Demo

<ClientOnly>
  <Demo name="useLeafletScaleControl" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletScaleControl/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayControl,
  useLeafletDisplayLayer,
  useLeafletScaleControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create scale control
const scaleControl = useLeafletScaleControl();

// display scale control
useLeafletDisplayControl(map, scaleControl);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletScaleControlOptions
  extends Omit<Control.ScaleOptions, 'position'> {
  position?: ControlPosition | string | undefined;
  factory?: (...args: any[]) => Control.Attribution;
  dispose?: boolean;
}
export type UseLeafletScaleControlReturn = Ref<Control.Scale | null>;
export declare function useLeafletScaleControl(
  options?: UseLeafletScaleControlOptions
): UseLeafletScaleControlReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletScaleControl/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletScaleControl/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletScaleControl/index.md)
