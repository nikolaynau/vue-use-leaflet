---
category: Layer
---

# useLeafletGridLayer

Generic class for handling a tiled grid of HTML elements. GridLayer will handle creating and animating these DOM elements for you.



## Demo

<ClientOnly>
  <Demo name="useLeafletGridLayer" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletGridLayer/demo.vue" />
</ClientOnly>

## Usage

To create a custom layer, implement the createTile() function, which will be passed a Point object with the x, y, and z (zoom level) coordinates to draw your tile.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletGridLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);

// create custom grid layer
const gridLayer = useLeafletGridLayer(coords => {
  // create a <canvas> element for drawing
  const tile = document.createElement('canvas');

  // setup tile width and height according to the options
  const size = this.getTileSize();
  tile.width = size.x;
  tile.height = size.y;

  // get a canvas context and draw something on it using coords.x, coords.y and coords.z
  const ctx = tile.getContext('2d');

  // return the tile so it can be rendered on screen
  return tile;
});

// display custom grid layer
useLeafletDisplayLayer(map, gridLayer);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

Tile creation can also be asynchronous, this is useful when using a third-party drawing library. Once the tile is finished drawing it can be passed to the done() callback.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletGridLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);

// create custom grid layer
const gridLayer = useLeafletGridLayer((coords, done) => {
  let error;

  // create a <canvas> element for drawing
  const tile = document.createElement('canvas');

  // setup tile width and height according to the options
  const size = this.getTileSize();
  tile.width = size.x;
  tile.height = size.y;

  // draw something asynchronously and pass the tile to the done() callback
  setTimeout(function () {
    done(error, tile);
  }, 1000);

  return tile;
});

// display custom grid layer
useLeafletDisplayLayer(map, gridLayer);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletGridLayerOptions<T extends GridLayer = GridLayer>
  extends GridLayerOptions {
  updateSources?: UpdateWatchSource<T>[];
  factory?: (...args: any[]) => T;
  dispose?: boolean;
}
export type UseLeafletGridLayerReturn<T extends GridLayer = GridLayer> =
  Ref<T | null>;
export declare function useLeafletGridLayer<T extends GridLayer = GridLayer>(
  createTile: (coords: Coords, done?: DoneCallback) => HTMLElement,
  options?: UseLeafletGridLayerOptions<T>
): UseLeafletGridLayerReturn<T>;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletGridLayer/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletGridLayer/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletGridLayer/index.md)
