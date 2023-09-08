---
category: Other
---

# useLeafletRemoveObject

Manage the removal of a custom object.



## Demo

<ClientOnly>
  <Demo name="useLeafletRemoveObject" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRemoveObject/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletRemoveObject
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const watchSource = ref(false);
const remove = useLeafletRemoveObject(map, {
  remove: map => map.off().remove(),
  isRemoved: map => !(map.getContainer() as any)._leaflet_id,
  cleanRef: true,
  watch: watchSource
});

// remove() // OR
// map.value = null // OR
// watchSource.value = true // OR
// component is unmounted
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletRemoveObjectOptions<T> {
  remove?: (source: T) => void;
  isRemoved?: (source: T) => boolean;
  watch?: WatchSource<any>;
  cleanRef?: boolean;
  cleanVal?: any;
  dispose?: boolean;
  flushSync?: boolean;
}
export type UseLeafletRemoveObjectReturn = () => void;
export declare function useLeafletRemoveObject<T = any>(
  source: MaybeRefOrGetter<T | null | undefined>,
  options?: UseLeafletRemoveObjectOptions<T>
): UseLeafletRemoveObjectReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRemoveObject/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRemoveObject/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletRemoveObject/index.md)
