/*******************************************************************************
 * Copyright (c) 2024. Tobias Gregorsson.
 * Github: Gregtech87
 ******************************************************************************/

async function populateItemDetails(item) {
    console.log('populating')
    console.log(item)
    // let asset = JSON.parse(sessionStorage.getItem(item));
    let asset = await getAssetById(sessionStorage.getItem(item));
    console.log(asset)
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
    document.querySelector('#placeOfPurchaseName').value = asset.placeOfPurchaseName;

    // Populating fields from ItemStatus entity
    // Populating fields from Place of purchase

    if (asset.placeOfPurchase) {
        document.querySelector('#item-address').value = asset.placeOfPurchase.street;
        document.querySelector('#item-addressNumber').value = asset.placeOfPurchase.streetNumber;
        document.querySelector('#item-postalCode').value = asset.placeOfPurchase.postalCode;
        document.querySelector('#item-city').value = asset.placeOfPurchase.city;
    }
    // Check if custom OnSite location is enabled

    document.querySelector('#customOnSiteLocation').checked = !!asset.customLocation;
    if (asset.customLocation) {
        document.querySelector('#OnSiteCustomLat').value = asset.customLat;
        document.querySelector('#OnSiteCustomLong').value = asset.customLong;
    } else {
        document.querySelector('#OnSiteCustomLat').value = 0;
        document.querySelector('#OnSiteCustomLong').value = 0;
    }

    if (asset.status) {

        document.querySelector('#nameOfHolder').value = asset.status.nameOfHolder;
        document.querySelector('#purpose').value = asset.status.purpose;
        document.querySelector('#customOffSiteLocation').checked = !!asset.status.customLocation;

        if (asset.status.currentLocation) {
            document.querySelector('#item-offSite-address').value = asset.status.currentLocation.street;
            document.querySelector('#item-offSite-addressNumber').value = asset.status.currentLocation.streetNumber;
            document.querySelector('#item-offSite-postalCode').value = asset.status.currentLocation.postalCode;
            document.querySelector('#item-offSite-city').value = asset.status.currentLocation.city;
        }
        if (asset.status.customLocation) {
            document.querySelector('#OffSiteCustomLat').value = asset.status.customLat;
            document.querySelector('#OffSiteCustomLong').value = asset.status.customLong;
        } else {
            document.querySelector('#OffSiteCustomLat').value = 0;
            document.querySelector('#OffSiteCustomLong').value = 0;
        }

    }

    let mapBtnPurchased = document.querySelector("#mapBtnPurchased");
    mapBtnPurchased.addEventListener('click', event => {
        event.preventDefault();
        console.log('purchase adress')
        loadMapPage(false, true, false, item);
    })
    let mapBtnCurrentLocation = document.querySelector("#mapBtnCurrentLocation");
    mapBtnCurrentLocation.addEventListener('click', event => {
        event.preventDefault();
        console.log('current adress')
        loadMapPage(false, false, true, item);
    })
    let submitBtn = document.querySelector("#assetSubmit");
    submitBtn.addEventListener('click', event => {
        event.preventDefault();
        updateAsset(asset.id, item, false, false).then();
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
            loadingGif();
            loadItemDetailsPage(item)
        }
    })

    let deleteBtn = document.querySelector("#assetDelete");
    deleteBtn.addEventListener('click', event => {
        event.preventDefault();
        deleteAsset(asset.id).then();
    })
    loadImagesToGallery(asset.id, item).then()
    // loopThroughForm("#asset-form")
}


async function addImageToGallery(item) {
    console.log('adding')
    console.log(item)
    let currentItem = await getAssetById(sessionStorage.getItem(item));
    console.log(currentItem)
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
    let confirmDelete = confirm('Are you sure you wish to delete this asset?');
    if (confirmDelete) {
        let deleteResponse = await fetchDataDelete(baseFetchUrl + 'item/' + assetId, base64credentials);
        if (deleteResponse === 'true') {
            loadAssetPage();
            successBox('Asset removed')
        } else {
            errorBox('Asset failed to be removed, try again or contact the support.')
        }
    }
}



async function updateAsset(assetId, itemInSessionStorage, updatePurchaseBoolean, updateOffSiteBoolean) {
    const url = baseFetchUrl + 'item/' + assetId;
    const response = await fetchDataGet(url, btoa("itemGuy:itemGuy"));
    let dbAsset = await response.json();
    console.log(dbAsset)
    let newAsset = dbAsset;
    console.log('From DB:')
    console.log(newAsset)
    let newProfilePic = JSON.parse(sessionStorage.getItem("newProfilePic"));


    if (!updatePurchaseBoolean && !updateOffSiteBoolean){
        newAsset.title = document.getElementById('title').value;
        newAsset.brand = document.getElementById('brand').value;
        newAsset.model = document.getElementById('model').value;
        newAsset.placeOfPurchaseName = document.getElementById('placeOfPurchaseName').value;
        newAsset.placeOfPurchase = {
            street: document.getElementById('item-address').value,
            streetNumber: document.getElementById('item-addressNumber').value,
            postalCode: document.getElementById('item-postalCode').value,
            city: document.getElementById('item-city').value
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
            currentLocation: {
                street: document.getElementById('item-offSite-address').value,
                streetNumber: document.getElementById('item-offSite-addressNumber').value,
                postalCode: document.getElementById('item-offSite-postalCode').value,
                city: document.getElementById('item-offSite-city').value
            },
            customLocation: document.querySelector('#customOffSiteLocation').checked,
            customLat: document.querySelector('#OffSiteCustomLat').value,
            customLong: document.querySelector('#OffSiteCustomLong').value,
        };
        newAsset.customLocation = document.getElementById('customOnSiteLocation').checked;
        newAsset.customLat = document.getElementById('OnSiteCustomLat').value;
        newAsset.customLong = document.getElementById('OnSiteCustomLong').value;
        newAsset.description = document.getElementById('info').value;

        if(!newAsset.customLocation) {
            newAsset.customLat = 0;
            newAsset.customLong = 0;
        }
        if(!newAsset.status.customLocation) {
            newAsset.status.customLat = 0;
            newAsset.status.customLong = 0;
        }
    }
    console.log(newProfilePic)
    console.log(updatePurchaseBoolean)
    console.log(updateOffSiteBoolean)

    if (newProfilePic === true && (!updatePurchaseBoolean || !updateOffSiteBoolean)) {
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

    if (updatePurchaseBoolean){
        newAsset.customLocation = true;
        newAsset.customLat = parseFloat(sessionStorage.getItem('tempLat'));
        newAsset.customLong = parseFloat(sessionStorage.getItem('tempLong'));
    }
    if (updateOffSiteBoolean){
        newAsset.status.customLocation = true;
        newAsset.status.customLat = parseFloat(sessionStorage.getItem('tempLat'));
        newAsset.status.customLong = parseFloat(sessionStorage.getItem('tempLong'));
    }


    let updateResponse;
    const updateUrl = baseFetchUrl + 'item';
    let cred = btoa(`itemGuy:itemGuy`);
    try {
        updateResponse = await fetchDataPut(updateUrl, cred, newAsset);
    } catch (e) {
        errorBox("Something went wrong! Try again later.");
    }
    console.log("RESP")
    console.log(updateResponse)
    sessionStorage.setItem(itemInSessionStorage, updateResponse.id);
    loadingGif();
    await loadItemDetailsPage(itemInSessionStorage);
}
