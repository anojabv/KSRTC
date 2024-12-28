// Initialize the OpenLayers map
const map = new ol.Map({
    target: 'map',
    layers: [
        // Base map layer (OpenStreetMap)
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([76.9663, 8.5058]), // Center on Trivandrum
        zoom: 8,
        maxZoom: 18,
        minZoom: 5
    })
});

// GeoServer WMS layer: KSRTC ordinary_tvpm
const wmsLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://localhost:8081/geoserver/wms', // GeoServer WMS endpoint
        params: {
            'LAYERS': 'KSRTC:ordinary_tvpm', // workspace:layer name
            'TILED': true,
            'FORMAT': 'image/png'
        },
        projection: 'EPSG:3857',
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
    })
});

// Add the WMS layer to the map
map.addLayer(wmsLayer);

// Optional: Add controls
map.addControl(new ol.control.ScaleLine());
map.addControl(new ol.control.FullScreen());

// Debugging: Add event listeners to check for loading issues
wmsLayer.getSource().on('tileloaderror', function () {
    console.error('Error loading WMS tiles.');
});
