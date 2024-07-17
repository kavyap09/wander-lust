    // TO MAKE THE MAP APPEAR YOU MUST add these
    mapboxgl.accessToken = mapToken;  // Check if the token is logged correctly

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: listing.coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
const marker1=new mapboxgl.Marker({color:"black"})
  .setLngLat(listing.coordinates)//listing.geometry.co-orinates
  .setPopup(new mapboxgl.Popup({offset:20}))
    .setLngLat(e.lngLat)
    .setHTML("<h5>listing.title</h5><p>exact location provided after booking</p>")
    .setMaxWidth("300px")
    .addTo(map);
  