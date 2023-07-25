import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick, ref } from 'vue-demi';
import { DivIcon, type PointExpression } from 'leaflet';
import { useLeafletDivIcon } from '.';

describe('useLeafletDivIcon', () => {
  let htmlA: string;
  let htmlB: string;

  beforeEach(() => {
    htmlA = '<div>A</div>';
    htmlB = '<div>B</div>';
  });

  it('should be create icon', () => {
    const icon = useLeafletDivIcon();
    expect(icon.value).toBeInstanceOf(DivIcon);
  });

  it('should be lazy init', async () => {
    const watchSource = ref(false);
    const icon = useLeafletDivIcon(undefined, { watch: watchSource });
    expect(icon.value).toBeNull();

    watchSource.value = true;
    await nextTick();

    expect(icon.value).toBeInstanceOf(DivIcon);
  });

  it('should work with factory', () => {
    const instance = new DivIcon();
    const factory = vi.fn().mockImplementation(() => instance);
    const icon = useLeafletDivIcon(undefined, { factory });

    expect(icon.value).toBe(instance);

    expect(factory).toBeCalledTimes(1);
    expect(factory.mock.calls[0][0]).toEqual({});
  });

  it('should work with html', async () => {
    const html = ref<string | null>(htmlA);
    const icon = useLeafletDivIcon(html);

    expect(icon.value).toBeInstanceOf(DivIcon);

    const div = icon.value!.createIcon();
    expect(icon.value?.options.html).toEqual(htmlA);
    expect(div.innerHTML).toBe(htmlA);

    html.value = htmlB;
    await nextTick();

    expect(icon.value?.options.html).toEqual(htmlB);
    expect(div.innerHTML).toBe(htmlB);

    html.value = null;
    await nextTick();

    expect(icon.value?.options.html).toBeNull();
    expect(div.innerHTML).toBe('');
  });

  it('should work with bg pos', async () => {
    const newBgPos: PointExpression = [1, 2];
    const bgPos = ref<PointExpression | null>([3, 4]);
    const icon = useLeafletDivIcon(undefined, { bgPos });

    expect(icon.value).toBeInstanceOf(DivIcon);

    const div = icon.value!.createIcon();
    expect(icon.value?.options.bgPos).toEqual([3, 4]);
    expect(div.style.backgroundPosition).toBe('-3px -4px');

    bgPos.value = newBgPos;
    await nextTick();

    expect(icon.value?.options.bgPos).toEqual(newBgPos);
    expect(div.style.backgroundPosition).toBe(
      `-${newBgPos[0]}px -${newBgPos[1]}px`
    );

    bgPos.value = null;
    await nextTick();

    expect(icon.value?.options.bgPos).toBeNull();
    expect(div.style.backgroundPosition).toBe(
      `-${newBgPos[0]}px -${newBgPos[1]}px`
    );
  });

  it('should work with icon size', async () => {
    const newIconSize: PointExpression = [3, 4];
    const iconSize = ref<PointExpression | null>([1, 2]);
    const icon = useLeafletDivIcon(undefined, { iconSize });

    expect(icon.value).toBeInstanceOf(DivIcon);
    expect(icon.value?.options.iconSize).toEqual([1, 2]);

    const div = icon.value!.createIcon() as HTMLImageElement;
    expect(div.style.width).toBe('1px');
    expect(div.style.height).toBe('2px');

    iconSize.value = newIconSize;
    await nextTick();

    expect(icon.value?.options.iconSize).toEqual(newIconSize);
    expect(div.style.width).toBe('3px');
    expect(div.style.height).toBe('4px');

    iconSize.value = null;
    await nextTick();

    expect(icon.value?.options.iconSize).toBeNull();
    expect(div.style.width).toBe('3px');
    expect(div.style.height).toBe('4px');
  });

  it('should work with icon anchor', async () => {
    const iconSize: PointExpression = [10, 20];
    const newIconAnchor: PointExpression = [3, 4];
    const iconAnchor = ref<PointExpression | null>([1, 2]);
    const icon = useLeafletDivIcon(undefined, { iconAnchor, iconSize });

    expect(icon.value).toBeInstanceOf(DivIcon);
    expect(icon.value?.options.iconAnchor).toEqual([1, 2]);

    const div = icon.value!.createIcon() as HTMLImageElement;
    expect(div.style.marginLeft).toBe('-1px');
    expect(div.style.marginTop).toBe('-2px');

    iconAnchor.value = newIconAnchor;
    await nextTick();

    expect(icon.value?.options.iconAnchor).toEqual(newIconAnchor);
    expect(div.style.marginLeft).toBe('-3px');
    expect(div.style.marginTop).toBe('-4px');

    iconAnchor.value = null;
    await nextTick();

    expect(icon.value?.options.iconAnchor).toBeNull();
    expect(div.style.marginLeft).toBe('-5px');
    expect(div.style.marginTop).toBe('-10px');
  });

  it('should work with class name', async () => {
    const newClassName = 'bar';
    const className = ref<string | null>('foo');
    const icon = useLeafletDivIcon(undefined, { className });

    expect(icon.value).toBeInstanceOf(DivIcon);
    expect(icon.value?.options.className).toContain('foo');

    const div = icon.value!.createIcon();
    expect(div.className).toContain('foo');

    className.value = newClassName;
    await nextTick();

    expect(icon.value?.options.className).toEqual(newClassName);
    expect(div.className).toContain(newClassName);

    className.value = null;
    await nextTick();

    expect(icon.value?.options.className).toBeNull();
    expect(div.className).not.toContain(newClassName);
  });

  it('should preserve known css classes when class name changed', async () => {
    const className = ref<string | null>('foo');
    const icon = useLeafletDivIcon(undefined, {
      className,
      knownClasses: ['a', 'b', 'c']
    });

    expect(icon.value).toBeInstanceOf(DivIcon);
    expect(icon.value?.options.className).toContain('foo');

    const div = icon.value!.createIcon();
    expect(div.className).toContain('foo');

    const preservedClasses = [
      'a',
      'b',
      'leaflet-zoom-animated',
      'leaflet-zoom-hide',
      'leaflet-interactive'
    ];

    preservedClasses.forEach(c => {
      div.classList.add(c);
    });

    className.value = 'bar';
    await nextTick();

    expect(div.classList.contains('c')).toBeFalsy();

    [...preservedClasses, 'bar'].forEach(c => {
      expect(div.classList.contains(c)).toBeTruthy();
    });
  });

  it('should work when change known classes', async () => {
    const className = ref<string | null>('foo');
    const knownClasses = ref<string[]>(['a', 'b']);
    const icon = useLeafletDivIcon(undefined, { className, knownClasses });
    expect(icon.value).toBeInstanceOf(DivIcon);

    const div = icon.value!.createIcon();
    expect(div.className).toContain('foo');

    ['a', 'b'].forEach(c => {
      div.classList.add(c);
    });

    className.value = 'bar';
    await nextTick();

    ['a', 'b', 'bar'].forEach(c => {
      expect(div.classList.contains(c)).toBeTruthy();
    });

    div.classList.add('c');
    knownClasses.value.push('c');
    await nextTick();

    ['a', 'b', 'c', 'bar'].forEach(c => {
      expect(div.classList.contains(c)).toBeTruthy();
    });
  });
});
