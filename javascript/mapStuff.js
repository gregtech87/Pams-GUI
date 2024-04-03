
/*******************************************************************************
 * Copyright (c) 2024. Tobias Gregorsson.
 * Github: Gregtech87
 ******************************************************************************/

function loadMapPage(userBoolean, itemPurchaseBoolean, itemOffSiteBoolean, itemNameInSessionStorage) {
    let contentDiv = document.querySelector("#mainContent");
    contentDiv.innerHTML = `
        <div><p><b id="mapTitle"></b></p></div>
        <div id="map" class="mapDiv">
<!--            Map Content            -->
        </div>
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
    if (itemPurchaseBoolean || itemOffSiteBoolean){
        contentDiv.innerHTML += `
                <button class="negButton" onclick="loadItemDetailsPage('${itemNameInSessionStorage}')">Return</button>
        `;
    }
    loadMapContent(userBoolean, itemPurchaseBoolean, itemOffSiteBoolean, itemNameInSessionStorage).then()

    let form = document.querySelector("#mapForm")
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        setCustomLocation(userBoolean, itemPurchaseBoolean, itemOffSiteBoolean, itemNameInSessionStorage);
    });
}

function setCustomLocation(userBoolean, itemPurchaseBoolean, itemOffSiteBoolean, itemNameInSessionStorage) {
    console.log(userBoolean)
    console.log(itemPurchaseBoolean)
    console.log(document.querySelector("#customLat").value)
    console.log(document.querySelector("#customLong").value)

    let asset;
    if (itemNameInSessionStorage !== undefined){
        asset = JSON.parse(sessionStorage.getItem(itemNameInSessionStorage));
    }
    console.log(asset)

    if (userBoolean) {
        let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
        console.log(user);
        user.customLat = parseFloat(document.querySelector("#customLat").value)
        user.customLong = parseFloat(document.querySelector("#customLong").value)
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
        updateUser(true, false, false).then(() => {
            loadMapPage(userBoolean, itemPurchaseBoolean, itemOffSiteBoolean, itemNameInSessionStorage);
        });
    }
    if (itemPurchaseBoolean && itemNameInSessionStorage !== undefined) {
        sessionStorage.setItem('tempLat',document.querySelector("#customLat").value);
        sessionStorage.setItem('tempLong',document.querySelector("#customLong").value);
        updateAsset(asset.id, itemNameInSessionStorage, true, false).then()
    }
    if (itemOffSiteBoolean && itemNameInSessionStorage !== undefined) {
        sessionStorage.setItem('tempLat',document.querySelector("#customLat").value);
        sessionStorage.setItem('tempLong',document.querySelector("#customLong").value);
        updateAsset(asset.id, itemNameInSessionStorage, false, true).then()
    }
}


let map;
let layerGroup;
let layer;

async function loadMapContent(userBoolean, itemPurchaseBoolean, itemOffSiteBoolean, itemNameInSessionStorage) {
    map = new L.map('map').setView([63, 17], 4);
    layerGroup = L.layerGroup().addTo(map);
    layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);
    let scale = L.control.scale(); // Creating scale control
    map.addControl(scale)
    await searchAddress(userBoolean, itemPurchaseBoolean, itemOffSiteBoolean, itemNameInSessionStorage).then()
}

async function searchAddress(userBoolean, itemPurchaseBoolean, itemOffSiteBoolean, itemNameInSessionStorage) {
    let address;
    let user = JSON.parse(sessionStorage.getItem("loggedInUser"))
    let asset;
    if (itemNameInSessionStorage !== undefined){
        asset = JSON.parse(sessionStorage.getItem(itemNameInSessionStorage));
    }
    console.log(asset)

    if (userBoolean) {
        let mapTitle = document.querySelector("#mapTitle");
        mapTitle.innerHTML = "User home address"

        let response = await fetchDataGetUnAuth("https://geocode.maps.co/search?q=" + user.address.street + "+" + user.address.streetNumber + "+" + user.address.postalCode + "+" + user.address.city + "&api_key=65e03fe9bee9e315182041veo737119")
        await response.json().then(a => {
            address = a.at(0);
        })
        let addressString = user.address.street + " " + user.address.streetNumber + ", " + user.address.postalCode + ", " + user.address.city;
        setClickMarker("New custom coordinates?");

        if (user.customLocation && user.customLat !== 0 && user.customLong !== 0) {
            let addressLat = parseFloat(user.customLat);
            let addressLong = parseFloat(user.customLong);
            // console.log(addressLat, addressLong)
            setMapMarker(addressLat, addressLong, addressString)
        }
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

    if (itemPurchaseBoolean && asset !== undefined) {
        let mapTitle = document.querySelector("#mapTitle");
        mapTitle.innerHTML = "Item Purchase location"
        console.log("item purchase location")
        let response = await fetchDataGetUnAuth("https://geocode.maps.co/search?q=" + asset.placeOfPurchase.street + "+" + asset.placeOfPurchase.streetNumber+ "+" + asset.placeOfPurchase.postalCode + "+" + asset.placeOfPurchase.city + "&api_key=65e03fe9bee9e315182041veo737119")
        await response.json().then(a => {
            address = a.at(0);
        })
        console.log(address)
        console.log(address.display_name)
        console.log(asset.placeOfPurchase)

        let addressString = asset.placeOfPurchase.street + " " + asset.placeOfPurchase.streetNumber + ", " + asset.placeOfPurchase.postalCode + ", " + asset.placeOfPurchase.city;
        console.log(addressString)
        setClickMarker("New custom coordinates?");

        if (asset.customLocation && asset.customLat !== 0 && asset.customLong !== 0) {
            let addressLat = parseFloat(asset.customLat);
            let addressLong = parseFloat(asset.customLong);
            // console.log(addressLat, addressLong)
            setMapMarker(addressLat, addressLong, addressString)
        }
        if (!asset.customLocation && (asset.placeOfPurchase.street !== "" || asset.placeOfPurchase.city !== "" || asset.placeOfPurchase.streetNumber !== 0 || asset.placeOfPurchase.postalCode !== 0)) {
            let addressLat = parseFloat(address.lat);
            let addressLong = parseFloat(address.lon);
            // console.log(addressLat, addressLong)
            setMapMarker(addressLat, addressLong, address.display_name)
        }
        // if (asset.customLocation && asset.status.currentLocation === null) {
        //     let addressLat = parseFloat(user.customLat);
        //     let addressLong = parseFloat(user.customLong);
        //     // console.log(addressLat, addressLong)
        //     let customAddressString = addressString + " (Custom pin location)"
        //     setMapMarker(addressLat, addressLong, customAddressString)
        // }
    }

    if (itemOffSiteBoolean && asset !== undefined) {
        let mapTitle = document.querySelector("#mapTitle");
        mapTitle.innerHTML = "Item Offsite location"
        let addressString
        console.log("item Off Site")

        if (asset.status.currentLocation !== null){
            let response = await fetchDataGetUnAuth("https://geocode.maps.co/search?q=" + asset.status.currentLocation.street + "+" + asset.status.currentLocation.streetNumber + "+" + asset.status.currentLocation.postalCode + "+" + asset.status.currentLocation.city + "&api_key=65e03fe9bee9e315182041veo737119")
            await response.json().then(a => {
                address = a.at(0);
            })
            console.log(address)
            console.log(address.display_name)
            console.log(asset.status.currentLocation)

            addressString = asset.status.currentLocation.street + " " + asset.status.currentLocation.streetNumber + ", " + asset.status.currentLocation.postalCode + ", " + asset.status.currentLocation.city;
            console.log(addressString)
        }
        setClickMarker("New custom coordinates?");

        if (asset.status.customLocation && asset.status.customLat !== 0 && asset.status.customLong !== 0) {
            let addressLat = parseFloat(asset.customLat);
            let addressLong = parseFloat(asset.customLong);
            // console.log(addressLat, addressLong)
            setMapMarker(addressLat, addressLong, addressString)
        }
        if (!asset.status.customLocation && (asset.status.currentLocation.street !== "" || asset.status.currentLocation.city !== "" || asset.status.currentLocation.streetNumber !== 0 || asset.status.currentLocation.postalCode !== 0)) {
            let addressLat = parseFloat(address.lat);
            let addressLong = parseFloat(address.lon);
            console.log(addressLat, addressLong)
            setMapMarker(addressLat, addressLong, address.display_name)
        }
        if (asset.status.customLocation && asset.status.currentLocation !== null) {
            let addressLat = parseFloat(asset.status.customLat);
            let addressLong = parseFloat(asset.status.customLong);
            // console.log(addressLat, addressLong)
            let customAddressString = addressString + " (Custom pin location)"
            setMapMarker(addressLat, addressLong, customAddressString)
        }
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
    console.log('addressInfo: *' + addressInfo + '*')
    console.log('addressInfo: *' + addressInfo.substring(0,5) + '*')
    console.log('addressInfo: ' + addressInfo.length)
    if (addressInfo.substring(0,5) === " 0, 0") {
        addressInfo = "No address stored, custom coordinates"
    }
    marker.bindPopup(addressInfo).openPopup();
}
