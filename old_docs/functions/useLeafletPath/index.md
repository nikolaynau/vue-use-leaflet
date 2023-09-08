---
category: Layer
---

# useLeafletPath

An abstract function that contains options and constants shared between vector overlays (Polygon, Polyline, Circle). This is used with the `factory` function.



## Demo

<ClientOnly>
  <Demo name="useLeafletPath" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPath/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Polygon, Polyline } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletPath
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// path color
const color = ref<string>('green');

// create polygon
const polygon = useLeafletPath(
  opt =>
    new Polygon(
      [
        [0, -15],
        [-5, -25],
        [-15, -25],
        [-10, -15]
      ],
      opt
    ),
  { color }
);

// create polyline
const polyline = useLeafletPath(
  opt =>
    new Polyline(
      [
        [0, 0],
        [-20, -20]
      ],
      opt
    ),
  { color }
);

// display polyline
useLeafletDisplayLayer(map, polyline);

// display polygon
useLeafletDisplayLayer(map, polygon);

// color.value = 'black'; // redraw path
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export type PathReactiveProperty =
  | 'stroke'
  | 'color'
  | 'weight'
  | 'opacity'
  | 'lineCap'
  | 'lineJoin'
  | 'dashArray'
  | 'dashOffset'
  | 'fill'
  | 'fillColor'
  | 'fillOpacity'
  | 'fillRule'
  | 'className';
export interface UseLeafletPathOptions<T extends Path = Path>
  extends Omit<PathOptions, PathReactiveProperty> {
  stroke?: MaybeRefOrGetter<boolean | null | undefined>;
  color?: MaybeRefOrGetter<string | null | undefined>;
  weight?: MaybeRefOrGetter<number | null | undefined>;
  opacity?: MaybeRefOrGetter<number | null | undefined>;
  lineCap?: MaybeRefOrGetter<LineCapShape | null | undefined>;
  lineJoin?: MaybeRefOrGetter<LineJoinShape | null | undefined>;
  dashArray?: MaybeRefOrGetter<string | null | number[] | null | undefined>;
  dashOffset?: MaybeRefOrGetter<string | null | undefined>;
  fill?: MaybeRefOrGetter<boolean | null | undefined>;
  fillColor?: MaybeRefOrGetter<string | null | undefined>;
  fillOpacity?: MaybeRefOrGetter<number | null | undefined>;
  fillRule?: MaybeRefOrGetter<FillRule | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  defOptions?: PathOptions;
  updateSources?: UpdateWatchSource<T>[];
  watch?: WatchSource<any>;
  dispose?: boolean;
}
export type UseLeafletPathReturn<T extends Path = Path> = Ref<T | null>;
export declare function useLeafletPath<T extends Path = Path>(
  factory: (opt: PathOptions) => T,
  options?: UseLeafletPathOptions<T>
): UseLeafletPathReturn<T>;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPath/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPath/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPath/index.md)
