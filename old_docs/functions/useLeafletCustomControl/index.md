---
category: Control
---

# useLeafletCustomControl

Create custom control. Your should implement the `onAdd` method.



## Demo

<ClientOnly>
  <Demo name="useLeafletCustomControl" source-url="https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCustomControl/demo.vue" />
</ClientOnly>

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { DomEvent } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayControl,
  useLeafletDisplayLayer,
  useLeafletCustomControl,
  useLeafletMarker
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

// create marker
const marker = useLeafletMarker([0, 0]);

// display marker
const { value: visible } = useLeafletDisplayLayer(map, marker, {
  controls: true
});

// custom control DOM element
const controlElement = ref<HTMLElement | null>(null);

// create custom control
const customControl = useLeafletCustomControl({
  onAdd: map => {
    // implement the onAdd method

    // create a control container and return it in this method
    const container = document.createElement('div');

    // disable zoom and moving map on container element
    DomEvent.disableClickPropagation(container);
    DomEvent.disableScrollPropagation(container);

    // add a custom control element to the container
    if (controlElement.value) {
      container.appendChild(controlElement.value);
    }

    // return container element
    return container;
  },
  onRemove: map => {
    // called when the custom control is removed
  },
  onDisable: (map, control) => {
    // called when the custom control is disabled
  },
  onEnable: (map, control) => {
    // called when the custom control is enabled
  }
});

// display custom control
useLeafletDisplayControl(map, customControl);
</script>

<template>
  <div ref="el" style="height: 250px"></div>
  <div ref="controlElement">
    <label>
      <span>visible: </span>
      <input type="checkbox" v-model="visible" />
    </label>
  </div>
</template>
```

## Type Declarations

```ts
export interface UseLeafletCustomControlOptions
  extends Omit<ControlOptions, 'position'> {
  position?: ControlPosition | string | undefined;
  disabled?: MaybeRefOrGetter<boolean>;
  factory?: (...args: any[]) => Control;
  dispose?: boolean;
  onAdd?: (map: Map, control: Control) => HTMLElement;
  onRemove?: (map: Map, control: Control) => void;
  onDisable?: (map: Map, control: Control) => void;
  onEnable?: (map: Map, control: Control) => void;
}
export type UseLeafletCustomControlReturn = Ref<Control | null>;
export declare function useLeafletCustomControl(
  options?: UseLeafletCustomControlOptions
): UseLeafletCustomControlReturn;
```

## Source

[Source](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCustomControl/index.ts) • [Demo](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCustomControl/demo.vue) • [Docs](https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/useLeafletCustomControl/index.md)
