// This is for .env for that file to access the maptoken and listing since we cannot require directly in that file

mapboxgl.accessToken = mapToken; // Use the token passed from the server
const coordinates = listing.geometry.coordinates;

const map = new mapboxgl.Map({
    container: "map", // Container ID
    style: "mapbox://styles/mapbox/streets-v11", // Style URL
    center: coordinates, // Starting position [lng, lat]
    zoom: 8, // Starting zoom
});

const marker = new mapboxgl.Marker({ color: "black" })
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 20 })
        .setHTML(`<h5>${listing.title}</h5><p>Exact location provided after booking</p>`))
    .setMaxWidth("300px")
    .addTo(map);































// // TO MAKE THE MAP APPEAR YOU MUST add these
// // Check if the token is logged correctly

// mapboxgl.accessToken ="pk.eyJ1Ijoia2F2eWEtMDkiLCJhIjoiY2x5c2JseHgxMGY3bzJxc2h4N29oZWxsYiJ9.BgVb3BwOSBwIVmPQ0I2gnQ";
//     const map = new mapboxgl.Map({
//         container: 'map',// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center:[77.2341,15.234],// starting position [lng, lat]
//         zoom: 8
//     });
// const marker1=new mapboxgl.Marker({color:"black"})
//   .setLngLat([77.2341,15.234])//listing.geometry.co-ordinates
//   .setPopup(new mapboxgl.Popup({offset:20}))
//     .setHTML("<h5>listing.title</h5><p>exact location provided after booking</p>")
//     .setMaxWidth("300px")
//     .addTo(map);
// mapboxgl.accessToken = "pk.eyJ1Ijoia2F2eWEtMDkiLCJhIjoiY2x5c2JseHgxMGY3bzJxc2h4N29oZWxsYiJ9.BgVb3BwOSBwIVmPQ0I2gnQ";

// mapboxgl.accessToken = "pk.eyJ1Ijoia2F2eWEtMDkiLCJhIjoiY2x5c2JseHgxMGY3bzJxc2h4N29oZWxsYiJ9.BgVb3BwOSBwIVmPQ0I2gnQ";


// // Debugging line to check if coordinates are correct
// console.log('Coordinates:', listing.coordinates);

// // Check if coordinates are valid
// if (Array.isArray(listing.coordinates) && listing.coordinates.length === 2) {
//     const map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: listing.coordinates,
//         zoom: 8
//     });

//     new mapboxgl.Marker({ color: "black" })
//         .setLngLat(listing.coordinates)
//         .setPopup(new mapboxgl.Popup({ offset: 20 })
//         .setHTML("<h5>" + listing.title + "</h5><p>Exact location provided after booking</p>")
//         .setMaxWidth("300px"))
//         .addTo(map);
// } else {
//     console.error('Invalid coordinates:', listing.coordinates);
// }