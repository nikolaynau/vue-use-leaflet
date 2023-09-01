import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  type Ref,
  defineComponent,
  h,
  nextTick,
  onUnmounted,
  ref
} from 'vue-demi';
import {
  GeoJSON,
  Marker,
  Polyline,
  PathOptions,
  StyleFunction,
  Polygon
} from 'leaflet';
import { mount } from '../../.test';
import { useLeafletGeoJson } from '.';

describe('useLeafletGeoJson', () => {
  let geojson: Ref<Object>;

  beforeEach(() => {
    geojson = ref({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0] },
          properties: { name: 'a' }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [0, 0],
              [-10, -10],
              [-20, -20]
            ]
          },
          properties: {
            name: 'b'
          }
        }
      ]
    });
  });

  it('should work empty init', () => {
    expect(useLeafletGeoJson(null).value?.getLayers()).toHaveLength(0);
    expect(useLeafletGeoJson(undefined).value?.getLayers()).toHaveLength(0);
  });

  it('should set error when invalid geojson', () => {
    const error = ref<Error | null>(null);
    const instance = useLeafletGeoJson({}, { error });
    expect(instance.value).toBeInstanceOf(GeoJSON);
    expect(instance.value!.getLayers()).toHaveLength(0);
    expect(error.value?.message).toContain('Invalid GeoJSON');
  });

  it('should work init', () => {
    const instance = useLeafletGeoJson(geojson);
    expect(instance.value).toBeInstanceOf(GeoJSON);
    const layers = instance.value!.getLayers();
    expect(layers).toHaveLength(2);
    expect(layers[0]).toBeInstanceOf(Marker);
    expect(layers[1]).toBeInstanceOf(Polyline);
  });

  it('should work with factory', () => {
    const _instance = new GeoJSON();
    const factory = vi.fn().mockImplementation(() => _instance);
    const instance = useLeafletGeoJson(geojson, { factory });
    expect(instance.value).toBe(_instance);

    expect(factory).toBeCalledTimes(1);
    expect(factory).toBeCalledWith(geojson.value, {});
  });

  it('should update layers when geojson changed', async () => {
    const data = ref<Object | null>(null);
    const instance = useLeafletGeoJson(data);
    expect(instance.value).toBeInstanceOf(GeoJSON);
    expect(instance.value!.getLayers()).toHaveLength(0);

    data.value = geojson.value;
    await nextTick();
    expect(instance.value!.getLayers()).toHaveLength(2);

    (data.value as any).features = [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
        properties: { name: 'a' }
      }
    ];
    await nextTick();
    expect(instance.value!.getLayers()).toHaveLength(2);

    data.value = {
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-30, -10],
                [-40, -40],
                [-20, -40],
                [-10, -20],
                [-30, -10]
              ]
            ]
          },
          properties: { name: 'a' }
        }
      ]
    };
    await nextTick();
    expect(instance.value!.getLayers()).toHaveLength(1);
    expect(instance.value!.getLayers()[0]).toBeInstanceOf(Polygon);

    data.value = null;
    await nextTick();
    expect(instance.value!.getLayers()).toHaveLength(0);
  });

  it('should update layers when geojson changed with watch deep', async () => {
    const instance = useLeafletGeoJson(geojson, { watchDeep: true });
    expect(instance.value).toBeInstanceOf(GeoJSON);
    expect(instance.value!.getLayers()).toHaveLength(2);

    (geojson.value as any).features.push({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-10, -10] },
      properties: { name: 'c' }
    });
    await nextTick();

    const layers = instance.value!.getLayers();
    expect(layers).toHaveLength(3);
    expect(layers[2]).toBeInstanceOf(Marker);
    expect((layers[2] as Marker).getLatLng()).toEqual({ lat: -10, lng: -10 });
  });

  it('should work with style', async () => {
    const style = ref(null) as Ref<PathOptions | StyleFunction | null>;
    const instance = useLeafletGeoJson(geojson, { style });
    expect(instance.value).toBeInstanceOf(GeoJSON);
    expect(instance.value!.getLayers()).toHaveLength(2);

    style.value = {
      color: 'green',
      fillColor: 'black',
      weight: 2
    };
    await nextTick();

    const layers = instance.value!.getLayers();
    expect(layers[1]).toBeInstanceOf(Polyline);

    expect((layers[1] as Polyline).options.color).toBe('green');
    expect((layers[1] as Polyline).options.fillColor).toBe('black');
    expect((layers[1] as Polyline).options.weight).toBe(2);

    style.value.color = 'red';
    await nextTick();

    expect((layers[1] as Polyline).options.color).toBe('red');

    style.value = null;
    await nextTick();

    expect((layers[1] as Polyline).options.color).toBe(
      Polyline.prototype.options.color
    );
    expect((layers[1] as Polyline).options.fillColor).toBe(
      Polyline.prototype.options.fillColor
    );
    expect((layers[1] as Polyline).options.weight).toBe(
      Polyline.prototype.options.weight
    );

    const styleFn = vi.fn().mockImplementation(layer => {
      const name = layer.properties.name;
      if (name === 'a') return { color: 'blue' };
      if (name === 'b') return { color: 'grey' };
      return undefined;
    });

    style.value = styleFn;
    await nextTick();

    expect((layers[1] as Polyline).options.color).toBe('grey');
    expect(styleFn).toBeCalledTimes(1);
    expect(styleFn).toBeCalledWith((geojson.value as any).features[1]);
  });

  it('should destroy when component is unmounted', () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const instance = useLeafletGeoJson(geojson);
          expect(instance.value).toBeInstanceOf(GeoJSON);
          const remove = vi.fn();
          instance.value!.remove = remove;
          (instance.value as any)._map = {};

          onUnmounted(() => {
            expect(instance.value).toBeNull();
            expect(remove).toBeCalledTimes(1);
          });
        },
        render() {
          return h('div');
        }
      })
    );

    vm.unmount();
  });
});
