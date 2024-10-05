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

// Google Maps Platformのクレジットを追加
viewer.scene.frameState.creditDisplay.addDefaultCredit(
    new Cesium.Credit('<a href="https://www.google.com/help/terms_maps/">Google</a> © 2023', '', 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png')
);

// Autocompleteウィジェットの設定
const input = document.getElementById('pac-input');
const autocomplete = new google.maps.places.Autocomplete(input);

// 場所が選択されたときのイベントリスナー
autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;

    // 選択された場所に移動
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            place.geometry.location.lng(),
            place.geometry.location.lat(),
            1000
        ),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-45),
            roll: 0.0
        }
    });

    // 選択された場所にマーカーを追加
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
            place.geometry.location.lng(),
            place.geometry.location.lat()
        ),
        billboard: {
            image: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        }
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
});