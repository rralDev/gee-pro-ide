import * as vscode from 'vscode';

export class MapView {
    private panel: vscode.WebviewPanel | undefined;
    private messageCallback: ((message: any) => void) | undefined;

    constructor(private context: vscode.ExtensionContext) {}

    public onMessage(callback: (message: any) => void) {
        this.messageCallback = callback;
    }

    public show(column: vscode.ViewColumn) {
        if (this.panel) {
            this.panel.reveal(column);
        } else {
            this.panel = vscode.window.createWebviewPanel(
                'geeMap',
                'GEE Map',
                column,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true
                }
            );

            this.panel.webview.html = this.getHtml();
            
            this.panel.webview.onDidReceiveMessage(message => {
                if (this.messageCallback) this.messageCallback(message);
            }, undefined, this.context.subscriptions);

            this.panel.onDidDispose(() => {
                this.panel = undefined;
            }, null, this.context.subscriptions);
        }
    }

    public addLayer(mapId: any, name?: string) {
        if (this.panel) {
            this.panel.webview.postMessage({ command: 'addLayer', mapId, name });
        }
    }

    public setCenter(lat: number, lng: number, zoom?: number) {
        if (this.panel) {
            this.panel.webview.postMessage({ command: 'setCenter', lat, lng, zoom });
        }
    }

    private getHtml() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>GEE Map Pro</title>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" />
                <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
                <style>
                    body { margin: 0; padding: 0; height: 100vh; background: #1e1e1e; }
                    #map { height: 100%; width: 100%; }
                    .coords-label {
                        position: absolute;
                        bottom: 20px;
                        left: 20px;
                        z-index: 1000;
                        background: rgba(30, 30, 30, 0.85);
                        color: #4ec9b0;
                        padding: 8px 15px;
                        border-radius: 6px;
                        font-family: 'JetBrains Mono', 'Consolas', monospace;
                        font-size: 12px;
                        border: 1px solid #454545;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                        pointer-events: none;
                    }
                    /* Custom Leaflet Design */
                    .leaflet-bar { border: none !important; box-shadow: 0 4px 15px rgba(0,0,0,0.5) !important; }
                    .leaflet-bar a { background-color: #252526 !important; color: #cccccc !important; border-bottom: 1px solid #383838 !important; }
                    .leaflet-bar a:hover { background-color: #37373d !important; color: #ffffff !important; }
                    .leaflet-control-layers { background: #252526 !important; color: #cccccc !important; border: none !important; box-shadow: 0 4px 15px rgba(0,0,0,0.5) !important; }
                    
                    /* Corrected Drawing Icons Style - Match Zoom Buttons Exactly */
                    .leaflet-draw-toolbar {
                        margin-top: 12px !important;
                        border: none !important;
                    }
                    .leaflet-draw-toolbar a {
                        background-color: #252526 !important;
                        border: 1px solid #383838 !important;
                        width: 30px !important;
                        height: 30px !important;
                        line-height: 30px !important;
                        border-radius: 4px !important;
                        margin-bottom: 2px;
                        position: relative;
                        background-image: none !important; /* Hide original sprite */
                    }
                    .leaflet-draw-toolbar a:hover {
                        background-color: #37373d !important;
                    }
                    /* Add icon as pseudo-element to filter ONLY the icon, not the background */
                    .leaflet-draw-toolbar a::before {
                        content: '';
                        display: block;
                        width: 100%;
                        height: 100%;
                        background-image: url('https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/images/spritesheet.png');
                        background-repeat: no-repeat;
                        filter: invert(100%) brightness(200%);
                    }
                    /* Position the sprite for each tool */
                    .leaflet-draw-draw-polyline::before { background-position: -1px -1px !important; }
                    .leaflet-draw-draw-polygon::before { background-position: -31px -1px !important; }
                    .leaflet-draw-draw-rectangle::before { background-position: -61px -1px !important; }
                    .leaflet-draw-draw-circle::before { background-position: -91px -1px !important; }
                    .leaflet-draw-draw-marker::before { background-position: -121px -1px !important; }
                    .leaflet-draw-edit-edit::before { background-position: -151px -1px !important; }
                    .leaflet-draw-edit-remove::before { background-position: -181px -1px !important; }

                    .leaflet-draw-actions {
                        left: 35px !important;
                    }
                    .leaflet-draw-actions a {
                        background-color: #252526 !important;
                        color: #ffffff !important;
                        border: 1px solid #383838 !important;
                    }

                    .coords-label {
                        position: absolute;
                        top: 12px;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 1000;
                        background: rgba(15, 15, 15, 0.85);
                        backdrop-filter: blur(8px);
                        -webkit-backdrop-filter: blur(8px);
                        color: #00ff00;
                        padding: 4px 16px;
                        border-radius: 25px;
                        font-family: 'JetBrains Mono', 'Consolas', monospace;
                        font-size: 11px;
                        border: 1px solid rgba(255, 255, 255, 0.15);
                        box-shadow: 0 4px 15px rgba(0,0,0,0.6);
                        pointer-events: none;
                        letter-spacing: 0.6px;
                        white-space: nowrap;
                        display: block;
                        width: fit-content !important;
                        height: fit-content !important;
                        line-height: normal !important;
                    }

                    /* Floating Toolbar Styles */
                    .toolbar-container {
                        position: absolute;
                        bottom: 20px;
                        left: 20px;
                        z-index: 1000;
                        display: flex;
                        gap: 8px;
                        align-items: center;
                    }
                    .floating-toolbar {
                        display: flex;
                        gap: 6px;
                        background: rgba(30, 30, 30, 0.75);
                        backdrop-filter: blur(15px);
                        -webkit-backdrop-filter: blur(15px);
                        padding: 5px;
                        border-radius: 10px;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        box-shadow: 0 8px 30px rgba(0,0,0,0.5);
                        transition: all 0.3s ease;
                    }
                    .floating-toolbar.hidden {
                        opacity: 0;
                        transform: translateX(-10px) scale(0.95);
                        pointer-events: none;
                    }
                    .floating-toolbar button {
                        background: rgba(255, 255, 255, 0.05);
                        color: #ddd;
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        padding: 4px 10px;
                        border-radius: 6px;
                        font-family: 'Segoe UI', system-ui, sans-serif;
                        font-size: 11px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }
                    .floating-toolbar button:hover {
                        background: rgba(255, 255, 255, 0.15);
                        color: #fff;
                    }
                    .toolbar-toggle {
                        background: rgba(45, 45, 45, 0.9) !important;
                        color: #fff !important;
                        width: 30px;
                        height: 30px;
                        border-radius: 8px !important;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        border: 1px solid rgba(255, 255, 255, 0.1) !important;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                        font-size: 14px;
                    }

                    /* Help Popup */
                    .help-popup {
                        display: none;
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: rgba(30, 30, 30, 0.95);
                        backdrop-filter: blur(20px);
                        padding: 25px;
                        border-radius: 15px;
                        border: 1px solid #444;
                        z-index: 2000;
                        color: white;
                        box-shadow: 0 20px 60px rgba(0,0,0,0.8);
                        width: 300px;
                    }
                    .help-popup h3 { margin-top: 0; color: #00ff00; }
                    .help-popup kbd {
                        background: #444;
                        padding: 2px 6px;
                        border-radius: 4px;
                        font-family: monospace;
                    }
                    .help-popup .close {
                        display: block;
                        margin-top: 15px;
                        text-align: center;
                        color: #aaa;
                        cursor: pointer;
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <div id="map"></div>
                <div id="coords" class="coords-label">Lat: 0.0000, Lng: 0.0000</div>
                
                <div class="toolbar-container" style="left: 20px; bottom: 20px;">
                    <button class="toolbar-toggle" onclick="showHelp()" title="Help & Shortcuts">❓</button>
                </div>

                <div class="toolbar-container" style="right: 20px; bottom: 20px; left: auto;">
                    <button class="toolbar-toggle" style="background: rgba(255, 80, 80, 0.15) !important; color: #ff8888 !important;" onclick="resetEnv()" title="Reset Environment">🧹</button>
                </div>

                <div id="helpPopup" class="help-popup">
                    <h3>GEE Pro Shortcuts</h3>
                    <p><kbd>Cmd</kbd> + <kbd>Enter</kbd> : Run Selection / Smart Block</p>
                    <p><kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Enter</kbd> : Run Entire Script</p>
                    <hr style="border: 0; border-top: 1px solid #444;">
                    <p><small>Reset (🧹) clears environment variables to avoid redeclaration errors.</small></p>
                    <div class="close" onclick="showHelp()">Close</div>
                </div>

                <script>
                    const vscode = acquireVsCodeApi();
                    
                    function showHelp() {
                        const hp = document.getElementById('helpPopup');
                        hp.style.display = hp.style.display === 'block' ? 'none' : 'block';
                    }

                    function runAll() { vscode.postMessage({ command: 'runAll' }); }
                    function runLine() { vscode.postMessage({ command: 'runLine' }); }
                    function resetEnv() { vscode.postMessage({ command: 'reset' }); }
                    
                    // Layer Definitions
                    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap'
                    });

                    const satellite = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                        attribution: '&copy; Google'
                    });

                    const hybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
                        attribution: '&copy; Google'
                    });

                    const map = L.map('map', {
                        center: [-12.0464, -77.0428],
                        zoom: 5,
                        layers: [osm]
                    });

                    const baseMaps = {
                        "Street Map": osm,
                        "Satellite": satellite,
                        "Hybrid View": hybrid
                    };

                    L.control.layers(baseMaps).addTo(map);

                    // Drawing Implementation
                    const drawnItems = new L.FeatureGroup();
                    map.addLayer(drawnItems);

                    const drawControl = new L.Control.Draw({
                        edit: { featureGroup: drawnItems },
                        draw: {
                            polygon: true,
                            polyline: true,
                            rectangle: true,
                            circle: false,
                            marker: true,
                            circlemarker: false
                        }
                    });
                    map.addControl(drawControl);

                    map.on(L.Draw.Event.CREATED, function (event) {
                        const layer = event.layer;
                        drawnItems.addLayer(layer);
                        
                        vscode.postMessage({
                            command: 'geometryCreated',
                            type: event.layerType,
                            geometry: layer.toGeoJSON()
                        });
                    });

                    const coordsDiv = document.getElementById('coords');

                    map.on('mousemove', (e) => {
                        coordsDiv.innerHTML = \`Lat: \${e.latlng.lat.toFixed(4)}, Lng: \${e.latlng.lng.toFixed(4)}\`;
                    });

                    window.addEventListener('message', event => {
                        const message = event.data;
                        switch (message.command) {
                            case 'addLayer':
                                L.tileLayer(message.mapId.urlFormat, {
                                    attribution: 'Google Earth Engine'
                                }).addTo(map);
                                break;
                            case 'setCenter':
                                map.setView([message.lat, message.lng], message.zoom || 10);
                                break;
                        }
                    });
                </script>
            </body>
            </html>
        `;
    }
}
