---
category: Layer
---

# useLeafletPopup

Used to open popups in certain places of the map.



## Demo

<ClientOnly>
  <Demo name="useLeafletPopup" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPopup/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';
import type { LatLngTuple } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletPopup
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// popup position
const latlng = ref<LatLngTuple>([0, 0]);

// popup content
const content = computed(() => `LatLng: ${latlng.value[0]},${latlng.value[1]}`);

// create popup
const popup = useLeafletPopup(latlng, { content });

// display popup
useLeafletDisplayLayer(map, popup);

// latlng.value = [-10, -10]; // change popup position and redraw content
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export type PopupReactiveProperty =
  | 'offset'
  | 'maxWidth'
  | 'minWidth'
  | 'maxHeight'
  | 'className'
  | 'content'
  | 'keepInView'
  | 'autoPan'
  | 'autoPanPaddingTopLeft'
  | 'autoPanPaddingBottomRight'
  | 'autoPanPadding';
export interface UseLeafletPopupOptions
  extends Omit<PopupOptions, PopupReactiveProperty> {
  offset?: MaybeRefOrGetter<PointExpression | null | undefined>;
  maxWidth?: MaybeRefOrGetter<number | null | undefined>;
  minWidth?: MaybeRefOrGetter<number | null | undefined>;
  maxHeight?: MaybeRefOrGetter<number | null | undefined>;
  keepInView?: MaybeRefOrGetter<boolean | null | undefined>;
  autoPan?: MaybeRefOrGetter<boolean | null | undefined>;
  autoPanPaddingTopLeft?: MaybeRefOrGetter<PointExpression | null | undefined>;
  autoPanPaddingBottomRight?: MaybeRefOrGetter<
    PointExpression | null | undefined
  >;
  autoPanPadding?: MaybeRefOrGetter<PointExpression | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  content?: MaybeRef<
    | string
    | HTMLElement
    | ((layer: Layer) => string)
    | ((layer: Layer) => HTMLElement)
    | null
    | undefined
  >;
  source?: MaybeRefOrGetter<Layer | null | undefined>;
  defOptions?: PopupOptions;
  updateSources?: UpdateWatchSource<Popup>[];
  factory?: (...args: any[]) => Popup;
  dispose?: boolean;
}
export type UseLeafletPopupReturn = Ref<Popup | null>;
export declare function useLeafletPopup(
  latlng?: MaybeRefOrGetter<LatLngExpression | null | undefined>,
  options?: UseLeafletPopupOptions
): UseLeafletPopupReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPopup/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPopup/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletPopup/index.md)
