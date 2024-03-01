
function loadMapPage() {
    let contentDiv = document.querySelector("#mainContent");
    contentDiv.innerHTML = `<div id="map" class="mapDiv">mapps</div>`;
    loadMapContent()
}


let map;
let layerGroup;
let layer;
function loadMapContent(){
    map = new L.map('map').setView([63, 17], 4);
    layerGroup = L.layerGroup().addTo(map);
    layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);
    let scale = L.control.scale(); // Creating scale control
    map.addControl(scale)
    searchAddress().then()
}
async function searchAddress() {
    let address;
    let user = JSON.parse(sessionStorage.getItem("loggedInUser"))
    let response = await fetchDataGetUnAuth("https://geocode.maps.co/search?q=sweden+" + user.address.street + "+" + user.address.streetNumber + "&api_key=65e03fe9bee9e315182041veo737119")

    await response.json().then(a => {
        address = a.at(0);
    })
    console.log(address)
    if (address !== undefined){
        let addressLat = parseFloat(address.lat);
        let addressLong = parseFloat(address.lon);
        console.log(addressLat, addressLong)
        setMapMarker(addressLat, addressLong, address.display_name)
    }
}

    function setMapMarker(lat, long, addressInfo) {
        // let lat = 62.499809400000004;
        // let long = 17.15018313038701;

        let curLocation = [lat, long];
        console.log(curLocation)
        sessionStorage.setItem("latLong", JSON.stringify(curLocation))
        console.log(JSON.parse(sessionStorage.getItem("latLong")))

        map.setView([lat.toPrecision(4), long.toPrecision(4)], 15)
        layerGroup.clearLayers();
        map.closePopup();

        let marker = new L.marker(curLocation, {
            draggable: 'true'
        }).addTo(layerGroup);

        marker.on('dragend', function() {
            let position = marker.getLatLng();
            marker.setLatLng(position, {
                draggable: 'true'
            }).bindPopup(position).update();
            console.log(position.lat);
            console.log(position.lng);
        });

        marker.bindPopup(addressInfo).openPopup();
    }