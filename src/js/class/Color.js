class ColorFunctions {

    /**
     * Convert RGB to HSL
     * @param {number} r - Red value (0-255)
     * @param {number} g - Green value (0-255)
     * @param {number} b - Blue value (0-255)
     * @returns {number[]} - HSL values
     */
    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s;
        const l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return [h, s, l];
    }

    /**
     * Calculate the average color
     * @param {number[][]} colors - Array of RGB colors
     * @returns {number[]} - Average RGB color
     */
    averageColor(colors) {
        const sum = colors.reduce((acc, color) => {
            acc.r += color[0];
            acc.g += color[1];
            acc.b += color[2];
            return acc;
        }, { r: 0, g: 0, b: 0 });

        const length = colors.length;
        return [
            Math.round(sum.r / length),
            Math.round(sum.g / length),
            Math.round(sum.b / length)
        ];
    }

    /**
     * Calculate the distance between two colors
     * @param {number[]} color1 - First RGB color
     * @param {number[]} color2 - Second RGB color
     * @returns {number} - Distance between the colors
     */
    colorDistance(color1, color2) {
        const diff = this.diffColor(color1, color2);
        return Math.sqrt(diff.reduce((acc, val) => acc + Math.pow(val, 2), 0));
    }

    /**
     * Calculate the difference between two colors
     * @param {number[]} color1 - First RGB color
     * @param {number[]} color2 - Second RGB color
     * @returns {number[]} - Difference in RGB values
     */
    diffColor(color1, color2) {
        return color1.map((val, index) => val - color2[index]);
    }

    /**
     * Convert an array to RGB string
     * @param {number[]} color - RGB color array
     * @returns {string} - RGB string
     */
    arrayToRgb(color) {
        return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    }

    /**
     * Convert HSL to RGB
     * @param {number} h - Hue (0-1)
     * @param {number} s - Saturation (0-1)
     * @param {number} l - Lightness (0-1)
     * @returns {number[]} - RGB values
     */
    hslToRgb(h, s, l) {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        if (s === 0) {
            const gray = l * 255;
            return [gray, gray, gray];
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        const r = hue2rgb(p, q, h + 1 / 3);
        const g = hue2rgb(p, q, h);
        const b = hue2rgb(p, q, h - 1 / 3);

        return [r * 255, g * 255, b * 255];
    }

    /**
     * Get the opposite color
     * @param {number[]} color - RGB color
     * @returns {number[]} - Opposite RGB color
     */
    getOppositeColor(color) {
        return color.map(val => 255 - val);
    }
}