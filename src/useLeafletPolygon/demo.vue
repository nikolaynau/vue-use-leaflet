<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletPolygon
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const color = ref<string>('green');

const polygon = useLeafletPolygon(
  [
    [0, -15],
    [-5, -25],
    [-15, -25],
    [-10, -15]
  ],
  { color }
);

const polygonWithHoles = useLeafletPolygon(
  [
    // outer ring
    [
      [-15, -15],
      [-17, -25],
      [-27, -25],
      [-27, -15]
    ],
    // hole
    [
      [-18, -20],
      [-18, -20],
      [-23, -23],
      [-24, -17]
    ]
  ],
  { color }
);

const multiPolygon = useLeafletPolygon(
  [
    [
      // first polygon
      [
        [0, -2],
        [-5, -10],
        [-10, -10],
        [-8, -2]
      ]
    ],
    [
      // second polygon
      [
        [-10, -2],
        [-15, -10],
        [-20, -10],
        [-15, -2]
      ]
    ]
  ],
  { color }
);

useLeafletDisplayLayer(map, polygon);
useLeafletDisplayLayer(map, polygonWithHoles);
useLeafletDisplayLayer(map, multiPolygon);
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <div>
    Color:
    <select v-model="color">
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="red">Red</option>
      <option value="black">Black</option>
    </select>
    Selected: {{ color }}
  </div>
</template>
