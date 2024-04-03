

/*******************************************************************************
 * Copyright (c) 2024. Tobias Gregorsson.
 * Github: Gregtech87
 ******************************************************************************/

function loadItemDetailsPage(item) {
    let asset = JSON.parse(sessionStorage.getItem(item));
    console.log(asset)
    let contentDiv = document.querySelector("#mainContent");
    contentDiv.innerHTML = `
        <section style="max-width: 1300px">
            <h2>Asset detail. (Gallery below)</h2>
            <div id="register-page" >
                <div class="assetImg">
                    <div>
                        <img id="previewImage" src="../images/no-image-asset.gif" alt="Uploaded Image" style="width: 200px">
                    </div>
                    <div>
                        <label class="pic-upload stdButton">
                        <input type="file" id="imageInput" accept="image/*" onchange="handleImageChange('#imageInput', '#previewImage')">
                        Upload picture
                        </label>
                    </div>
                </div>
                <form id="asset-form" class="register-form">
                    <div class="assetColumn one">
                        <label for="title" class="required"><b>Title:</b></label>
                        <input type="text" id="title" required>
                        
                        <label for="brand"><b>Brand:</b></label>
                        <input type="text" id="brand">
                        
                        <label for="model"><b>Model:</b></label>
                        <input type="text" id="model">
                        
                        <div STYLE="display: flex">
                            <div style="align-content: center">
                                <label><b>Place of purchase:</b></label>                    
                            </div>
                            <div style="width: 25%; margin-right: 10px;">
                                <button id="mapBtnPurchased" class="mapButtonItems">On map</button>
                            </div>          
                        </div>
                        
                        <input type="text" id="placeOfPurchaseName" placeholder="Name">
                        
                        <div STYLE="display: flex">
                            <div>
                                <input type="text" id="item-address" placeholder="Street">                    
                            </div>
                            <div style="width: 25%; margin-right: 10px;">
                                <input type="number" id="item-addressNumber" placeholder="Num">
                            </div>          
                        </div>
                        <input type="number" id="item-postalCode" placeholder="Postal code">
                        <input type="text" id="item-city" placeholder="City">
                        
                         <div>
                            <label for="customOnSiteLocation"><b>Custom coordinates:</b></label>
                            <input type="checkbox" id="customOnSiteLocation" name="customOnSiteLocation" style="width: fit-content">
                        </div>
                        
                        <div STYLE="display: flex; justify-content: space-between">
                            <label for="OnSiteCustomLat" style="padding-right: 5px"><b> Lat: </b></label>
                            <input type="number" step="any" id="OnSiteCustomLat" name="OnSiteCustomLat" style="width: 75%">
                        </div>
                        
                        <div STYLE="display: flex; justify-content: space-between">
                            <label for="OnSiteCustomLong" style="padding-right: 5px"><b> Long: </b></label>
                            <input type="number" step="any" id="OnSiteCustomLong" name="OnSiteCustomLong" style="width: 75%">
                        </div>   
                    </div>
                    <div class="assetColumn two">
                        <label for="dateOfPurchase"><b>Date of purchase:</b></label>
                        <input type="date" id="dateOfPurchase">
                        
                        <label for="price"><b>Price:</b></label>
                        <input type="number" id="price">
                        
                        <label><b>Size:</b></label>
                        <div>
                            <input type="number" id="length" placeholder="Length">
                            <input type="number" id="width" placeholder="Width">
                            <input type="number" id="height" placeholder="Height">
                        </div>
                        <input type="number" id="weight" placeholder="Weight (Kilo)">
                        
                        <label for="state"><b>State:</b></label>
                        <input type="text" id="state" placeholder="New/clean/broken etc">
                        
                        <label for="insurance"><b>Insurance:</b></label>
                        <input type="text" id="insurance" placeholder="Name">
                        
                    </div>
                    <div class="assetColumn three">
                        <label><b>** Asset offsite or loaned out **</b></label>
                        
                        <div style="border-left: #a7a7a7 dotted; padding-left: 5px ">
                            <label for="lastName"><b>Name of Holder:</b></label>
                            <input type="text" id="nameOfHolder">
                            
                            <label for="username"><b>Reason:</b></label>
                            <input type="text" id="purpose" placeholder="Service, loan, rented">
                            
                            <div STYLE="display: flex">
                                <div style="align-content: center">
                                    <label><b>Current location:</b></label>                    
                                </div>
                                <div style="width: 25%; margin-right: 10px;">
                                    <button id="mapBtnCurrentLocation" class="mapButtonItems">On map</button>
                                </div>          
                            </div>
                            
                            <div STYLE="display: flex">
                                <div>
                                    <input type="text" id="item-offSite-address" placeholder="Street">                    
                                </div>
                                <div style="width: 25%; margin-right: 10px;">
                                    <input type="number" id="item-offSite-addressNumber" placeholder="Num">
                                </div>          
                            </div>
                            <input type="number" id="item-offSite-postalCode" placeholder="Postal code">
                            <input type="text" id="item-offSite-city" placeholder="City">
                            
                            <div>
                                <label for="customOffSiteLocation"><b>Custom coordinates:</b></label>
                                <input type="checkbox" id="customOffSiteLocation" name="customOffSiteLocation" style="width: fit-content">
                            </div>
                            
                            <div STYLE="display: flex; justify-content: space-between">
                                <label for="OffSiteCustomLat" style="padding-right: 5px"><b> Lat: </b></label>
                                <input type="number" step="any" id="OffSiteCustomLat" name="OffSiteCustomLat" style="width: 75%">
                            </div>
                            
                            <div STYLE="display: flex; justify-content: space-between">
                                <label for="OffSiteCustomLong" style="padding-right: 5px"><b> Long: </b></label>
                                <input type="number" step="any" id="OffSiteCustomLong" name="OffSiteCustomLong" style="width: 75%">
                            </div>                             
                        </div>
                    </div>
                    <div class="assetColumn four" style="width: 450px; max-width: 500px;">
                    <div style="display: block; width: 100%">
                        <label for="info"><b>Info:</b></label>
                        <textarea id="info" name="info" placeholder="Description/History." class="infoArea"></textarea>
                    </div>
                    </div>
                </form>
                               
                <div style="text-align: center">
                    <button id="assetSubmit" type="submit" class="posButton" style="visibility: hidden">Save changes</button>   
                    <button id="assetEdit" class="stdButton">Edit</button>
                    <button id="assetDelete" class="negButton">Delete</button>
                </div>
            </div>
        </section>
        
        <section style="max-width: 800px">
            <h2>Image gallery</h2>
            <div style="text-align: center; margin-bottom: 10px">
                <img id="galleryPreview" src="../images/no-image-asset.gif" alt="Uploaded Image" style="width: 200px">
                <div style="display: flex; justify-content: center">
                    <label class="pic-upload stdButton" style="margin: 10px 11px 4px 0; padding: 10px 10px 0 10px;">
                    <input type="file" id="galleryInput" accept="image/*" onchange="handleImageChange('#galleryInput', '#galleryPreview')">
                    Select image
                    </label>
                    <button class="file-upload posButton" onclick="addImageToGallery('${item}')">Save image to gallery</button>
                </div>        
            </div>
            <section>
                <div id="galleryContent" class="galleryContent">
<!--                No content so far-->
                </div>
            </section>
        </section>
    `;

    populateItemDetails(item);
    toggleReadOnly("#asset-form")

}