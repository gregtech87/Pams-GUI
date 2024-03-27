
function populateItemDetails(item) {
    loadingGif()
    console.log('populating')
    console.log(item)
    let asset = JSON.parse(sessionStorage.getItem(item));
    setProfilePic('#previewImage', asset);

    // Populating fields from Item entity
    document.querySelector('#title').value = asset.title || '';
    document.querySelector('#brand').value = asset.brand || '';
    document.querySelector('#model').value = asset.model || '';
    document.querySelector('#price').value = asset.price || '';
    document.querySelector('#dateOfPurchase').value = asset.dateOfPurchase || '';
    document.querySelector('#length').value = asset.length || '';
    document.querySelector('#width').value = asset.width || '';
    document.querySelector('#height').value = asset.height || '';
    document.querySelector('#weight').value = asset.weight || '';
    document.querySelector('#state').value = asset.state || '';
    document.querySelector('#insurance').value = asset.insurance || '';
    document.querySelector('#info').value = asset.description || '';

    // Populating fields from ItemStatus entity
    if (asset.status) {
        document.querySelector('#item-address').value = asset.status.currentLocation.street || '';
        document.querySelector('#item-addressNumber').value = asset.status.currentLocation.streetNumber || '';
        document.querySelector('#item-postalCode').value = asset.status.currentLocation.postalCode || '';
        document.querySelector('#item-city').value = asset.status.currentLocation.city || '';
        document.querySelector('#nameOfHolder').value = asset.status.nameOfHolder || '';
        document.querySelector('#purpose').value = asset.status.purpose || '';
    }

    // Populating fields from Place of purchase
    if (asset.placeOfPurchase) {
        document.querySelector('#address').value = asset.placeOfPurchase.street || '';
        document.querySelector('#addressNumber').value = asset.placeOfPurchase.streetNumber || '';
        document.querySelector('#postalCode').value = asset.placeOfPurchase.postalCode || '';
        document.querySelector('#city').value = asset.placeOfPurchase.city || '';
    }

    // Check if custom location is enabled
    document.querySelector('#customLocation').checked = asset.customLocation || false;
    toggleCustomLocation(); // Function to toggle custom location fields visibility

    // Populating custom location fields
    if (asset.customLocation) {
        document.querySelector('#customLat').value = asset.customLat || '';
        document.querySelector('#customLong').value = asset.customLong || '';
    }

    let mapBtnPurchased = document.querySelector("#mapBtnPurchased");
    mapBtnPurchased.addEventListener('click', event => {
        event.preventDefault();
        console.log('purchase adress')
    })
    let mapBtnCurrentLocation = document.querySelector("#mapBtnCurrentLocation");
    mapBtnCurrentLocation.addEventListener('click', event => {
        event.preventDefault();
        console.log('current adress')
    })
    let submitBtn = document.querySelector("#assetSubmit");


    let editBtn = document.querySelector("#assetEdit");
    editBtn.addEventListener('click', event => {
        event.preventDefault();
        console.log(editBtn.innerText)
        toggleReadOnly("#asset-form")
        if (editBtn.innerText ==='Edit'){
            editBtn.innerText = 'Make read only'
            submitBtn.style.visibility = 'visible'
        } else {
            // editBtn.innerText = 'Edit'
            // submitBtn.style.visibility = 'hidden'
            loadItemDetailsPage(item)
        }
    })

    let deleteBtn = document.querySelector("#assetDelete");
    deleteBtn.addEventListener('click', event => {
        event.preventDefault();
        deleteAsset();
    })

    // loopThroughForm("#asset-form")
    messageDiv.innerHTML = ``;
}

// Function to toggle custom location fields visibility based on checkbox state
function toggleCustomLocation() {
    var customLocationCheckbox = document.querySelector('#customLocation');
    var customLocationFields = document.querySelectorAll('.custom-location-fields');

    customLocationFields.forEach(function(field) {
        field.style.display = customLocationCheckbox.checked ? 'block' : 'none';
    });
}

function deleteAsset() {
    console.log("deelete assert")
}

function placeOfPurchaseOnMapItem() {
    console.log('mappy')
}
function currentLocationMapItem() {
    console.log('mappy')
}

function addImageToGallery(item) {
    console.log('adding')
    console.log(item)
    let currentItem = JSON.parse(sessionStorage.getItem(item));
    handleFileUpload('#galleryInput', currentItem.id).then();

}
function loadImagesToGallery() {


    let galleryDiv = document.querySelector("#galleryContent");
    galleryDiv.innerHTML += `
        <section>
            <div class="galleryBox">
                <img id="img" src="../images/no-image-asset.gif" alt="gallery image">
                <img id="removeImage" src="../images/x-mark.svg" alt="d" style="width: 25px; position: absolute" onmouseover="removeImgHover(this);" onmouseout="removeImgUnHover(this);">
            </div>
        </section>
    `;
    messageDiv.innerHTML=``;
}