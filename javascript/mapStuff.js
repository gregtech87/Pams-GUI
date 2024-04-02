
/*******************************************************************************
 * Copyright (c) 2024. Tobias Gregorsson.
 * Github: Gregtech87
 ******************************************************************************/

function loadMapPage(userBoolean, itemBoolean) {
    let contentDiv = document.querySelector("#mainContent");
    contentDiv.innerHTML = `
        <div><p><b id="mapTitle"></b></p></div>
        <div id="map" class="mapDiv">mapps</div>
        <div>
        <p><b>For custom position: </b>Drag and drop existing pin, or click to place pin.</p>
        <form id="mapForm" class="mapForm">
            <div>
                <label for="customLat">Latitude:</label>
                <input type="number" step="any" id="customLat" name="customLat" required>
            </div>
            <div>
                <label for="customLong">Longitude:</label>
                <input type="number" step="any" id="customLong" name="customLong" required>
            </div>   
            <button type="submit" class="posButton">Set custom location</button>
            </form> 
        </div>
        `;
    loadMapContent(userBoolean, itemBoolean).then()

    let form = document.querySelector("#mapForm")
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        setCustomLocation(userBoolean, itemBoolean);
    });
}

function setCustomLocation(userBoolean, itemBoolean) {
    console.log(userBoolean)
    console.log(itemBoolean)
    console.log(document.querySelector("#customLat").value)
    console.log(document.querySelector("#customLong").value)

    if (userBoolean) {
        let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
        console.log(user);
        user.customLat = parseFloat(document.querySelector("#customLat").value)
        user.customLong = parseFloat(document.querySelector("#customLong").value)
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
        updateUser(true, false, false).then(() => {
            loadMapPage(userBoolean, itemBoolean);
        });
    }

}


let map;
let layerGroup;
let layer;

async function loadMapContent(userBoolean, itemBoolean) {
    map = new L.map('map').setView([63, 17], 4);
    layerGroup = L.layerGroup().addTo(map);
    layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);
    let scale = L.control.scale(); // Creating scale control
    map.addControl(scale)
    await searchAddress(userBoolean, itemBoolean).then()
}

async function searchAddress(userBoolean, itemBoolean) {
    let address;
    let user = JSON.parse(sessionStorage.getItem("loggedInUser"))

    if (userBoolean) {
        let mapTitle = document.querySelector("#mapTitle");
        mapTitle.innerHTML = "User home address"
        //TODO dynamic country???
        // let response = await fetchDataGetUnAuth("https://geocode.maps.co/search?q=sweden+" + user.address.street + "+" + user.address.streetNumber + "&api_key=65e03fe9bee9e315182041veo737119")
        let response = await fetchDataGetUnAuth("https://geocode.maps.co/search?q=" + user.address.street + "+" + user.address.streetNumber + "+" + user.address.postalCode + "+" + user.address.city + "&api_key=65e03fe9bee9e315182041veo737119")
        await response.json().then(a => {
            address = a.at(0);
        })
        // console.log(address)
        // console.log(address.display_name)
        // console.log(user.address)

        let addressString = user.address.street + " " + user.address.streetNumber + ", " + user.address.postalCode + ", " + user.address.city;
        // console.log(addressString)
        setClickMarker("New custom coordinates?");

        // if (!user.customLocation && user.customLat === 0 && user.customLong === 0) {
        //     setClickMarker(addressString);
        // }

        if (user.customLocation && user.customLat !== 0 && user.customLong !== 0) {
            let addressLat = parseFloat(user.customLat);
            let addressLong = parseFloat(user.customLong);
            // console.log(addressLat, addressLong)
            setMapMarker(addressLat, addressLong, addressString)
        }

        // if (!user.customLocation && (user.address.street === "" || user.address.city === "" || user.address.streetNumber === 0 || user.address.postalCode === 0)) {
        //     setClickMarker(addressString);
        // }

        if (!user.customLocation && (user.address.street !== "" || user.address.city !== "" || user.address.streetNumber !== 0 || user.address.postalCode !== 0)) {
            let addressLat = parseFloat(address.lat);
            let addressLong = parseFloat(address.lon);
            // console.log(addressLat, addressLong)
            setMapMarker(addressLat, addressLong, address.display_name)
        }

        if (user.customLocation && (user.address.street !== "" || user.address.city !== "" || user.address.streetNumber !== 0 || user.address.postalCode !== 0)) {
            let addressLat = parseFloat(user.customLat);
            let addressLong = parseFloat(user.customLong);
            // console.log(addressLat, addressLong)
            let customAddressString = addressString + " (Custom pin location)"
            setMapMarker(addressLat, addressLong, customAddressString)
        }
    }

    if (itemBoolean) {
        let mapTitle = document.querySelector("#mapTitle");
        mapTitle.innerHTML = "** NOT** User home address"
        //TODO AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH
        console.log("item")
    }
}

function setClickMarker(popupString) {
    let marker = new L.marker();
    map.on("click", function (e) {
        marker.setLatLng([e.latlng.lat, e.latlng.lng]).addTo(map)
        marker.bindPopup(popupString).openPopup();
        // console.log([e.latlng.lat, e.latlng.lng])
        document.querySelector("#customLat").value = e.latlng.lat
        document.querySelector("#customLong").value = e.latlng.lng
    })
}

function setMapMarker(lat, long, addressInfo) {
    // let lat = 62.499809400000004;
    // let long = 17.15018313038701;

    let curLocation = [lat, long];
    // console.log(curLocation)
    // sessionStorage.setItem("latLong", JSON.stringify(curLocation))
    // console.log(JSON.parse(sessionStorage.getItem("latLong")))


    map.setView([lat.toPrecision(10), long.toPrecision(10)], 16)
    layerGroup.clearLayers();
    map.closePopup();

    let marker = new L.marker(curLocation, {
        draggable: 'true'
    }).addTo(layerGroup);

    marker.on('dragend', function () {
        let position = marker.getLatLng();
        marker.setLatLng(position, {
            draggable: 'true'
        }).bindPopup(position).update();
        // console.log(position.lat);
        // console.log(position.lng);
        document.querySelector("#customLat").value = position.lat
        document.querySelector("#customLong").value = position.lng
    });
    if (addressInfo == " 0, 0, ") {
        addressInfo = "No address stored, custom coordinates"
    }
    marker.bindPopup(addressInfo).openPopup();
}
