---
category: Other
---

# useLeafletDiff

Watch the source of the array and call the `add` and `remove` functions when the array changes.



## Demo

<ClientOnly>
  <Demo name="useLeafletDiff" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDiff/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { markRaw, reactive, ref } from 'vue';
import { Marker, LayerGroup, Util } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletDiff
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create layer group
const layerGroup = new LayerGroup();

// create markers
const markerA = markRaw(new Marker([0, 0]));
const markerB = markRaw(new Marker([-20, -20]));
const markerC = markRaw(new Marker([-40, -40]));

// source for diff
const layers = reactive([markerA, markerB]);

// create array diff
useLeafletDiff(layers, compare, {
  // called when items need to be added
  add: layers => {
    layers.forEach(layer => {
      layerGroup.addLayer(layer);
    });
  },

  // called when items need to be removed
  remove: layers => {
    layers.forEach(layer => {
      layerGroup.removeLayer(layer);
    });
  },

  // watch options
  watchOptions: {
    immediate: true
  }
});

// display layer group
const toggle = useLeafletDisplayLayer(map, layerGroup);

// compare function
function compare(a: Marker, b: Marker): boolean {
  return Util.stamp(a) === Util.stamp(b);
}

// add marker to layer group
// layers.push(markerC);

// show/hide layer group with markers
// toggle();
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletDiffOptions<T> {
  enabled?: boolean;
  diffFn?: ArrayDiffFunction<T>;
  update?: (newVal: T[], oldVal: T[] | undefined) => void;
  add?: (arr: T[]) => void;
  remove?: (arr: T[]) => void;
  watchOptions?: WatchOptions;
}
export type UseLeafletDiffReturn = () => void;
export type ArrayDiffFunction<T = any> = (
  newArr: T[],
  oldArr: T[]
) => {
  remove: T[];
  add: T[];
};
export declare function useLeafletDiff<T>(
  source: MaybeRefOrGetter<T[]>,
  compareFn: (value: T, othVal: T) => boolean,
  options?: UseLeafletDiffOptions<T>
): UseLeafletDiffReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDiff/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDiff/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletDiff/index.md)
