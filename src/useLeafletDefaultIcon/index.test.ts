import { describe, it, expect } from 'vitest';
import { Icon } from 'leaflet';
import { useLeafletDefaultIcon } from '.';

describe('useLeafletDefaultIcon', () => {
  it('should be create icon', () => {
    const icon = useLeafletDefaultIcon();
    expect(icon.value).toBeInstanceOf(Icon.Default);
    expect(icon.value?.options.iconUrl).toBe('marker-icon.png');
    expect(icon.value?.options.iconRetinaUrl).toBe('marker-icon-2x.png');
    expect(icon.value?.options.shadowUrl).toBe('marker-shadow.png');
  });

  it('should with image path', () => {
    const imagePath = 'http://localhost/path/to/image/';
    const icon = useLeafletDefaultIcon({ imagePath });
    expect(icon.value).toBeInstanceOf(Icon.Default);

    const img = icon.value!.createIcon() as HTMLImageElement;
    expect(img.src).toContain(imagePath);

    const shadow = icon.value!.createShadow() as HTMLImageElement;
    expect(shadow.src).toContain(imagePath);
  });
});
