import { describe, it, expect, beforeEach } from 'vitest';
import { Circle, latLng, type LatLngExpression } from 'leaflet';
import { useLeafletCircle } from '.';

describe('useLeafletCircle', () => {
  let point: LatLngExpression;

  beforeEach(() => {
    point = [-10, -10];
  });

  it('should work init', () => {
    const instance = useLeafletCircle(point);
    expect(instance.value).toBeInstanceOf(Circle);
    expect(instance.value?.getLatLng()).toEqual(latLng(point));
  });
});
