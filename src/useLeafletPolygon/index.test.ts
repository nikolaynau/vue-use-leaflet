import { describe, it, expect, beforeEach } from 'vitest';
import { nextTick, ref } from 'vue-demi';
import { LatLngExpression, Polygon, latLng } from 'leaflet';
import { useLeafletPolygon } from '.';

describe('useLeafletPolygon', () => {
  let points: LatLngExpression[];

  beforeEach(() => {
    points = [
      [0, -15],
      [-5, -25],
      [-15, -25],
      [-10, -15]
    ];
  });

  it('should work init', () => {
    const instance = useLeafletPolygon(points);
    expect(instance.value).toBeInstanceOf(Polygon);
    expect(instance.value?.getLatLngs()).toEqual([points.map(p => latLng(p))]);
  });

  it('should work with fill', async () => {
    const defOptions = Polygon.prototype.options;
    const property = ref<boolean | null>(null);
    const instance = useLeafletPolygon(points, { fill: property });

    expect(instance.value).toBeInstanceOf(Polygon);
    expect(instance.value?.options.fill).toBe(defOptions.fill);

    property.value = false;
    await nextTick();

    expect(instance.value?.options.fill).toBeFalsy();

    property.value = null;
    await nextTick();

    expect(instance.value?.options.fill).toBe(defOptions.fill);
  });
});
