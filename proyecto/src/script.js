const platform = new H.service.Platform({
    'apikey': 'TU_API_KEY' // Reemplaza con tu API Key
});

const defaultLayers = platform.createDefaultLayers();

// Crea el mapa en el div con id 'map'
const map = new H.Map(
    document.getElementById('map'),
    defaultLayers.vector.normal.map,
    {
        zoom: 10, // Nivel de zoom inicial
        center: { lat: 52.5200, lng: 13.4050 } // Coordenadas iniciales (Berlín)
    }
);

// Hacer el mapa interactivo
const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
const ui = H.ui.UI.createDefault(map, defaultLayers);


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        // Centrar el mapa en la ubicación del usuario
        map.setCenter(coords);

        // Añadir un marcador en la ubicación del usuario
        const marker = new H.map.Marker(coords);
        map.addObject(marker);
    });
} else {
    alert("Geolocation no es soportado por este navegador.");
}
axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${coords.lat},${coords.lng}&lang=en-US&apikey=TU_API_KEY`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
