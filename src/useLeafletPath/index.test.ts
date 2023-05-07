import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { nextTick, ref, defineComponent, onUnmounted, h } from 'vue-demi';
import { PathOptions, Path } from 'leaflet';
import { mount } from '../../.test';
import { type PathReactiveProperty, useLeafletPath } from '.';

describe('useLeafletPath', () => {
  let obj: any;
  let el: HTMLElement;
  let factory: Mock;

  beforeEach(() => {
    el = document.createElement('div');
    obj = {
      options: {},
      _map: {},
      remove: vi.fn(),
      setStyle: vi.fn(),
      getElement: vi.fn().mockImplementation(() => el)
    };
    obj.off = vi.fn().mockImplementation(() => obj);
    factory = vi.fn().mockImplementation(() => obj);
  });

  it('should work init', () => {
    const instance = useLeafletPath(factory);
    expect(instance.value).toBe(obj);
    expect(factory).toBeCalledTimes(1);
    expect(factory).toBeCalledWith({});
  });

  it('should work lazy init', async () => {
    const objRef = ref<Object | null>(null);
    const instance = useLeafletPath(factory, { watch: objRef });
    expect(instance.value).toBeNull();

    objRef.value = obj;
    await nextTick();

    expect(instance.value).toBe(obj);
    expect(factory).toBeCalledTimes(1);
    expect(factory).toBeCalledWith({});
  });

  it('should be call factory with options', async () => {
    const pathOptions = {
      stroke: true,
      color: 'green',
      weight: 2,
      opacity: 0.5,
      lineCap: 'round',
      lineJoin: 'miter',
      dashArray: [1, 2, 3],
      dashOffset: '3',
      fill: true,
      fillColor: 'black',
      fillOpacity: 0.3,
      fillRule: 'evenodd'
    } as PathOptions;
    const instance = useLeafletPath(factory, {
      ...pathOptions
    });
    expect(instance.value).toBe(obj);
    expect(factory).toBeCalledTimes(1);
    expect(factory).toBeCalledWith(pathOptions);
  });

  it('should work with class name', async () => {
    const classList = el.classList;
    const className = ref<string | null>(null);
    const instance = useLeafletPath(factory, { className });
    expect(instance.value).toBe(obj);
    expect(factory).toBeCalledTimes(1);
    expect(factory).toBeCalledWith({});

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
      Path.prototype.options.className
    );
    expect(classList.contains('classA')).toBeFalsy();
    expect(classList.contains('classB')).toBeFalsy();
  });

  it.each([
    ['stroke', true],
    ['color', 'green'],
    ['weight', 2],
    ['opacity', 0.5],
    ['lineCap', 'round'],
    ['lineJoin', 'miter'],
    ['dashArray', [1, 2, 3]],
    ['dashOffset', '3'],
    ['fill', true],
    ['fillColor', 'black'],
    ['fillOpacity', 0.3],
    ['fillRule', 'evenodd']
  ] as [PathReactiveProperty, any][])(
    'should work with %s',
    async (propertyName, propertyValue) => {
      const propertyRef = ref<any>(null);
      const defOptions = Path.prototype.options;
      const instance = useLeafletPath(factory, { [propertyName]: propertyRef });

      expect(instance.value).toBe(obj);
      expect(factory).toBeCalledTimes(1);
      expect(factory).toBeCalledWith({});

      propertyRef.value = propertyValue;
      await nextTick();

      expect(obj.setStyle).toBeCalledTimes(1);
      expect(obj.setStyle).toBeCalledWith({ [propertyName]: propertyValue });

      propertyRef.value = null;
      await nextTick();

      expect(obj.setStyle).toBeCalledTimes(2);
      expect(obj.setStyle).toBeCalledWith({
        [propertyName]: defOptions[propertyName]
      });
    }
  );

  it('should destroy when component is unmounted', () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const instance = useLeafletPath(factory);
          expect(instance.value).toBe(obj);

          onUnmounted(() => {
            expect(instance.value).toBeNull();
            expect(obj.remove).toBeCalledTimes(1);
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
