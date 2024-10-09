class ColorFunctions {

    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

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


    colorDistance(color1, color2) {
        let difRgb = this.diffColor(color1, color2);
        return Math.sqrt(Math.pow(difRgb[0], 2) + Math.pow(difRgb[1], 2) + Math.pow(difRgb[2], 2));
    }


    diffColor(color, color2) {
        const rDiff = color[0] - color2[0];
        const gDiff = color[1] - color2[1];
        const bDiff = color[2] - color2[2];
        return [rDiff, gDiff, bDiff];
    }

    ArrayToRgb(color) {
        return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    }

    getOppositeColor(color) {
        return `rgb(${255 - color[0]}, ${255 - color[1]}, ${255 - color[2]})`
    }
}