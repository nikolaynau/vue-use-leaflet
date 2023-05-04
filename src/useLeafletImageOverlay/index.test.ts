import { describe, it, expect, beforeEach } from 'vitest';
import { nextTick, ref } from 'vue-demi';
import {
  ImageOverlay,
  latLngBounds,
  type LatLngBoundsExpression
} from 'leaflet';
import { useLeafletImageOverlay } from '.';
import { LatLngExpression } from 'leaflet';

describe('useLeafletImageOverlay', () => {
  let imgUrl: string;
  let bounds: LatLngBoundsExpression;

  beforeEach(() => {
    imgUrl = 'http://localhost/image.png';
    bounds = [
      [0, 0],
      [-10, -10]
    ];
  });

  it('should work empty init', () => {
    expect(useLeafletImageOverlay(undefined, undefined).value).toBeNull();
    expect(useLeafletImageOverlay(null, null).value).toBeNull();
  });

  it('should work init', () => {
    const instance = useLeafletImageOverlay(imgUrl, bounds);
    expect(instance.value).toBeInstanceOf(ImageOverlay);
  });

  it('should work lazy init', async () => {
    const imageUrlRef = ref<string | null>(null);
    const boundsRef = ref<LatLngBoundsExpression | null>(null);
    const instance = useLeafletImageOverlay(imageUrlRef, boundsRef);
    expect(instance.value).toBeNull();

    imageUrlRef.value = imgUrl;
    await nextTick();

    expect(instance.value).toBeNull();

    boundsRef.value = bounds;
    await nextTick();

    expect(instance.value).toBeInstanceOf(ImageOverlay);
    expect((instance.value as any)._url).toBe(imgUrl);
    expect(instance.value?.getBounds()).toEqual(
      latLngBounds(bounds as LatLngExpression[])
    );
  });

  it('should work when change image url', async () => {
    const newImgUrl = 'http://localhost/image2.png';
    const imageUrlRef = ref<string | null>(null);
    const instance = useLeafletImageOverlay(imageUrlRef, bounds);
    expect(instance.value).toBeNull();

    imageUrlRef.value = imgUrl;
    await nextTick();

    expect(instance.value).toBeInstanceOf(ImageOverlay);
    expect((instance.value as any)._url).toBe(imgUrl);

    imageUrlRef.value = newImgUrl;
    await nextTick();

    expect((instance.value as any)._url).toBe(newImgUrl);

    imageUrlRef.value = null;
    await nextTick();

    expect((instance.value as any)._url).toBe(newImgUrl);
  });

  it('should work when change bounds', async () => {
    const newBounds = latLngBounds([-10, -10], [-20, -20]);
    const boundsRef = ref<LatLngBoundsExpression | null>(null);
    const instance = useLeafletImageOverlay(imgUrl, boundsRef);
    expect(instance.value).toBeNull();

    boundsRef.value = bounds;
    await nextTick();

    expect(instance.value).toBeInstanceOf(ImageOverlay);
    expect(instance.value?.getBounds()).toEqual(
      latLngBounds(bounds as LatLngExpression[])
    );

    boundsRef.value = newBounds;
    await nextTick();

    expect(instance.value?.getBounds()).toEqual(newBounds);

    boundsRef.value = null;
    await nextTick();

    expect(instance.value?.getBounds()).toEqual(newBounds);
  });
});
