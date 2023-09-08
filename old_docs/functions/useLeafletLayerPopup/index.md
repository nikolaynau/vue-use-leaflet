---
category: Layer
---

# useLeafletLayerPopup

Used to bind a popup to layer (marker, path, etc).



## Demo

<ClientOnly>
  <Demo name="useLeafletLayerPopup" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerPopup/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker,
  useLeafletLayerPopup
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create marker
const marker = useLeafletMarker([0, 0]);

// bind popup to marker
const { visible, toggle } = useLeafletLayerPopup(marker, 'Text', {
  visible: true
});

// display marker and popup
useLeafletDisplayLayer(map, marker);

// visible.value = false; // hide popup
// toggle(); // show/hide popup
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export type LayerPopupReactiveProperty =
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
export interface UseLeafletLayerPopupOptions
  extends Omit<PopupOptions, LayerPopupReactiveProperty> {
  visible?: MaybeRef<boolean>;
  autoBind?: boolean;
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
  defOptions?: PopupOptions;
  updateSources?: UpdateWatchSource<Layer>[];
  dispose?: boolean;
}
export interface UseLeafletLayerPopupReturn {
  visible: Ref<boolean>;
  popup: {
    value: Popup | null;
  };
  bind: () => void;
  unbind: () => void;
  open: (latlng?: LatLngExpression) => void;
  close: () => void;
  toggle: () => void;
  isOpened: () => boolean;
}
export declare function useLeafletLayerPopup(
  source: MaybeRefOrGetter<Layer | null | undefined>,
  content?: MaybeRef<
    ((layer: Layer) => Content) | Popup | Content | null | undefined
  >,
  options?: UseLeafletLayerPopupOptions
): UseLeafletLayerPopupReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerPopup/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerPopup/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletLayerPopup/index.md)
