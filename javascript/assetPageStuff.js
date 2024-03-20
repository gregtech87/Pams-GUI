
function loadAddNewAssetPage() {
    let contentDiv = document.querySelector("#mainContent");
    contentDiv.innerHTML = `
        <section style="max-width: 800px">
            <h2>New Asset (more options after registering)</h2>
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
                <form id="register-form" class="register-form" onsubmit="registerUser(event)">
                    <div class="assetColumn one">
                        <label for="title" class="required"><b>Title:</b></label>
                        <input type="text" id="title" required>
                        
                        <label for="brand"><b>Brand:</b></label>
                        <input type="text" id="brand">
                        
                        <label for="model"><b>Model:</b></label>
                        <input type="text" id="model">
                        
                        <label><b>Place of purchase:</b></label>
                        <div STYLE="display: flex">
                            <div>
                                <input type="text" id="address" placeholder="Street">                    
                            </div>
                            <div style="width: 25%; margin-right: 10px;">
                                <input type="number" id="addressNumber" placeholder="Num">
                            </div>          
                        </div>
                        <input type="number" id="postalCode" placeholder="Postal code">
                        <input type="text" id="city" placeholder="City">
                        
                        <label for="price"><b>Price:</b></label>
                        <input type="number" id="price">
                        
                        
                    </div>
                    <div class="assetColumn two">
                        <label for="age"><b>Age:</b></label>
                        <input type="date" id="age">
                        
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
                        <label for="info"><b>Info:</b></label>
                        <textarea id="info" name="info" placeholder="Description/History." class="descriptionArea"></textarea>
                    </div>
                    <div>
                        <button type="submit" id="assetSubmit" class="posButton">Save</button>   
                        <button onclick="loadAssetPage()" class="negButton">Return</button>
                    </div>
                </form>
            </div>
        </section>
        `;

    let assetSubmit = document.querySelector("#assetSubmit");
    assetSubmit.addEventListener('click', event => {
        event.preventDefault();
        registerAsset();
    })
}

function registerAsset() {

    let date = new Date();
    let timeString = date.getDate() + "/" + (date.getMonth()+1) + "-" + date.getFullYear() + " " + clockStyler(date.getHours()) + ":" + clockStyler(date.getMinutes()) + ":" + clockStyler(date.getSeconds());
    console.log(timeString)

    let newAsset = {
        "title": document.querySelector("#title").value,
        "brand": document.querySelector("#brand").value,
        "model": document.querySelector("#model").value,
        "price": document.querySelector("#price").value,
        "placeOfPurchase": {
            "street": document.querySelector("#address").value,
            "streetNumber": document.querySelector("#addressNumber").value,
            "postalCode": document.querySelector("#postalCode").value,
            "city": document.querySelector("#city").value
        },
        "age": document.querySelector("#age").value,
        "length": document.querySelector("#length").value,
        "width": document.querySelector("#width").value,
        "height": document.querySelector("#height").value,
        "weight": document.querySelector("#weight").value,
        "state": document.querySelector("#state").value,
        "insurance": document.querySelector("#insurance").value,
        "description": document.querySelector("#info").value,

        "PictureData": {
            "name": uploadedTempProfilePicture.name,
            "type": uploadedTempProfilePicture.type,
            "size": uploadedTempProfilePicture.size,
            "lastModified": uploadedTempProfilePicture.lastModified,
            "lastModifiedDate": uploadedTempProfilePicture.lastModifiedDate,
        },
        "picture": {
            "$binary": {
                "base64": uploadedTempProfilePicture.$binary.base64
            }
        }

    }

    console.log(newAsset)

}