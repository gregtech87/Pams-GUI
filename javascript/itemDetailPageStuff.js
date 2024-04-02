
/*******************************************************************************
 * Copyright (c) 2024. Tobias Gregorsson.
 * Github: Gregtech87
 ******************************************************************************/

function populateItemDetails(item) {
    loadingGif()
    console.log('populating')
    console.log(item)
    let asset = JSON.parse(sessionStorage.getItem(item));
    setProfilePic('#previewImage', asset);

    // Populating fields from Item entity
    document.querySelector('#title').value = asset.title;
    document.querySelector('#brand').value = asset.brand;
    document.querySelector('#model').value = asset.model;
    document.querySelector('#price').value = asset.price;
    document.querySelector('#dateOfPurchase').value = asset.dateOfPurchase;
    document.querySelector('#length').value = asset.length;
    document.querySelector('#width').value = asset.width;
    document.querySelector('#height').value = asset.height;
    document.querySelector('#weight').value = asset.weight;
    document.querySelector('#state').value = asset.state;
    document.querySelector('#insurance').value = asset.insurance;
    document.querySelector('#info').value = asset.description;

    // Populating fields from ItemStatus entity
    if (asset.status.currentLocation) {
        document.querySelector('#item-address').value = asset.status.currentLocation.street;
        document.querySelector('#item-addressNumber').value = asset.status.currentLocation.streetNumber;
        document.querySelector('#item-postalCode').value = asset.status.currentLocation.postalCode;
        document.querySelector('#item-city').value = asset.status.currentLocation.city;
    }
    document.querySelector('#nameOfHolder').value = asset.status.nameOfHolder;
    document.querySelector('#purpose').value = asset.status.purpose;

    // Populating fields from Place of purchase
    if (asset.placeOfPurchase) {
        document.querySelector('#address').value = asset.placeOfPurchase.street;
        document.querySelector('#addressNumber').value = asset.placeOfPurchase.streetNumber;
        document.querySelector('#postalCode').value = asset.placeOfPurchase.postalCode;
        document.querySelector('#city').value = asset.placeOfPurchase.city;
    }

    // Check if custom location is enabled
    document.querySelector('#customLocation').checked = !!asset.customLocation;

    // Populating custom location fields
    // if (asset.customLocation) {
        document.querySelector('#customLat').value = asset.customLat;
        document.querySelector('#customLong').value = asset.customLong;
    // }

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
    submitBtn.addEventListener('click', event => {
        event.preventDefault();
        updateAsset(asset.id, item);
    })

    let editBtn = document.querySelector("#assetEdit");
    editBtn.addEventListener('click', event => {
        event.preventDefault();
        console.log(editBtn.innerText)
        toggleReadOnly("#asset-form")
        if (editBtn.innerText === 'Edit') {
            editBtn.innerText = 'Make read only'
            submitBtn.style.visibility = 'visible'
        } else {
            loadItemDetailsPage(item)
        }
    })

    let deleteBtn = document.querySelector("#assetDelete");
    deleteBtn.addEventListener('click', event => {
        event.preventDefault();
        deleteAsset(asset.id);
    })
    loadImagesToGallery(asset.id, item).then()
    // loopThroughForm("#asset-form")
    messageDiv.innerHTML = ``;
}



function addImageToGallery(item) {
    console.log('adding')
    console.log(item)
    let currentItem = JSON.parse(sessionStorage.getItem(item));
    handleFileUpload('#galleryInput', currentItem.id).then();

}

async function loadImagesToGallery(itemId, itemInSessionStorage) {
    console.log(itemId)
    console.log(itemInSessionStorage)

    let galleryDiv = document.querySelector("#galleryContent");
    galleryDiv.innerHTML = ``;
    let galleryPreview = document.querySelector("#galleryPreview");
    galleryPreview.src = '../images/no-image-asset.gif'
    let listOfPictures;
    let currentItem;
    let fileIdList;

    const url = baseFetchUrl + 'item/' + itemId;
    const response = await fetchDataGet(url, btoa("itemGuy:itemGuy"));
    currentItem = await response.json();
    console.log(currentItem)
    console.log(currentItem.additionalPictureIds)
    if (currentItem.additionalPictureIds.length === 0) {
        // empty table ROw
        fileIdList = "empty";
    } else {
        fileIdList = currentItem.additionalPictureIds;
    }

    let responseFiles = await fetchDataGet(baseFetchUrl + "file/" + fileIdList, btoa("fileGuy:fileGuy"));
    let fileList = await responseFiles.json();
    console.log(fileList)
    let listIndex = 0;

    if (fileList.length > 0) {
        fileList.forEach(file => {
            // Generate the boxes
            galleryDiv.innerHTML += `
             <section>
                 <div class="galleryBox">
                     <img id="img${listIndex}" src="../images/no-image-asset.gif" alt="gallery image">
                     <img id="removeImage${listIndex}" onclick="removeFile('${file.identifier}', '${file.id}', '${file.fileName}', '${currentItem.id}', '${itemInSessionStorage}')" src="../images/x-mark.svg" alt="d" style="width: 25px; position: absolute" onmouseover="removeImgHover(this);" onmouseout="removeImgUnHover(this);">
                 </div>
             </section>
        `;

            listIndex++;

        });

        for (let i = 0; i < fileIdList.length; i++) {
            // Set image in respective box
            let imageFile = await downloadFile(loggedInUser.username, fileList[i].identifier, fileList[i].fileName, fileList[i].type, false, true, currentItem.title);
            console.log(imageFile)
            if (imageFile) {
                let reader = new FileReader();
                let imageElement = document.querySelector("#img" + i)
                console.log(imageElement)
                reader.onload = function () {
                    imageElement.src = reader.result;
                };
                reader.readAsDataURL(imageFile);
            }

            // Add event listener to image and delete icon
            let clickableImage = document.querySelector("#img" + i);
            clickableImage.addEventListener('click', () => {
                downloadFile(loggedInUser.username, fileList[i].identifier, fileList[i].fileName, fileList[i].type, true, true, currentItem.title);
            });
            let deleteIcon = document.querySelector("#removeImage" + i);

        }
    }
    messageDiv.innerHTML = ``;
}

