/*
<button onclick="test()">dddddddddasdsad</button>
<button onclick="test2()">d2222d</button>

<div id="map" style="width: 500px; height: 380px">
    <!--        <iframe width="425"-->
    <!--                height="350"-->
    <!--                src="https://www.openstreetmap.org/export/embed.html?bbox=17.13225603103638%2C62.49539717766782%2C17.168090343475345%2C62.50421539967209&amp;layer=mapnik&amp;marker=62.49980661455859%2C17.15017318725586"-->
    <!--                style="border: 1px solid black"></iframe><br/>-->
    <!--        <small><a href="https://www.openstreetmap.org/?mlat=62.4998&amp;mlon=17.1502#map=16/62.4998/17.1502">Visa större karta</a></small>-->
</div>
 */

function loadMapPage() {
    let contentDiv = document.querySelector("#mainContent");
    contentDiv.innerHTML = `
    <button onclick="test()">dddddddddasdsad</button>
    <button onclick="test2()">d2222d</button>
    
    <div id="map" class="mapDiv">mapps</div>
    `;
    loadMapContent()
}


let map;
let layerGroup;
let layer;
function loadMapContent(){
    let mapDiv = document.querySelector("#map");
    mapDiv.classList.remove('wrapper')
    mapDiv.classList.remove('main_content')
    mapDiv.classList.remove('info')
    mapDiv.classList.remove('div')
    // console.log(mapDiv.classList)
    // console.log(mapDiv.classList.value)
    // console.log(mapDiv.classList.values())
    map = new L.map('map').setView([63, 17], 4);
    layerGroup = L.layerGroup().addTo(map);
    layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);
    let scale = L.control.scale(); // Creating scale control
    map.addControl(scale)
}
    function test() {
        let long = 62.499809400000004;
        let lat = 17.15018313038701;

        map.setView([long.toPrecision(4), lat.toPrecision(4)], 15)
        layerGroup.clearLayers();
        map.closePopup();
        let marker = L.marker([long, lat]).addTo(layerGroup)
        marker.bindPopup('Home' + '\n' + 'Address').openPopup();
    }

    function test2() {
        let long = 61.499809400000004;
        let lat = 16.15018313038701;

        map.setView([long.toPrecision(4), lat.toPrecision(4)], 15)
        layerGroup.clearLayers();
        map.closePopup();
        let marker = L.marker([long, lat]).addTo(layerGroup)
        marker.bindPopup('Home' + '\n' + 'Address').openPopup();
    }
