/**
 * Welcome to GEE Pro!
 * 
 * This is a sample script to get you started.
 * Use Cmd + Enter to run the current line or selection.
 */

// 1. Set the map center (Lima, Peru)
Map.setCenter(-77.0428, -12.0464, 10);

// 2. Load Elevation Data (SRTM)
const elevation = ee.Image('CGIAR/SRTM90_V4');

// 3. Add to Map with a color palette
Map.addLayer(elevation, {
    min: 0, 
    max: 4000, 
    palette: ['blue', 'green', 'red']
}, 'SRTM Elevation');

print('Welcome to GEE Pro! Your interactive map is loading..test.');
