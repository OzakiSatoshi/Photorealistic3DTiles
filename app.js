import config, { loadGoogleMapsAPI } from './config.js';

// Cesium viewerの初期化
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain(),
    imageryProvider: new Cesium.IonImageryProvider({ assetId: 3 }),
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    sceneMode: Cesium.SceneMode.SCENE3D
});

// 3D建物の有効化
viewer.scene.primitives.add(Cesium.createOsmBuildings());

// 初期視点の設定
viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(139.7674, 35.6815, 10000),
    orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-45),
        roll: 0.0
    }
});

// Google Maps APIの読み込みと初期化
loadGoogleMapsAPI().then(() => {
    initMap();
}).catch(error => {
    console.error('Google Maps APIの読み込みに失敗しました:', error);
});

// グローバルスコープで initMap 関数を定義
window.initMap = function() {
    // Autocompleteウィジェットの設定
    const input = document.getElementById('pac-input');
    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['(cities)']
    });

    // 場所が選択されたときのイベントリスナー
    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            console.error('選択された場所の情報が取得できませんでした。');
            return;
        }

        // 選択された場所に移動
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
                place.geometry.location.lng(),
                place.geometry.location.lat(),
                10000 // 高度（メートル）
            ),
            orientation: {
                heading: Cesium.Math.toRadians(0),
                pitch: Cesium.Math.toRadians(-45),
                roll: 0.0
            },
            duration: 3 // 移動にかかる時間（秒）
        });
    });
};