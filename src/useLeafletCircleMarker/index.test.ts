import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick, ref } from 'vue-demi';
import { CircleMarker, LatLngExpression, latLng } from 'leaflet';
import { useLeafletCircleMarker } from '.';

describe('useLeafletCircleMarker', () => {
  let point: LatLngExpression;

  beforeEach(() => {
    point = [-10, -10];
  });

  it('should work init', () => {
    const instance = useLeafletCircleMarker(point);
    expect(instance.value).toBeInstanceOf(CircleMarker);
    expect(instance.value?.getLatLng()).toEqual(latLng(point));
  });

  it('should work lazy init', async () => {
    const pointRef = ref<LatLngExpression | null>(null);
    const instance = useLeafletCircleMarker(pointRef);
    expect(instance.value).toBeNull();

    pointRef.value = point;
    await nextTick();

    expect(instance.value).toBeInstanceOf(CircleMarker);
    expect(instance.value?.getLatLng()).toEqual(latLng(point));
  });

  it('should work when changing point', async () => {
    const newPoint: LatLngExpression = [-20, -25];
    const pointRef = ref<LatLngExpression | null>(point);
    const instance = useLeafletCircleMarker(pointRef);
    expect(instance.value).toBeInstanceOf(CircleMarker);
    expect(instance.value?.getLatLng()).toEqual(latLng(point));

    pointRef.value = newPoint;
    await nextTick();

    expect(instance.value?.getLatLng()).toEqual(latLng(newPoint));

    pointRef.value = null;
    await nextTick();

    expect(instance.value?.getLatLng()).toEqual(latLng(newPoint));
  });

  it('should work with radius', async () => {
    const defOptions = CircleMarker.prototype.options;
    const property = ref<number | null>(null);
    const instance = useLeafletCircleMarker(point, { radius: property });

    expect(instance.value).toBeInstanceOf(CircleMarker);
    expect(instance.value?.options.radius).toBe(defOptions.radius);
    const spy = vi.spyOn(instance.value!, 'setRadius');

    property.value = 2;
    await nextTick();

    expect(instance.value?.options.radius).toBe(2);

    property.value = null;
    await nextTick();

    expect(instance.value?.options.radius).toBe(defOptions.radius);
    expect(spy).toBeCalledTimes(2);
  });
});
