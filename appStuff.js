function setProfilePic(elementId) {
    const imageElement = document.querySelector(elementId);

    if (loggedInUser.profilePic.length > 100) {
        // Convert base64 data URI to a binary string.
        const byteString = atob(loggedInUser.profilePic);
        // Create a Uint8Array from the binary string.
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }
        // Create a Blob from the Uint8Array with dynamic MIME type.
        let pic = new File([uint8Array], loggedInUser.profilePictureData.name, {type: loggedInUser.profilePictureData.type,});
        // Check if any files are selected
        if (pic) {
            let reader = new FileReader();
            reader.onload = function (e) {
                imageElement.src = e.target.result;
            };
            reader.readAsDataURL(pic);
        }
    }
}

function displayProfileEdit() {
    let contentDiv = document.querySelector("#mainContent");

    contentDiv.innerHTML = `
    <h2>Edit Profile</h2>
    <div class="editPage editBorder" style="margin-bottom: 0">
        <div class="editUserForm" style="margin-bottom: 0">
            <form id="updateUserForm">
                <label for="firstName">First Name:</label>
                <input type="text" id="update-firstName" name="firstName" required>
        
                <label for="lastName">Last Name:</label>
                <input type="text" id="update-lastName" name="lastName">
                
                <label for="username">Username:</label>
                <input type="text" id="update-username" name="username" required>
                
                <label for="email">Email:</label>
                <input type="email" id="update-email" name="email" required>
                
                <label for="phone">Phone:</label>
                <input type="tel" id="update-phone" name="phone">
        
                <label for="dob">Date of Birth:</label>
                <input type="date" id="update-dob" name="dob">
        
                <label for="address">Address:</label>
                <input type="text" id="update-address" name="address">
        
                <label for="postalCode">Postal Code:</label>
                <input type="text" id="update-postalCode" name="postalCode">
        
                <label for="city">City:</label>
                <input type="text" id="update-city" name="city">
        
<!--                <div style="margin-bottom: 0">-->
<!--                    <button type="submit" class="posButton">Save Changes</button>-->
<!--                    <button class="negButton" onclick="loadApplication()">Return</button>-->
<!--                </div>-->
            </form>
        </div>
        <div class="editUserPic" style="margin-bottom: 0">
            <img id="editPic" src="images/defaultUser.png" alt="Profile picture"><br>
            <label for="newPicture">Profile Picture:</label><br>
            <input type="file" id="newPicture" accept="image/*">
        </div>    
<!--        External form buttons for ev resizing          -->
        <div style="margin-bottom: 0;">
            <button id="formsub" type="submit" form="updateUserForm" class="posButton">Save Changes</button>
            <button class="negButton" onclick="loadApplication()">Return</button>
        </div>
    </div>
    `;
    populateEditUserForm();
    setProfilePic('#editPic');

    let newProfilePic = false;

    let editProfilePicBtn = document.querySelector('#newPicture');
    editProfilePicBtn.addEventListener("change", function () {
        console.log(uploadedTempProfilePicture)
        handleImageChange('#newPicture', '#editPic');
        console.log(uploadedTempProfilePicture)
        newProfilePic = true;
    })

    let updateUserForm = document.querySelector('#updateUserForm');
    updateUserForm.addEventListener("submit", function (event) {
        event.preventDefault();
        updateUser(newProfilePic).then();
    });
}

async function updateUser(newProfilePic) {
    // loadingGif()
    console.log(loggedInUser)
    console.log(uploadedTempProfilePicture)


    let editedLoggedInUser = {"address": {}, "profilePictureData": {}};
    editedLoggedInUser.id = loggedInUser.id;
    editedLoggedInUser.username = document.querySelector("#update-username").value;
    editedLoggedInUser.password = "dummyPassword"
    editedLoggedInUser.firstName = document.querySelector("#update-firstName").value;
    editedLoggedInUser.lastName = document.querySelector("#update-lastName").value;
    editedLoggedInUser.email = document.querySelector("#update-email").value;
    editedLoggedInUser.phone = document.querySelector("#update-phone").value;
    editedLoggedInUser.address.street = document.querySelector("#update-address").value;
    editedLoggedInUser.address.postalCode = document.querySelector("#update-postalCode").value;
    editedLoggedInUser.address.city = document.querySelector("#update-city").value;
    editedLoggedInUser.dateOfBirth = document.querySelector("#update-dob").value;
    if (newProfilePic) {
        editedLoggedInUser.profilePic = {"$binary": {"base64": uploadedTempProfilePicture.$binary.base64}};
        editedLoggedInUser.profilePictureData.name = uploadedTempProfilePicture.name
        editedLoggedInUser.profilePictureData.type = uploadedTempProfilePicture.type
        editedLoggedInUser.profilePictureData.size = uploadedTempProfilePicture.size
        editedLoggedInUser.profilePictureData.lastModified = uploadedTempProfilePicture.lastModified
        editedLoggedInUser.profilePictureData.lastModifiedDate = uploadedTempProfilePicture.lastModifiedDate
    }
    let response;
    const url = baseFetchUrl + 'user';
    let cred = btoa(`editUser:editUser`)
    try{
     response = await fetchDataPut(url, cred, editedLoggedInUser)
    }catch (e){
        errorBox("Something went wrong! Try again later.")
    }
    console.log(newProfilePic)
    console.log(response)
    console.log(loggedInUser)
    console.log(editedLoggedInUser)
}