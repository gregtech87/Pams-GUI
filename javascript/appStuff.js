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
    sessionStorage.setItem("newProfilePic", "false");
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
        
                <div style="width: 94%">
                    <div style="display: flex; justify-content: space-between">
                        <label for="address">Address:</label>
                        <div>
                            <label for="customLocation">Custom coordinates:</label>
                            <input type="checkbox" id="customLocation" name="customLocation" style="width: fit-content">
                        </div>
                    </div>
                    <div style="display: flex">
                        <input type="text" id="update-address" name="address" placeholder="Street">
                        <input type="number" id="update-addressNumber" name="addressNumber" placeholder="Number" style="width: 50%">                
                    </div>
                </div>
        
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
            <img id="editPic" src="../images/defaultUser.png" alt="Profile picture"><br>
            <label for="newPicture">Profile Picture:</label><br>
            <input type="file" id="newPicture" accept="image/*" onchange="editUSerProfilePic('#newPicture', '#editPic')">
            
            <form id="passwordForm" class="passwordForm">
                <label for="oldPassword">Old Password:</label>
                <input type="password" id="oldPassword" name="oldPassword" required>
                
                <label for="newPassword">New Password:</label>
                <input type="password" id="newPassword" name="newPassword" required>
                
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
                <button type="submit">Change Password</button>
            </form>
        </div>    
<!--        External form buttons for ev resizing          -->
        <div style="margin-bottom: 0;">
            <button id="formSub" type="submit" form="updateUserForm" class="posButton">Save Changes</button>
            <button class="negButton" onclick="loadApplication()">Return</button>
        </div>
    </div>
    `;
    populateEditUserForm();
    setProfilePic('#editPic');

    let updateUserForm = document.querySelector('#updateUserForm');
    updateUserForm.addEventListener("submit", function (event) {
        event.preventDefault();
        updateUser(false, false ,false).then();
    });

    let enterKeyAction = document.querySelector('#updateUserForm');
    enterKeyAction.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.querySelector('#formSub').click();
        }
    });

    let passwordForm = document.querySelector('#passwordForm');
    passwordForm.addEventListener("submit", function (event) {
        event.preventDefault();
        updateUserPassword().then();
    });
}

function editUSerProfilePic(inputPic, target) {
    handleImageChange(inputPic, target);
    console.log(uploadedTempProfilePicture)
    sessionStorage.setItem("newProfilePic", "true");
}

function logout() {
    console.log("Logging out")
    loggedInUser = "Nope";
    baseFetchUrl = "Nope";
    base64credentials = "Nope";
    uploadedTempProfilePicture = "Nope";
    sessionStorage.setItem("base64credentials", "")
    sessionStorage.setItem("loggedInUser", "")
    window.open("index.html", "_self", windowSize);
}