
export const generateNoise = (opacity: number = 0.1): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.fillRect(0, 0, 256, 256);

  for (let x = 0; x < 256; x++) {
    for (let y = 0; y < 256; y++) {
      const value = Math.floor(Math.random() * 256);
      ctx.fillStyle = `rgba(${value}, ${value}, ${value}, ${opacity})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  return canvas.toDataURL();
};

export const applyCRTEffect = (element: HTMLElement): void => {
  if (!element) return;
  
  const scanline = document.createElement('div');
  scanline.className = 'scanline';
  element.appendChild(scanline);
  
  element.classList.add('crt');
};
