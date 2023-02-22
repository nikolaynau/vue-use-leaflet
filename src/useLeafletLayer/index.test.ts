import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import {
  defineComponent,
  h,
  nextTick,
  onUnmounted,
  ref,
  unref
} from 'vue-demi';
import { isDefined } from '@vueuse/shared';
import { Layer } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletLayer } from '.';

describe('useLeafletLayer', () => {
  let testLayer: Layer;
  let create: Mock;
  let update: Mock;
  let destroy: Mock;

  beforeEach(() => {
    testLayer = new Layer();
    create = vi.fn();
    update = vi.fn();
    destroy = vi.fn();
  });

  it('should return instance when create defined', () => {
    create.mockImplementation(() => testLayer);
    const layer = useLeafletLayer({ create });

    expect(create).toBeCalledTimes(1);
    expect(layer.value).toBe(testLayer);
  });

  it('should return null when create not be defined', () => {
    const layer = useLeafletLayer();
    expect(layer.value).toBeNull();
  });

  it('should create fn is watched', async () => {
    const a = ref<number | null>(null);
    create.mockImplementation(() => (isDefined(a) ? testLayer : null));

    const layer = useLeafletLayer({ create });
    expect(layer.value).toBeNull();
    expect(create).toBeCalledTimes(1);

    a.value = 1;
    await nextTick();

    expect(layer.value).toBe(testLayer);
    expect(create).toBeCalledTimes(2);
  });

  it('should work update fn', async () => {
    const a = ref<number>(1);
    create.mockImplementation(() => (unref(a) > 0 ? testLayer : null));
    update.mockImplementation(instance => instance);

    const layer = useLeafletLayer({
      create,
      update
    });

    expect(layer.value).toBe(testLayer);
    expect(create).toBeCalledTimes(1);
    expect(update).toBeCalledTimes(0);

    a.value++;
    await nextTick();

    expect(layer.value).toBe(testLayer);
    expect(create).toBeCalledTimes(1);
    expect(update).toBeCalledTimes(1);
    expect(update.mock.calls[0][0]).toBe(testLayer);
  });

  it('should destroy instance when update return null or undefinded', async () => {
    const a = ref<number>(1);
    create.mockImplementation(() => (unref(a) > 0 ? testLayer : null));
    update.mockImplementation(() => null);

    const layer = useLeafletLayer({
      create,
      update
    });

    expect(layer.value).toBe(testLayer);
    const spy = vi.spyOn(layer.value, 'remove');

    a.value++;
    await nextTick();

    expect(layer.value).toBeNull();
    expect(spy).toBeCalledTimes(1);
  });

  it('should replace wnen update return new instance', async () => {
    const a = ref<number>(1);
    const newLayer = new Layer();
    create.mockImplementation(() => (unref(a) > 0 ? testLayer : null));
    update.mockImplementation(() => newLayer);

    const layer = useLeafletLayer({
      create,
      update
    });

    expect(layer.value).toBe(testLayer);
    const spy = vi.spyOn(layer.value, 'remove');

    a.value++;
    await nextTick();

    expect(layer.value).toBe(newLayer);
    expect(spy).toBeCalledTimes(1);
  });

  it('should work destroy fn', async () => {
    const a = ref<number>(1);
    create.mockImplementation(() => (unref(a) > 0 ? testLayer : null));
    update.mockImplementation(() => null);

    const layer = useLeafletLayer({
      create,
      update,
      destroy
    });

    expect(layer.value).toBe(testLayer);
    const spy = vi.spyOn(layer.value, 'remove');

    a.value++;
    await nextTick();

    expect(layer.value).toBeNull();
    expect(spy).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(1);
    expect(destroy.mock.calls[0][0]).toBe(testLayer);
  });

  it('should destroy instance when component is unmounted', async () => {
    create.mockImplementation(() => testLayer);

    const vm = mount(
      defineComponent({
        setup() {
          const layer = useLeafletLayer({ create });

          expect(layer.value).toBe(testLayer);
          const spy = vi.spyOn(layer.value, 'remove');

          onUnmounted(() => {
            expect(layer.value).toBeNull();
            expect(spy).toBeCalledTimes(1);
          });
        },
        render() {
          return h('div');
        }
      })
    );

    vm.unmount();
  });

  it('should call destroy fn when component is unmounted', async () => {
    create.mockImplementation(() => testLayer);

    const vm = mount(
      defineComponent({
        setup() {
          const layer = useLeafletLayer({ create, destroy });
          expect(layer.value).toBe(testLayer);

          onUnmounted(() => {
            expect(layer.value).toBeNull();
            expect(destroy).toBeCalledTimes(1);
            expect(destroy.mock.calls[0][0]).toBe(testLayer);
          });
        },
        render() {
          return h('div');
        }
      })
    );

    vm.unmount();
  });

  it('should disable destroy when component is unmounted', async () => {
    create.mockImplementation(() => testLayer);

    const vm = mount(
      defineComponent({
        setup() {
          const layer = useLeafletLayer({ create, dispose: false });

          expect(layer.value).toBe(testLayer);
          const spy = vi.spyOn(layer.value, 'remove');

          onUnmounted(() => {
            expect(layer.value).toBe(testLayer);
            expect(spy).toBeCalledTimes(0);
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
