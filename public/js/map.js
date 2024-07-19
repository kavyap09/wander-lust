// // TO MAKE THE MAP APPEAR YOU MUST add these
// // Check if the token is logged correctly

mapboxgl.accessToken ="pk.eyJ1Ijoia2F2eWEtMDkiLCJhIjoiY2x5c2JseHgxMGY3bzJxc2h4N29oZWxsYiJ9.BgVb3BwOSBwIVmPQ0I2gnQ";
    const map = new mapboxgl.Map({
        container: 'map',// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v11',
        center:listing.coordinates,// starting position [lng, lat]
        zoom: 8
    });
const marker1=new mapboxgl.Marker({color:"black"})
  .setLngLat(listing.coordinates)//listing.geometry.co-ordinates
  .setPopup(new mapboxgl.Popup({offset:20}))
    .setHTML("<h5>listing.title</h5><p>exact location provided after booking</p>")
    .setMaxWidth("300px")
    .addTo(map);
mapboxgl.accessToken = "pk.eyJ1Ijoia2F2eWEtMDkiLCJhIjoiY2x5c2JseHgxMGY3bzJxc2h4N29oZWxsYiJ9.BgVb3BwOSBwIVmPQ0I2gnQ";

