import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick, ref, defineComponent, onUnmounted, h } from 'vue-demi';
import {
  ImageOverlay,
  latLngBounds,
  type LatLngBoundsExpression,
  type LatLngExpression
} from 'leaflet';
import { mount } from '../../.test';
import { useLeafletImageOverlay } from '.';

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

  it('should work with opacity', async () => {
    const opacity = ref<number | null>(null);
    const instance = useLeafletImageOverlay(imgUrl, bounds, { opacity });
    expect(instance.value).toBeInstanceOf(ImageOverlay);
    expect(instance.value?.options.opacity).toBe(
      ImageOverlay.prototype.options.opacity
    );

    opacity.value = 0.5;
    await nextTick();

    expect(instance.value?.options.opacity).toBe(0.5);

    opacity.value = null;
    await nextTick();

    expect(instance.value?.options.opacity).toBe(
      ImageOverlay.prototype.options.opacity
    );
  });

  it('should work with alt', async () => {
    const alt = ref<string | null>(null);
    const instance = useLeafletImageOverlay(imgUrl, bounds, { alt });
    expect(instance.value).toBeInstanceOf(ImageOverlay);
    expect(instance.value?.options.alt).toBe(
      ImageOverlay.prototype.options.alt
    );

    alt.value = 'text';
    await nextTick();

    expect(instance.value?.options.alt).toBe('text');

    alt.value = null;
    await nextTick();

    expect(instance.value?.options.alt).toBe(
      ImageOverlay.prototype.options.alt
    );
  });

  it('should work with z-index', async () => {
    const zIndex = ref<number | null>(null);
    const instance = useLeafletImageOverlay(imgUrl, bounds, { zIndex });
    expect(instance.value).toBeInstanceOf(ImageOverlay);
    expect(instance.value?.options.zIndex).toBe(
      ImageOverlay.prototype.options.zIndex
    );

    zIndex.value = 2;
    await nextTick();

    expect(instance.value?.options.zIndex).toBe(2);

    zIndex.value = null;
    await nextTick();

    expect(instance.value?.options.zIndex).toBe(
      ImageOverlay.prototype.options.zIndex
    );
  });

  it('should work with class name', async () => {
    const className = ref<string | null>(null);
    const instance = useLeafletImageOverlay(imgUrl, bounds, { className });
    expect(instance.value).toBeInstanceOf(ImageOverlay);
    expect(instance.value?.options.className).toBe(
      ImageOverlay.prototype.options.className
    );

    (instance.value as any)._initImage();
    const classList = instance.value!.getElement()!.classList;

    className.value = 'classA classB';
    await nextTick();

    expect(instance.value?.options.className).toBe('classA classB');
    expect(classList.contains('classA')).toBeTruthy();
    expect(classList.contains('classB')).toBeTruthy();

    className.value = 'classB';
    await nextTick();

    expect(instance.value?.options.className).toBe('classB');
    expect(classList.contains('classA')).toBeFalsy();
    expect(classList.contains('classB')).toBeTruthy();

    className.value = null;
    await nextTick();

    expect(instance.value?.options.className).toBe(
      ImageOverlay.prototype.options.className
    );
    expect(classList.contains('classA')).toBeFalsy();
    expect(classList.contains('classB')).toBeFalsy();
  });

  it('should destroy when component is unmounted', () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const instance = useLeafletImageOverlay(imgUrl, bounds);
          expect(instance.value).toBeInstanceOf(ImageOverlay);
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
