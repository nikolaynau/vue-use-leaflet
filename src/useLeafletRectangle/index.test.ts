import { describe, it, expect, beforeEach } from 'vitest';
import { ref, nextTick } from 'vue-demi';
import {
  type LatLngBoundsExpression,
  type LatLngBoundsLiteral,
  Rectangle
} from 'leaflet';
import { useLeafletRectangle } from '.';

describe('useLeafletRectangle', () => {
  let bounds: LatLngBoundsLiteral;

  beforeEach(() => {
    bounds = [
      [0, 0],
      [-20, -20]
    ];
  });

  it('should work init', () => {
    const instance = useLeafletRectangle(bounds);
    expect(instance.value).toBeInstanceOf(Rectangle);
    expect(instance.value?.getLatLngs()).toEqual([
      [
        {
          lat: -20,
          lng: -20
        },
        {
          lat: 0,
          lng: -20
        },
        {
          lat: 0,
          lng: 0
        },
        {
          lat: -20,
          lng: 0
        }
      ]
    ]);
  });

  it('should work when changing bounds', async () => {
    const newBounds: LatLngBoundsLiteral = [
      [-5, -5],
      [-10, -10]
    ];
    const boundsRef = ref<LatLngBoundsExpression | null>(null);
    const instance = useLeafletRectangle(boundsRef);
    expect(instance.value).toBeNull();

    boundsRef.value = bounds;
    await nextTick();

    expect(instance.value).toBeInstanceOf(Rectangle);
    expect(instance.value?.getLatLngs()).toEqual([
      [
        {
          lat: -20,
          lng: -20
        },
        {
          lat: 0,
          lng: -20
        },
        {
          lat: 0,
          lng: 0
        },
        {
          lat: -20,
          lng: 0
        }
      ]
    ]);

    boundsRef.value = newBounds;
    await nextTick();

    expect(instance.value?.getLatLngs()).toEqual([
      [
        {
          lat: -10,
          lng: -10
        },
        {
          lat: -5,
          lng: -10
        },
        {
          lat: -5,
          lng: -5
        },
        {
          lat: -10,
          lng: -5
        }
      ]
    ]);
  });
});
