const config = {
    GOOGLE_MAPS_API_KEY: '' // この値は後で動的に設定されます
};

if (typeof process !== 'undefined' && process.env.GOOGLE_MAPS_API_KEY) {
    config.GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
} else {
    // ブラウザ環境での実行時にAPIキーを取得
    fetch('/.netlify/functions/get-api-key')
        .then(response => response.json())
        .then(data => {
            config.GOOGLE_MAPS_API_KEY = data.apiKey;
            // Google Maps APIスクリプトを動的に読み込む
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        })
        .catch(error => console.error('APIキーの取得に失敗しました:', error));
}

export default config;