---
category: Other
---

# useLeafletToggleObject

Switch between two states `true` and `false`.



## Demo

<ClientOnly>
  <Demo name="useLeafletToggleObject" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletToggleObject/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletToggleObject,
  useLeafletMarker,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create marker
const marker = useLeafletMarker([0, 0]);

// create toggle object
const toggle = useLeafletToggleObject(map, marker, {
  onToggle: (source, target, value) => {
    if (value) {
      source.addLayer(target);
    } else {
      source.removeLayer(target);
    }
  }
});

// toggle() // hide marker
// toggle() // show marker
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletToggleObjectOptions<Controls extends boolean, S, T> {
  initialValue?: MaybeRef<boolean>;
  controls?: Controls;
  flushSync?: boolean;
  dispose?: boolean;
  onToggle?: (source: S, target: T, value: boolean) => void;
}
export type UseLeafletToggleObjectReturn = (value?: boolean) => boolean;
export interface UseLeafletToggleObjectReturnWithControls {
  toggle: (value?: boolean) => boolean;
  value: Ref<boolean>;
}
export declare function useLeafletToggleObject<S, T>(
  source: MaybeRefOrGetter<S | null | undefined>,
  target: MaybeRefOrGetter<T | null | undefined>,
  options?: UseLeafletToggleObjectOptions<false, S, T>
): UseLeafletToggleObjectReturn;
export declare function useLeafletToggleObject<S, T>(
  source: MaybeRefOrGetter<S | null | undefined>,
  target: MaybeRefOrGetter<T | null | undefined>,
  options: UseLeafletToggleObjectOptions<true, S, T>
): UseLeafletToggleObjectReturnWithControls;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletToggleObject/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletToggleObject/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletToggleObject/index.md)
