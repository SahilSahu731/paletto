import asyncHandler from 'express-async-handler';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Vibrant } = require('node-vibrant/node');
import cloudinary from '../config/cloudinary.js';

// Convert RGB to Hex
const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

// Convert RGB to HSL
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
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

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

/**
 * @desc    Upload image and extract colors
 * @route   POST /api/palette/extract
 * @access  Private
 */
const extractColors = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload an image file');
  }

  console.log('Starting color extraction...');

  // 1. Upload to Cloudinary (using buffer)
  let imageUrl;
  try {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      
      console.log('Uploading to Cloudinary...');
      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: 'paletto/uploads',
        resource_type: 'image',
      });
      imageUrl = uploadResponse.secure_url;
      console.log('Cloudinary upload success:', imageUrl);
  } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      res.status(500);
      throw new Error('Image upload failed');
  }

  // 2. Extract Colors using node-vibrant
  let palette;
  try {
      console.log('Extracting colors with Vibrant...');
      // Use the static method from() which is standard for node-vibrant
      palette = await Vibrant.from(imageUrl).getPalette();
      console.log('Dimensions extracted:', Object.keys(palette));
  } catch (error) {
       console.error('Vibrant Extraction Error:', error);
       // Fallback or specific error handling
       res.status(500);
       throw new Error('Color extraction failed: ' + error.message);
  }
  
  // 3. Process the palette into a friendly format
  // Vibrant returns: Vibrant, Muted, DarkVibrant, DarkMuted, LightVibrant, LightMuted
  const processSwatch = (swatch, name) => {
    if (!swatch) return null;
    const [r, g, b] = swatch.rgb.map(Math.round);
    return {
        name: name,
        hex: swatch.hex,
        rgb: `rgb(${r}, ${g}, ${b})`,
        hsl: rgbToHsl(r, g, b),
        population: swatch.population,
        titleTextColor: swatch.titleTextColor,
        bodyTextColor: swatch.bodyTextColor,
    };
  };

  const colors = [
    processSwatch(palette.Vibrant, 'Vibrant'),
    processSwatch(palette.LightVibrant, 'Light Vibrant'),
    processSwatch(palette.DarkVibrant, 'Dark Vibrant'),
    processSwatch(palette.Muted, 'Muted'),
    processSwatch(palette.LightMuted, 'Light Muted'),
    processSwatch(palette.DarkMuted, 'Dark Muted'),
  ].filter(Boolean); // Remove nulls if extraction failed for some swatches

  // Sort by population (prominence) usually makes sense, or keep the logical order
  // Let's keep logical order for now but maybe we can add a 'prominence' sorting later
  
  res.status(200).json({
    imageUrl,
    colors,
    success: true
  });
});

export { extractColors };
