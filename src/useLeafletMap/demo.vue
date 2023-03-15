<script setup lang="ts">
import { ref, watch } from 'vue';
import { useLeafletMap } from 'vue-use-leaflet';

const element = ref<HTMLElement | null>(null);
const map = useLeafletMap(element);

watch(map, () => {
  console.log(map.value);
});
</script>

<template>
  <div ref="element" style="height: 250px"></div>
</template>
