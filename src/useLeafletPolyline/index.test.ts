import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick, ref } from 'vue-demi';
import { LatLngExpression, Polyline, latLng } from 'leaflet';
import { useLeafletPolyline } from '.';

describe('useLeafletPolyline', () => {
  let points: LatLngExpression[];

  beforeEach(() => {
    points = [
      [0, 0],
      [-10, -5],
      [-5, -10],
      [-20, -20]
    ];
  });

  it('should work init', () => {
    const instance = useLeafletPolyline(points);
    expect(instance.value).toBeInstanceOf(Polyline);
    expect(instance.value?.getLatLngs()).toEqual(points.map(p => latLng(p)));
  });

  it('should work lazy init', async () => {
    const pointsRef = ref<LatLngExpression[] | null>(null);
    const instance = useLeafletPolyline(pointsRef);
    expect(instance.value).toBeNull();

    pointsRef.value = points;
    await nextTick();

    expect(instance.value).toBeInstanceOf(Polyline);
    expect(instance.value?.getLatLngs()).toEqual(points.map(p => latLng(p)));
  });

  it('should work when changing polyline points', async () => {
    const newPoints: LatLngExpression[] = [
      [0, 0],
      [-10, -10]
    ];
    const pointsRef = ref<LatLngExpression[] | null>(points);
    const instance = useLeafletPolyline(pointsRef);
    expect(instance.value).toBeInstanceOf(Polyline);
    expect(instance.value?.getLatLngs()).toEqual(points.map(p => latLng(p)));

    pointsRef.value = newPoints;
    await nextTick();

    expect(instance.value?.getLatLngs()).toEqual(newPoints.map(p => latLng(p)));

    pointsRef.value = null;
    await nextTick();

    expect(instance.value?.getLatLngs()).toEqual(newPoints.map(p => latLng(p)));
  });

  it('should work when watch deep points', async () => {
    const pointsRef = ref<LatLngExpression[] | null>(points);
    const instance = useLeafletPolyline(pointsRef, { watchDeep: true });
    expect(instance.value).toBeInstanceOf(Polyline);
    expect(instance.value?.getLatLngs()).toEqual(points.map(p => latLng(p)));

    pointsRef.value?.push([-25, -30]);
    await nextTick();

    expect(instance.value?.getLatLngs()).toEqual(points.map(p => latLng(p)));
  });

  it('should work with smooth factor', async () => {
    const defOptions = Polyline.prototype.options;
    const property = ref<number | null>(null);
    const instance = useLeafletPolyline(points, { smoothFactor: property });
    expect(instance.value).toBeInstanceOf(Polyline);
    expect(instance.value?.options.smoothFactor).toBe(defOptions.smoothFactor);
    const spy = vi.spyOn(instance.value!, 'redraw');

    property.value = 2;
    await nextTick();

    expect(instance.value?.options.smoothFactor).toBe(2);

    property.value = null;
    await nextTick();

    expect(instance.value?.options.smoothFactor).toBe(defOptions.smoothFactor);
    expect(spy).toBeCalledTimes(2);
  });

  it('should work with no clip', async () => {
    const defOptions = Polyline.prototype.options;
    const property = ref<boolean | null>(null);
    const instance = useLeafletPolyline(points, { noClip: property });
    expect(instance.value).toBeInstanceOf(Polyline);
    expect(instance.value?.options.noClip).toBe(defOptions.noClip);
    const spy = vi.spyOn(instance.value!, 'redraw');

    property.value = true;
    await nextTick();

    expect(instance.value?.options.noClip).toBeTruthy();

    property.value = null;
    await nextTick();

    expect(instance.value?.options.noClip).toBe(defOptions.noClip);
    expect(spy).toBeCalledTimes(2);
  });
});
