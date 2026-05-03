const ee = require('@google/earthengine');
console.log('ee.data keys:', Object.keys(ee.data).slice(0, 20));
console.log('Search for XHR:', Object.keys(ee.data).find(k => k.toLowerCase().includes('xhr')));
