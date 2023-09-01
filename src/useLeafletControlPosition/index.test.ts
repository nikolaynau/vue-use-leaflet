import { describe, it, expect, beforeEach } from 'vitest';
import { nextTick, ref, defineComponent, Ref, markRaw } from 'vue-demi';
import { Map } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletControlPosition } from '.';

describe('useLeafletPane', () => {
  let source: Map;
  let controlContainer: HTMLElement;
  let controlCorners: Record<string, HTMLElement>;

  beforeEach(() => {
    controlContainer = document.createElement('div');
    controlCorners = {};
    source = markRaw(new Map(document.createElement('div')));
    (source as any)._controlCorners = controlCorners;
    (source as any)._controlContainer = controlContainer;
  });

  it('should return empty positions when init with empty values', () => {
    expect(
      useLeafletControlPosition(undefined, undefined).positionElements.value
    ).toEqual({});
    expect(
      useLeafletControlPosition(undefined, null).positionElements.value
    ).toEqual({});
    expect(
      useLeafletControlPosition(undefined, []).positionElements.value
    ).toEqual({});
  });

  it('should init', async () => {
    const { positionElements } = useLeafletControlPosition(source, [
      'top',
      'left'
    ]);
    expect(Object.keys(positionElements.value)).toEqual(['topleft']);
    expect(positionElements.value['topleft']).toBeInstanceOf(HTMLElement);
    expect(Object.keys((source as any)._controlCorners)).toEqual(['topleft']);
    expect((source as any)._controlCorners['topleft']).toBeInstanceOf(
      HTMLElement
    );
    expect(
      ((source as any)._controlContainer as HTMLElement).children.length
    ).toBe(1);
    expect(
      ((source as any)._controlContainer as HTMLElement).children[0].className
    ).toBe('leaflet-top leaflet-left');
  });

  it('should init with array', async () => {
    const { positionElements } = useLeafletControlPosition(source, [
      ['top', 'left'],
      ['bottom', 'right']
    ]);
    expect(Object.keys(positionElements.value)).toEqual([
      'topleft',
      'bottomright'
    ]);
    expect(positionElements.value['topleft']).toBeInstanceOf(HTMLElement);
    expect(positionElements.value['bottomright']).toBeInstanceOf(HTMLElement);
  });

  it('should init with array ref', async () => {
    const { positionElements } = useLeafletControlPosition(
      source,
      ref([
        ['a', 'b'],
        ['c', 'd']
      ])
    );
    expect(Object.keys(positionElements.value)).toEqual(['ab', 'cd']);
    expect(positionElements.value['ab']).toBeInstanceOf(HTMLElement);
    expect(positionElements.value['cd']).toBeInstanceOf(HTMLElement);
  });

  it('should lazy init while source and position not set', async () => {
    const sourceRef = ref<Map | null>(null) as Ref<Map | null>;
    const positionRef = ref<[string, string] | null>(null);
    const { positionElements } = useLeafletControlPosition(
      sourceRef,
      positionRef
    );
    expect(positionElements.value).toEqual({});

    positionRef.value = ['a', 'b'];
    await nextTick();

    expect(positionElements.value).toEqual({});

    sourceRef.value = source;
    await nextTick();

    expect(Object.keys(positionElements.value)).toEqual(['ab']);
    expect(positionElements.value['ab']).toBeInstanceOf(HTMLElement);
  });

  it('should work when change position', async () => {
    const position = ref<
      [string, string] | [string, string][] | null | undefined
    >(undefined);

    const { positionElements } = useLeafletControlPosition(source, position);
    expect(positionElements.value).toEqual({});

    position.value = null;
    await nextTick();

    expect(positionElements.value).toEqual({});

    position.value = ['a', 'b'];
    await nextTick();

    expect(Object.keys(positionElements.value)).toEqual(['ab']);
    expect(positionElements.value['ab']).toBeInstanceOf(HTMLElement);

    position.value = ['c', 'd'];
    await nextTick();

    expect(Object.keys(positionElements.value)).toEqual(['cd']);
    expect(positionElements.value['cd']).toBeInstanceOf(HTMLElement);

    position.value = [['e', 'f']];
    await nextTick();

    expect(Object.keys(positionElements.value)).toEqual(['ef']);
    expect(positionElements.value['ef']).toBeInstanceOf(HTMLElement);

    position.value.push(['g', 'i']);
    position.value.push(['j', 'k']);
    await nextTick();

    expect(Object.keys(positionElements.value)).toEqual(['ef', 'gi', 'jk']);
    expect(positionElements.value['ef']).toBeInstanceOf(HTMLElement);
    expect(positionElements.value['gi']).toBeInstanceOf(HTMLElement);
    expect(positionElements.value['jk']).toBeInstanceOf(HTMLElement);

    position.value.splice(1, 1);
    await nextTick();

    expect(Object.keys(positionElements.value)).toEqual(['ef', 'jk']);
    expect(positionElements.value['ef']).toBeInstanceOf(HTMLElement);
    expect(positionElements.value['jk']).toBeInstanceOf(HTMLElement);

    position.value = null;
    await nextTick();

    expect(positionElements.value).toEqual({});
  });

  it('should work with flush sync', () => {
    const positionRef = ref<[string, string] | null>(null);
    const { positionElements } = useLeafletControlPosition(
      source,
      positionRef,
      {
        flushSync: true
      }
    );
    expect(positionElements.value).toEqual({});

    positionRef.value = ['a', 'b'];

    expect(Object.keys(positionElements.value)).toEqual(['ab']);
    expect(positionElements.value['ab']).toBeInstanceOf(HTMLElement);
  });

  it('should work dispose', () => {
    expect.assertions(8);

    const vm = mount(
      defineComponent({
        setup() {
          const { positionElements } = useLeafletControlPosition(
            source,
            ['a', 'b'],
            {
              dispose: true
            }
          );
          expect(Object.keys(positionElements.value)).toEqual(['ab']);
          expect(positionElements.value['ab']).toBeInstanceOf(HTMLElement);
          expect(Object.keys((source as any)._controlCorners)).toEqual(['ab']);
          expect((source as any)._controlCorners['ab']).toBeInstanceOf(
            HTMLElement
          );
          expect(
            ((source as any)._controlContainer as HTMLElement).children.length
          ).toBe(1);
          expect(
            ((source as any)._controlContainer as HTMLElement).children[0]
              .className
          ).toBe('leaflet-a leaflet-b');
        },
        render() {
          return null;
        }
      })
    );

    vm.unmount();

    expect(
      ((source as any)._controlContainer as HTMLElement).children.length
    ).toBe(0);
    expect((source as any)._controlCorners).toEqual({});
  });
});
