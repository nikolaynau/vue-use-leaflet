import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick, ref, defineComponent, onUnmounted, h } from 'vue-demi';
import {
  latLngBounds,
  VideoOverlay,
  type LatLngBoundsExpression,
  type LatLngExpression
} from 'leaflet';
import { mount } from '../../.test';
import { useLeafletVideoOverlay } from '.';

describe('useLeafletVideoOverlay', () => {
  let videoUrl: string;
  let videoUrls: string[];
  let videoElement: HTMLVideoElement;
  let bounds: LatLngBoundsExpression;

  beforeEach(() => {
    videoUrl = 'http://localhost/a.webm';
    videoUrls = ['http://localhost/a.webm', 'http://localhost/b.webm'];
    videoElement = document.createElement('video');
    bounds = [
      [0, 0],
      [-10, -10]
    ];
  });

  it('should work empty init', () => {
    expect(useLeafletVideoOverlay(undefined, undefined).value).toBeNull();
    expect(useLeafletVideoOverlay(null, null).value).toBeNull();
  });

  it('should work init', () => {
    const instance = useLeafletVideoOverlay(videoUrl, bounds);
    expect(instance.value).toBeInstanceOf(VideoOverlay);
  });

  it('should work lazy init', async () => {
    const videoRef = ref<string | null>(null);
    const boundsRef = ref<LatLngBoundsExpression | null>(null);
    const instance = useLeafletVideoOverlay(videoRef, boundsRef);
    expect(instance.value).toBeNull();

    videoRef.value = videoUrl;
    await nextTick();

    expect(instance.value).toBeNull();

    boundsRef.value = bounds;
    await nextTick();

    expect(instance.value).toBeInstanceOf(VideoOverlay);
    expect((instance.value as any)._url).toBe(videoUrl);
    expect(instance.value?.getBounds()).toEqual(
      latLngBounds(bounds as LatLngExpression[])
    );
  });

  it('should work when changing video url to string', async () => {
    const newVideoUrl = 'http://localhost/c.webm';
    const videoUrlRef = ref<string | null>(null);
    const instance = useLeafletVideoOverlay(videoUrlRef, bounds);
    expect(instance.value).toBeNull();

    videoUrlRef.value = videoUrl;
    await nextTick();

    expect(instance.value).toBeInstanceOf(VideoOverlay);
    expect((instance.value as any)._url).toBe(videoUrl);

    videoUrlRef.value = newVideoUrl;
    await nextTick();

    expect((instance.value as any)._url).toBe(newVideoUrl);

    videoUrlRef.value = null;
    await nextTick();

    expect((instance.value as any)._url).toBe(newVideoUrl);
  });

  it('should work when changing video url to string array', async () => {
    const newVideoUrls = ['http://localhost/c.webm', ...videoUrls];
    const videoUrlRef = ref<string[] | null>(null);
    const instance = useLeafletVideoOverlay(videoUrlRef, bounds);
    expect(instance.value).toBeNull();

    videoUrlRef.value = videoUrls;
    await nextTick();

    expect(instance.value).toBeInstanceOf(VideoOverlay);
    expect((instance.value as any)._url).toEqual(videoUrls);
    (instance.value as any)._initImage();

    videoUrlRef.value = newVideoUrls;
    await nextTick();

    expect((instance.value as any)._url).toEqual(newVideoUrls);
    const el = instance.value!.getElement();
    expect(el!.children.length).toBe(3);
    newVideoUrls.forEach((url, i) => {
      expect((el!.children[i] as HTMLSourceElement).src).toBe(url);
    });

    videoUrlRef.value = null;
    await nextTick();

    expect((instance.value as any)._url).toEqual(newVideoUrls);
  });

  it('should work when changing video url to video element', async () => {
    const newVideoUrls = ['http://localhost/c.webm', ...videoUrls];
    newVideoUrls.forEach(url => {
      const source = document.createElement('source');
      source.src = url;
      videoElement.appendChild(source);
    });

    const videoUrlRef = ref<string | HTMLVideoElement | null>(null);
    const instance = useLeafletVideoOverlay(videoUrlRef, bounds);
    expect(instance.value).toBeNull();

    videoUrlRef.value = videoUrl;
    await nextTick();

    expect(instance.value).toBeInstanceOf(VideoOverlay);
    expect((instance.value as any)._url).toEqual(videoUrl);
    (instance.value as any)._initImage();

    videoUrlRef.value = videoElement;
    await nextTick();

    expect((instance.value as any)._url).toEqual(newVideoUrls);
    const el = instance.value!.getElement();
    expect(el!.children.length).toBe(3);
    newVideoUrls.forEach((url, i) => {
      expect((el!.children[i] as HTMLSourceElement).src).toBe(url);
    });
  });

  it('should work when change bounds', async () => {
    const newBounds = latLngBounds([-10, -10], [-20, -20]);
    const boundsRef = ref<LatLngBoundsExpression | null>(null);
    const instance = useLeafletVideoOverlay(videoUrl, boundsRef);
    expect(instance.value).toBeNull();

    boundsRef.value = bounds;
    await nextTick();

    expect(instance.value).toBeInstanceOf(VideoOverlay);
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

  it('should work with autoplay', async () => {
    const defOptions = VideoOverlay.prototype.options;
    const property = ref<boolean | null>(null);
    const instance = useLeafletVideoOverlay(videoUrl, bounds, {
      autoplay: property
    });

    expect(instance.value).toBeInstanceOf(VideoOverlay);
    expect(instance.value?.options.autoplay).toBe(defOptions.autoplay);

    (instance.value as any)._initImage();
    expect(instance.value!.getElement()?.autoplay).toBe(defOptions.autoplay);

    property.value = false;
    await nextTick();

    expect(instance.value?.options.autoplay).toBeFalsy();
    expect(instance.value!.getElement()?.autoplay).toBeFalsy();

    property.value = null;
    await nextTick();

    expect(instance.value?.options.autoplay).toBe(defOptions.autoplay);
  });

  it('should work with loop', async () => {
    const defOptions = VideoOverlay.prototype.options;
    const property = ref<boolean | null>(null);
    const instance = useLeafletVideoOverlay(videoUrl, bounds, {
      loop: property
    });

    expect(instance.value).toBeInstanceOf(VideoOverlay);
    expect(instance.value?.options.loop).toBe(defOptions.loop);

    (instance.value as any)._initImage();
    expect(instance.value!.getElement()?.loop).toBe(defOptions.loop);

    property.value = false;
    await nextTick();

    expect(instance.value?.options.loop).toBeFalsy();
    expect(instance.value!.getElement()?.loop).toBeFalsy();

    property.value = null;
    await nextTick();

    expect(instance.value?.options.loop).toBe(defOptions.loop);
  });

  it('should work with muted', async () => {
    const defOptions = VideoOverlay.prototype.options;
    const property = ref<boolean | null>(null);
    const instance = useLeafletVideoOverlay(videoUrl, bounds, {
      muted: property
    });

    expect(instance.value).toBeInstanceOf(VideoOverlay);
    expect(instance.value?.options.muted).toBe(defOptions.muted);

    (instance.value as any)._initImage();
    expect(instance.value!.getElement()?.muted).toBe(defOptions.muted);

    property.value = false;
    await nextTick();

    expect(instance.value?.options.muted).toBeFalsy();
    expect(instance.value!.getElement()?.muted).toBeFalsy();

    property.value = null;
    await nextTick();

    expect(instance.value?.options.muted).toBe(defOptions.muted);
  });

  it('should work with plays inline', async () => {
    const defOptions = VideoOverlay.prototype.options;
    const property = ref<boolean | null>(null);
    const instance = useLeafletVideoOverlay(videoUrl, bounds, {
      playsInline: property
    });

    expect(instance.value).toBeInstanceOf(VideoOverlay);
    expect(instance.value?.options.playsInline).toBe(defOptions.playsInline);

    (instance.value as any)._initImage();
    expect(instance.value!.getElement()?.playsInline).toBe(
      defOptions.playsInline
    );

    property.value = false;
    await nextTick();

    expect(instance.value?.options.playsInline).toBeFalsy();
    expect(instance.value!.getElement()?.playsInline).toBeFalsy();

    property.value = null;
    await nextTick();

    expect(instance.value?.options.playsInline).toBe(defOptions.playsInline);
  });

  it('should work with keep aspect ratio', async () => {
    const defOptions = VideoOverlay.prototype.options;
    const property = ref<boolean | null>(null);
    const instance = useLeafletVideoOverlay(videoUrl, bounds, {
      keepAspectRatio: property
    });

    expect(instance.value).toBeInstanceOf(VideoOverlay);
    expect(instance.value?.options.keepAspectRatio).toBe(
      defOptions.keepAspectRatio
    );

    (instance.value as any)._initImage();
    expect(instance.value!.getElement()?.style.objectFit).toBe('');

    property.value = false;
    await nextTick();

    expect(instance.value?.options.keepAspectRatio).toBeFalsy();
    expect(instance.value!.getElement()?.style.objectFit).toBe('fill');

    property.value = null;
    await nextTick();

    expect(instance.value?.options.keepAspectRatio).toBe(
      defOptions.keepAspectRatio
    );
    expect(instance.value!.getElement()?.style.objectFit).toBe('');
  });

  it('should work with opacity', async () => {
    const opacity = ref<number | null>(null);
    const instance = useLeafletVideoOverlay(videoUrl, bounds, { opacity });
    expect(instance.value).toBeInstanceOf(VideoOverlay);
    expect(instance.value?.options.opacity).toBe(
      VideoOverlay.prototype.options.opacity
    );

    opacity.value = 0.5;
    await nextTick();

    expect(instance.value?.options.opacity).toBe(0.5);

    opacity.value = null;
    await nextTick();

    expect(instance.value?.options.opacity).toBe(
      VideoOverlay.prototype.options.opacity
    );
  });

  it('should work with z-index', async () => {
    const zIndex = ref<number | null>(null);
    const instance = useLeafletVideoOverlay(videoUrl, bounds, { zIndex });
    expect(instance.value).toBeInstanceOf(VideoOverlay);
    expect(instance.value?.options.zIndex).toBe(
      VideoOverlay.prototype.options.zIndex
    );

    zIndex.value = 2;
    await nextTick();

    expect(instance.value?.options.zIndex).toBe(2);

    zIndex.value = null;
    await nextTick();

    expect(instance.value?.options.zIndex).toBe(
      VideoOverlay.prototype.options.zIndex
    );
  });

  it('should work with class name', async () => {
    const className = ref<string | null>(null);
    const instance = useLeafletVideoOverlay(videoUrl, bounds, { className });
    expect(instance.value).toBeInstanceOf(VideoOverlay);
    expect(instance.value?.options.className).toBe(
      VideoOverlay.prototype.options.className
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
      VideoOverlay.prototype.options.className
    );
    expect(classList.contains('classA')).toBeFalsy();
    expect(classList.contains('classB')).toBeFalsy();
  });

  it('should work with factory', () => {
    const overlay = new VideoOverlay(videoUrl, bounds);
    const factory = vi.fn().mockImplementation(() => overlay);
    const instance = useLeafletVideoOverlay(videoUrl, bounds, { factory });

    expect(instance.value).toBe(overlay);
    expect(factory).toBeCalledTimes(1);
  });

  it('should destroy when component is unmounted', () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const instance = useLeafletVideoOverlay(videoUrl, bounds);
          expect(instance.value).toBeInstanceOf(VideoOverlay);
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
