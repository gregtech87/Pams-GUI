function populateEditUserForm() {
    const updateUserForm = document.getElementById('updateUserForm');
    const inputField1 = updateUserForm.querySelector(`[name="firstName"]`);
    const inputField2 = updateUserForm.querySelector(`[name="lastName"]`);
    const inputField3 = updateUserForm.querySelector(`[name="username"]`);
    const inputField5 = updateUserForm.querySelector(`[name="email"]`);
    const inputField6 = updateUserForm.querySelector(`[name="phone"]`);
    const inputField7 = updateUserForm.querySelector(`[name="dob"]`);
    const inputField8 = updateUserForm.querySelector(`[name="address"]`);
    const inputField9 = updateUserForm.querySelector(`[name="addressNumber"]`);
    const inputField10 = updateUserForm.querySelector(`[name="postalCode"]`);
    const inputField11 = updateUserForm.querySelector(`[name="city"]`);
    inputField1.value = loggedInUser.firstName;
    inputField2.value = loggedInUser.lastName;
    inputField3.value = loggedInUser.username;
    inputField5.value = loggedInUser.email;
    inputField6.value = loggedInUser.phone;
    inputField7.value = loggedInUser.dateOfBirth;
    inputField8.value = loggedInUser.address.street;
    inputField9.value = loggedInUser.address.streetNumber;
    inputField10.value = loggedInUser.address.postalCode;
    inputField11.value = loggedInUser.address.city;
    document.querySelector("#customLocation").checked = !!loggedInUser.customLocation;
}

async function updateUser(userLocationBoolean, noteBoolean, itemLocationBoolean) {
    loadingGif()
    let newProfilePic = JSON.parse(sessionStorage.getItem("newProfilePic"));
    loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    console.log(loggedInUser)
    let editedLoggedInUser;
    if (!userLocationBoolean && !noteBoolean && !itemLocationBoolean){
        editedLoggedInUser = {"address": {}, "profilePictureData": {}};
        editedLoggedInUser.id = loggedInUser.id;
        editedLoggedInUser.username = document.querySelector("#update-username").value;
        editedLoggedInUser.password = "Dummydata";
        editedLoggedInUser.firstName = document.querySelector("#update-firstName").value;
        editedLoggedInUser.lastName = document.querySelector("#update-lastName").value;
        editedLoggedInUser.email = document.querySelector("#update-email").value;
        editedLoggedInUser.phone = document.querySelector("#update-phone").value;
        editedLoggedInUser.address.street = document.querySelector("#update-address").value;
        editedLoggedInUser.address.streetNumber = document.querySelector("#update-addressNumber").value;
        editedLoggedInUser.address.postalCode = document.querySelector("#update-postalCode").value;
        editedLoggedInUser.address.city = document.querySelector("#update-city").value;
        editedLoggedInUser.customLocation = document.querySelector("#customLocation").checked
        editedLoggedInUser.dateOfBirth = document.querySelector("#update-dob").value;
        editedLoggedInUser.notes = loggedInUser.notes;
        editedLoggedInUser.role = loggedInUser.role;
        editedLoggedInUser.enabled = loggedInUser.enabled;
        editedLoggedInUser.locked = loggedInUser.locked;
        editedLoggedInUser.confirmationToken = loggedInUser.confirmationToken;
    }
    if (userLocationBoolean){
        editedLoggedInUser = loggedInUser;
        editedLoggedInUser.customLocation = true;
        delete editedLoggedInUser.authorities;
    }
    if (itemLocationBoolean){
        editedLoggedInUser = loggedInUser;
        delete editedLoggedInUser.authorities;
    }
    if (newProfilePic) {
        editedLoggedInUser.profilePic = {"$binary": {"base64": uploadedTempProfilePicture.$binary.base64}};
        editedLoggedInUser.profilePictureData.name = uploadedTempProfilePicture.name;
        editedLoggedInUser.profilePictureData.type = uploadedTempProfilePicture.type;
        editedLoggedInUser.profilePictureData.size = uploadedTempProfilePicture.size;
        editedLoggedInUser.profilePictureData.lastModified = uploadedTempProfilePicture.lastModified;
        editedLoggedInUser.profilePictureData.lastModifiedDate = uploadedTempProfilePicture.lastModifiedDate;
    } else {
        editedLoggedInUser.profilePic = {"$binary": {"base64": loggedInUser.profilePic}};
        editedLoggedInUser.profilePictureData.name = loggedInUser.profilePictureData.name;
        editedLoggedInUser.profilePictureData.type = loggedInUser.profilePictureData.type;
        editedLoggedInUser.profilePictureData.size = loggedInUser.profilePictureData.size;
        editedLoggedInUser.profilePictureData.lastModified = loggedInUser.profilePictureData.lastModified;
        editedLoggedInUser.profilePictureData.lastModifiedDate = loggedInUser.profilePictureData.lastModifiedDate;
    }
    console.log(editedLoggedInUser.notes)
    console.log("edited: ")
    console.log(editedLoggedInUser)
    let response;
    const url = baseFetchUrl + 'user';
    let cred = btoa(`editUser:editUser`)
    try{
        response = await fetchDataPut(url, cred, editedLoggedInUser)
    }catch (e){
        errorBox("Something went wrong! Try again later.")
    }


    console.log(response)
    if (!response.found) {
        errorBox(response.answer)
    } else if (response.verified) {
        let response;

        const url = baseFetchUrl + 'user/' + editedLoggedInUser.id;
        let cred = btoa(`editUser:editUser`)
        try{
            response = await fetchDataGet(url, cred)
            let user = await response.json();
            sessionStorage.setItem("loggedInUser", JSON.stringify(user));
        }catch (e){
            errorBox("Something went wrong! Try again later.")
        }
        successBox("User updated successfully!")
    } else if (!response.verifiedUsername) {
        messageBox("Username already in use!")
    } else if (!response.verifiedEmail) {
        messageBox("Email already in use!")

    }
    console.log(editedLoggedInUser)
}

async function updateUserPassword() {
    let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    let oldPassword = document.querySelector("#oldPassword").value
    let password1 = document.querySelector("#newPassword").value
    let password2 = document.querySelector("#confirmPassword").value
    let sendingString = user.id + ":" + oldPassword + ":" + password1
    console.log(user)
    console.log(oldPassword)
    console.log(password1)
    console.log(password2)

    if (password1 === password2) {



        let response;
        const url = baseFetchUrl + 'userPassword';
        let signupUser = btoa(`editUser:editUser`)
        try {
            response = await fetchDataPost(url, signupUser, sendingString);
            if (await response){
                successBox("Password updated successfully!")
            } else {
                errorBox("Password NOT updated successfully for some reason!")
            }
        } catch (e) {
            errorBox("Something went wrong! Try again later.")
        }
    } else {
        messageBox("Passwords not matching!")
    }
}