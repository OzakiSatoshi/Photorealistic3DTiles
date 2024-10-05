const config = {
    GOOGLE_MAPS_API_KEY: 'AIzaSyA925pDFAK-LsUEXU1futIk-2QDmiFIdx4',
    CESIUM_ACCESS_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNzI2YjQyMS1lN2NiLTQxMzUtYjM5Ny04M2E0MGIyMGRiNjkiLCJpZCI6MTM4MTQ2LCJpYXQiOjE3MjgwOTI0OTl9.rGIUNZ_0D0fmKB1M3lfNRhlvK5M8MRAczQlsIbHWLbY'
};

export function loadGoogleMapsAPI() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onerror = reject;
        script.onload = resolve;
        document.head.appendChild(script);
    });
}

export function initCesium() {
    Cesium.Ion.defaultAccessToken = config.CESIUM_ACCESS_TOKEN;
}

export default config;