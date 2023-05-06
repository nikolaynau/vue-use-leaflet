import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick, ref, defineComponent, onUnmounted, h } from 'vue-demi';
import {
  SVGOverlay,
  latLngBounds,
  type LatLngBoundsExpression,
  type LatLngExpression
} from 'leaflet';
import { mount } from '../../.test';
import { useLeafletSvgOverlay } from '.';

describe('useLeafletImageOverlay', () => {
  let svgElement: SVGElement;
  let bounds: LatLngBoundsExpression;

  beforeEach(() => {
    svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    bounds = [
      [0, 0],
      [-10, -10]
    ];
  });

  it('should work empty init', () => {
    expect(useLeafletSvgOverlay(undefined, undefined).value).toBeNull();
    expect(useLeafletSvgOverlay(null, null).value).toBeNull();
  });

  it('should work init', () => {
    const instance = useLeafletSvgOverlay(svgElement, bounds);
    expect(instance.value).toBeInstanceOf(SVGOverlay);
  });

  it('should work lazy init', async () => {
    const svgElementRef = ref<SVGElement | null>(null);
    const boundsRef = ref<LatLngBoundsExpression | null>(null);
    const instance = useLeafletSvgOverlay(svgElementRef, boundsRef);
    expect(instance.value).toBeNull();

    svgElementRef.value = svgElement;
    await nextTick();

    expect(instance.value).toBeNull();

    boundsRef.value = bounds;
    await nextTick();

    expect(instance.value).toBeInstanceOf(SVGOverlay);
    expect((instance.value as any)._url).toBe(svgElement);
    expect(instance.value?.getBounds()).toEqual(
      latLngBounds(bounds as LatLngExpression[])
    );
  });

  it('should work when changing svg element url', async () => {
    const newSvgElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    const opacity = 0.5;
    const zIndex = 10;
    const className = 'classA classB';
    const svgElementRef = ref<SVGElement | null>(svgElement);
    const instance = useLeafletSvgOverlay(svgElementRef, bounds, {
      opacity,
      zIndex,
      className
    });

    expect(instance.value).toBeInstanceOf(SVGOverlay);
    expect((instance.value as any)._url).toBe(svgElement);

    (instance.value as any)._initImage();
    (instance.value as any)._updateOpacity();
    (instance.value as any)._updateZIndex();

    expect(instance.value?.getElement()).toBe(svgElement);
    expect(instance.value?.getElement()?.style.opacity).toBe(`${opacity}`);
    expect(instance.value?.getElement()?.style.zIndex).toBe(`${zIndex}`);
    expect(
      instance.value?.getElement()?.classList.contains('classA')
    ).toBeTruthy();
    expect(
      instance.value?.getElement()?.classList.contains('classB')
    ).toBeTruthy();

    svgElementRef.value = newSvgElement;
    await nextTick();

    expect((instance.value as any)._url).toBe(newSvgElement);
    expect(instance.value?.getElement()).toBe(newSvgElement);
    expect(instance.value?.getElement()?.style.opacity).toBe(`${opacity}`);
    expect(instance.value?.getElement()?.style.zIndex).toBe(`${zIndex}`);
    expect(
      instance.value?.getElement()?.classList.contains('classA')
    ).toBeTruthy();
    expect(
      instance.value?.getElement()?.classList.contains('classB')
    ).toBeTruthy();

    svgElementRef.value = null;
    await nextTick();

    expect((instance.value as any)._url).toBe(newSvgElement);
    expect(instance.value?.getElement()).toBe(newSvgElement);
  });

  it('should work when change bounds', async () => {
    const newBounds = latLngBounds([-10, -10], [-20, -20]);
    const boundsRef = ref<LatLngBoundsExpression | null>(null);
    const instance = useLeafletSvgOverlay(svgElement, boundsRef);
    expect(instance.value).toBeNull();

    boundsRef.value = bounds;
    await nextTick();

    expect(instance.value).toBeInstanceOf(SVGOverlay);
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
    const instance = useLeafletSvgOverlay(svgElement, bounds, { opacity });
    expect(instance.value).toBeInstanceOf(SVGOverlay);
    expect(instance.value?.options.opacity).toBe(
      SVGOverlay.prototype.options.opacity
    );

    opacity.value = 0.5;
    await nextTick();

    expect(instance.value?.options.opacity).toBe(0.5);

    opacity.value = null;
    await nextTick();

    expect(instance.value?.options.opacity).toBe(
      SVGOverlay.prototype.options.opacity
    );
  });

  it('should work with z-index', async () => {
    const zIndex = ref<number | null>(null);
    const instance = useLeafletSvgOverlay(svgElement, bounds, { zIndex });
    expect(instance.value).toBeInstanceOf(SVGOverlay);
    expect(instance.value?.options.zIndex).toBe(
      SVGOverlay.prototype.options.zIndex
    );

    zIndex.value = 2;
    await nextTick();

    expect(instance.value?.options.zIndex).toBe(2);

    zIndex.value = null;
    await nextTick();

    expect(instance.value?.options.zIndex).toBe(
      SVGOverlay.prototype.options.zIndex
    );
  });

  it('should work with class name', async () => {
    const className = ref<string | null>(null);
    const instance = useLeafletSvgOverlay(svgElement, bounds, { className });
    expect(instance.value).toBeInstanceOf(SVGOverlay);
    expect(instance.value?.options.className).toBe(
      SVGOverlay.prototype.options.className
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
      SVGOverlay.prototype.options.className
    );
    expect(classList.contains('classA')).toBeFalsy();
    expect(classList.contains('classB')).toBeFalsy();
  });

  it('should destroy when component is unmounted', () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const instance = useLeafletSvgOverlay(svgElement, bounds);
          expect(instance.value).toBeInstanceOf(SVGOverlay);
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
