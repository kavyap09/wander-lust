    // TO MAKE THE MAP APPEAR YOU MUST add these
    mapboxgl.accessToken = mapToken;  // Check if the token is logged correctly

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [78.5088,17.4437], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
