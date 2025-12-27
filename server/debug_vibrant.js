import { createRequire } from 'module';
const require = createRequire(import.meta.url);

try {
    const VibrantNode = require('node-vibrant/node');
    console.log('--- node-vibrant/node export structure ---');
    console.log('Type:', typeof VibrantNode);
    console.log('Keys:', Object.keys(VibrantNode));
    console.log('Proto:', Object.getPrototypeOf(VibrantNode));
    console.log('Value:', VibrantNode); 
    
    if (VibrantNode.default) {
        console.log('--- VibrantNode.default ---');
        console.log('Type:', typeof VibrantNode.default);
        console.log('Keys:', Object.keys(VibrantNode.default));
    }

} catch (e) {
    console.log('Error:', e.message);
}
