import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { defineComponent, h, nextTick, onUnmounted, ref } from 'vue-demi';
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
    const layer = useLeafletLayer(create);

    expect(create).toBeCalledTimes(1);
    expect(layer.value).toBe(testLayer);
  });

  it('should create fn is watched', async () => {
    const a = ref<number | null>(null);
    create.mockImplementation(() => testLayer);

    const layer = useLeafletLayer(create, { watch: a });
    expect(layer.value).toBeNull();

    a.value = 1;
    await nextTick();

    expect(layer.value).toBe(testLayer);
    expect(create).toBeCalledTimes(1);
  });

  it('should work update fn', async () => {
    const a = ref<number>(1);
    update.mockImplementation(instance => {
      const _a = a.value;
      instance && (instance.a = _a);
    });

    const layer = useLeafletLayer(() => testLayer, {
      update
    });

    expect(layer.value).toBe(testLayer);
    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(null);

    a.value++;
    await nextTick();

    expect(layer.value).toBe(testLayer);
    expect(update).toBeCalledTimes(2);
    expect(update).toBeCalledWith(testLayer);
    expect((testLayer as any).a).toBe(2);
  });

  it('should work remove fn', () => {
    const layer = useLeafletLayer(() => testLayer, {
      remove: destroy
    });
    expect(layer.value).toBe(testLayer);
    (layer.value as any)._map = {};

    layer.value = null;

    expect(layer.value).toBeNull();
    expect(destroy).toBeCalledTimes(1);
    expect(destroy).toBeCalledWith(testLayer);
  });

  it('should destroy instance when component is unmounted', () => {
    const vm = mount(
      defineComponent({
        setup() {
          const layer = useLeafletLayer(() => testLayer);

          expect(layer.value).toBe(testLayer);
          (layer.value as any)._map = {};
          const remove = vi.fn();
          const off = vi.fn(() => layer.value);
          layer.value!.remove = remove;
          (layer.value as any).off = off;

          onUnmounted(() => {
            expect(layer.value).toBeNull();
            expect(off).toBeCalledTimes(1);
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

  it('should call destroy fn when component is unmounted', () => {
    const vm = mount(
      defineComponent({
        setup() {
          const layer = useLeafletLayer(() => testLayer, { remove: destroy });

          expect(layer.value).toBe(testLayer);
          (layer.value as any)._map = {};

          onUnmounted(() => {
            expect(layer.value).toBeNull();
            expect(destroy).toBeCalledTimes(1);
            expect(destroy).toBeCalledWith(testLayer);
          });
        },
        render() {
          return h('div');
        }
      })
    );

    vm.unmount();
  });

  it('should disable destroy when component is unmounted', () => {
    const vm = mount(
      defineComponent({
        setup() {
          const layer = useLeafletLayer(() => testLayer, { dispose: false });

          expect(layer.value).toBe(testLayer);
          (layer.value as any)._map = {};
          const remove = vi.fn();
          const off = vi.fn(() => layer.value);
          layer.value!.remove = remove;
          (layer.value as any).off = off;

          onUnmounted(() => {
            expect(layer.value).toBe(testLayer);
            expect(off).toBeCalledTimes(0);
            expect(remove).toBeCalledTimes(0);
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
