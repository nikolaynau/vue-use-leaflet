---
category: Control
---

# useLeafletRemoveControl

Remove control when component is unmounted, set ref to null or manually.



## Demo

<ClientOnly>
  <Demo name="useLeafletRemoveControl" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRemoveControl/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletRemoveControl,
  useLeafletScaleControl,
  useLeafletDisplayControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const scaleControl = useLeafletScaleControl();
useLeafletDisplayControl(map, scaleControl);

const remove = useLeafletRemoveControl(scaleControl);
// remove() // OR
// scaleControl.value = null // OR
// component is unmounted
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface LeafletRemovableControl {
  remove(): this;
}
export declare function useLeafletRemoveControl<
  T extends LeafletRemovableControl = LeafletRemovableControl
>(
  source: MaybeRefOrGetter<T | null | undefined>,
  options?: UseLeafletRemoveObjectOptions<T>
): UseLeafletRemoveObjectReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRemoveControl/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRemoveControl/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRemoveControl/index.md)
