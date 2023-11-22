export const chunk = <T>(arr: T[], size: number) => {
  const chunkArr = [] as T[][];

  for (let i = 0; i < Math.ceil(arr.length / size); i++) {
    const chunkRow = arr.slice(i * size, i * size + size);
    chunkArr[i] = chunkRow;
  }

  return chunkArr;
};

export const RGBToHSL = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return {
    h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
    s: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    l: (100 * (2 * l - s)) / 2,
  };
};

export const byte2Hex = (n: number): string => {
  const nybHexString = "0123456789ABCDEF";
  return (
    String(nybHexString.substr((n >> 4) & 0x0f, 1)) +
    nybHexString.substr(n & 0x0f, 1)
  );
};

export const RGBString2hex = (string: string): string => {
  const newString: number[] = string
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .slice(0, 3)
    .map((n) => parseInt(n, 10));

  return `#${byte2Hex(newString[0])}${byte2Hex(newString[1])}${byte2Hex(
    newString[2]
  )}`;
};

export const getLuminosity = function (c: any) {
  c = RGBString2hex(c).substring(1);

  const rgb: number = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const getDominantColors = (img: HTMLImageElement): string[] => {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  const imageData = ctx.getImageData(0, 0, img.width, img.height).data;

  interface ColorMap {
    count: number;
    totalRGB: number;
    averageRGB: number;
    luminosity: number;
    hsl: {
      h: number;
      s: number;
      l: number;
    };
  }
  const colorMap = new Map<string, ColorMap>();

  for (let i = 0; i < imageData.length; i += 4) {
    const colorMapObject = {
      count: 0,
      totalRGB: 0,
      averageRGB: 0,
      luminosity: 0,
      hsl: {
        h: 0,
        s: 0,
        l: 0,
      },
    };

    const rgba = imageData.slice(i, i + 4);

    const total = rgba[0] + rgba[1] + rgba[2];

    if (rgba[3] == 0) {
      continue;
    }

    const color = `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]})`;

    colorMapObject.count = (colorMap.get(color)?.count ?? 0) + 1;
    colorMapObject.totalRGB = total;
    colorMapObject.luminosity = getLuminosity(color);
    colorMapObject.averageRGB = total / 3;
    colorMapObject.hsl = RGBToHSL(rgba[0], rgba[1], rgba[2]);

    colorMap.set(color, colorMapObject);
  }

  const colors: [string, ColorMap][] = Array.from(colorMap).sort(
    (a, b) => b[1].count - a[1].count
  );
  const pColor = colors.splice(0, 1);
  const arr: string[] = [];
  arr.push(pColor[0][0]);

  const newColors = colors.sort((a, b) => a[1].hsl.l - b[1].hsl.l);
  const firstHalf = newColors.splice(0, newColors.length / 2);
  const secondHalf = newColors.splice(0, newColors.length);

  const ch = chunk(firstHalf, firstHalf.length / 2);
  const ch2 = chunk(secondHalf, secondHalf.length / 2);

  for (let i = 0; i < 2; i++) {
    arr.push(ch[i][0][0]);
  }
  for (let i = 0; i < 2; i++) {
    arr.push(ch2[i].reverse()[0][0]);
  }

  return arr;
};

export const tooLight = function (c: any, max = 130) {
  if (c) {
    const luminosity = getLuminosity(c);
    if (luminosity > max) {
      return true;
    }
    return false;
  }
  return false;
};

export const tooDark = function (c: any, max = 50) {
  if (c) {
    const luminosity = getLuminosity(c);
    if (luminosity < max) {
      return true;
    }
    return false;
  }
  return false;
};

export const pickPaletteColor = (
  colorPalette?: string[],
  dark = 120,
  light = 250
): string => {
  if (!colorPalette || !colorPalette[0]) {
    return "red";
  }

  if (!tooDark(colorPalette[1], dark) && !tooLight(colorPalette[1], light)) {
    return colorPalette[1]!;
  }
  if (!tooDark(colorPalette[2], dark) && !tooLight(colorPalette[2], light)) {
    return colorPalette[2]!;
  }
  if (!tooLight(colorPalette[3], light) && !tooDark(colorPalette[3], dark)) {
    return colorPalette[3]!;
  }
  if (!tooLight(colorPalette[4], light) && !tooDark(colorPalette[4], dark)) {
    return colorPalette[4]!;
  }
  if (!tooDark(colorPalette[0], dark) && !tooLight(colorPalette[0], light)) {
    return colorPalette[0]!;
  }
  return "red";
};
