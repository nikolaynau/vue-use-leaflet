---
category: Other
---

# useLeafletDisplayObject

Manage the visibility of a custom object.



## Demo

<ClientOnly>
  <Demo name="useLeafletDisplayObject" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayObject/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayObject
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);

const toggle = useLeafletDisplayObject(map, tileLayer, {
  show: (source, target) => source.addLayer(target),
  hide: (source, target) => source.removeLayer(target),
  shown: (source, target) => source.hasLayer(target)
});

// toggle() // hide tile layer
// toggle() // show tile layer
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletDisplayObjectOptions<Controls extends boolean, S, T>
  extends Omit<UseLeafletToggleObjectOptions<Controls, S, T>, 'onToggle'> {
  show?: (source: S, target: T) => void;
  hide?: (source: S, target: T) => void;
  shown?: (source: S, target: T) => boolean;
}
export type UseLeafletDisplayObjectReturn = UseLeafletToggleObjectReturn;
export interface UseLeafletDisplayObjectReturnWithControls
  extends UseLeafletToggleObjectReturnWithControls {
  show: Fn;
  hide: Fn;
  shown: () => boolean;
}
export declare function useLeafletDisplayObject<S, T>(
  source: MaybeRefOrGetter<S | null | undefined>,
  target: MaybeRefOrGetter<T | null | undefined>,
  options?: UseLeafletDisplayObjectOptions<false, S, T>
): UseLeafletDisplayObjectReturn;
export declare function useLeafletDisplayObject<S, T>(
  source: MaybeRefOrGetter<S | null | undefined>,
  target: MaybeRefOrGetter<T | null | undefined>,
  options: UseLeafletDisplayObjectOptions<true, S, T>
): UseLeafletDisplayObjectReturnWithControls;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayObject/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayObject/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDisplayObject/index.md)