async function deleteAsset(assetId) {
    console.log("deelete assert")
    console.log(assetId)
    let deleteResponse = await fetchDataDelete(baseFetchUrl + 'item/' + assetId, base64credentials)
    console.log(typeof deleteResponse);
    console.log(deleteResponse);
}

function placeOfPurchaseOnMapItem() {
    console.log('mappy')
}

function currentLocationMapItem() {
    console.log('mappy')
}


async function updateAsset(assetId, itemInSessionStorage) {

    const url = baseFetchUrl + 'item/' + assetId;
    const response = await fetchDataGet(url, btoa("itemGuy:itemGuy"));
    let dbAsset = await response.json();
    let newAsset = dbAsset;
    let newProfilePic = JSON.parse(sessionStorage.getItem("newProfilePic"));
    console.log('From DB:')
    console.log(newAsset)

    newAsset.title = document.getElementById('title').value;
    newAsset.brand = document.getElementById('brand').value;
    newAsset.model = document.getElementById('model').value;
    newAsset.placeOfPurchase = {
        street: document.getElementById('address').value,
        addressNumber: document.getElementById('addressNumber').value,
        postalCode: document.getElementById('postalCode').value,
        city: document.getElementById('city').value
    };
    newAsset.price = document.getElementById('price').value;
    newAsset.dateOfPurchase = document.getElementById('dateOfPurchase').value;

    newAsset.length = document.getElementById('length').value;
    newAsset.width = document.getElementById('width').value;
    newAsset.height = document.getElementById('height').value;

    newAsset.weight = document.getElementById('weight').value;
    newAsset.state = document.getElementById('state').value;
    newAsset.insurance = document.getElementById('insurance').value;
    newAsset.status = {
        nameOfHolder: document.getElementById('nameOfHolder').value,
        purpose: document.getElementById('purpose').value,
        address: {
            street: document.getElementById('item-address').value,
            addressNumber: document.getElementById('item-addressNumber').value,
            postalCode: document.getElementById('item-postalCode').value,
            city: document.getElementById('item-city').value
        }
    };
    newAsset.customLocation = document.getElementById('customLocation').checked;
    newAsset.customLat = document.getElementById('customLat').value;
    newAsset.customLong = document.getElementById('customLong').value;

    newAsset.description = document.getElementById('info').value;
    if (newProfilePic) {
        newAsset.profilePic = {"$binary": {"base64": uploadedTempProfilePicture.$binary.base64}};
        newAsset.profilePictureData.name = uploadedTempProfilePicture.name;
        newAsset.profilePictureData.type = uploadedTempProfilePicture.type;
        newAsset.profilePictureData.size = uploadedTempProfilePicture.size;
        newAsset.profilePictureData.lastModified = uploadedTempProfilePicture.lastModified;
        newAsset.profilePictureData.lastModifiedDate = uploadedTempProfilePicture.lastModifiedDate;
    } else {
        newAsset.profilePic = {"$binary": {"base64": dbAsset.profilePic}};
        newAsset.profilePictureData.name = dbAsset.profilePictureData.name;
        newAsset.profilePictureData.type = dbAsset.profilePictureData.type;
        newAsset.profilePictureData.size = dbAsset.profilePictureData.size;
        newAsset.profilePictureData.lastModified = dbAsset.profilePictureData.lastModified;
        newAsset.profilePictureData.lastModifiedDate = dbAsset.profilePictureData.lastModifiedDate;
    }
    console.log(newAsset)
    console.log(uploadedTempProfilePicture)

    let updateResponse;
    const updateUrl = baseFetchUrl + 'item';
    let cred = btoa(`itemGuy:itemGuy`)
    try {
        updateResponse = await fetchDataPut(updateUrl, cred, newAsset)
    } catch (e) {
        errorBox("Something went wrong! Try again later.")
    }
    console.log("RESP")
    console.log(updateResponse)
    sessionStorage.setItem(itemInSessionStorage, JSON.stringify(updateResponse))
    loadItemDetailsPage(itemInSessionStorage)
}

