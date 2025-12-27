import { createRequire } from 'module';
const require = createRequire(import.meta.url);

try {
    const Vibrant = require('node-vibrant');
    console.log('Type of export:', typeof Vibrant);
    console.log('Export value:', Vibrant);
    if (typeof Vibrant === 'function') {
        console.log('It is a class/function');
    }
} catch (e) {
    console.log('Require error:', e.message);
}
