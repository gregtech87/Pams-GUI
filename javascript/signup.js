function displaySignupPage() {
    mainDiv.innerHTML = `
 <section style="width: 400px;">
      <div id="register-page">
        <h2>Register User</h2>
        <img id="previewImage" src="../images/defaultUser.png" alt="Uploaded Image" style="width: 200px">
        <label class="file-upload stdButton">
          <input type="file" id="imageInput" accept="image/*" onchange="handleImageChange('#imageInput', '#previewImage')">
          Upload profile picture
        </label>
        <form id="register-form" class="register-form" onsubmit="registerUser(event)">
          <div class="column one">
            <label for="register-username" class="required">Username:</label>
            <input type="text" id="register-username" placeholder="Fixa validering" required>

            <label for="register-firstname" class="required">First Name:</label>
            <input type="text" id="register-firstname" required>

            <label for="register-email" class="required">Email:</label>
            <input type="email" id="register-email" placeholder="Fixa validering" required>
  
            <label for="register-address">Address:</label>
            <input type="text" id="register-address">          

            <label for="register-city">City:</label>
            <input type="text" id="register-city">
            <button type="submit" class="posButton">Register</button>
          </div>
          <div class="column two">
            <label for="register-password" class="required">Password:</label>
            <input type="password" id="register-password" minlength="8" required>

            <label for="register-lastname">Last Name:</label>
            <input type="text" id="register-lastname">
            
            <label for="register-dateOfBirth">Date of Birth:</label>
            <input type="date" id="register-dateOfBirth">
  
            <label for="register-phone-number">Phone Number:</label>
            <input type="tel" id="register-phone-number">

            <label for="register-postalCode">PostalCode:</label>
            <input type="text" id="register-postalCode">
            <div>
                    
        <button onclick="loadLoginPage()" class="negButton">Return</button>
</div>
          </div>

        </form>
      </div>
    </section>
        `;
}

function registerUser(event) {
    event.preventDefault();
    loadingGif();

    let newUser = {
        "id": "0",
        "username": document.querySelector("#register-username").value,
        "password": document.querySelector("#register-password").value,
        "firstName": document.querySelector("#register-firstname").value,
        "lastName": document.querySelector("#register-lastname").value,
        "email": document.querySelector("#register-email").value,
        "phone": document.querySelector("#register-phone-number").value,
        "dateOfBirth": document.querySelector("#register-dateOfBirth").value,
        "profilePictureData": {
            "name": uploadedTempProfilePicture.name,
            "type": uploadedTempProfilePicture.type,
            "size": uploadedTempProfilePicture.size,
            "lastModified": uploadedTempProfilePicture.lastModified,
            "lastModifiedDate": uploadedTempProfilePicture.lastModifiedDate,
        },
        "profilePic": {
            "$binary": {
                "base64": uploadedTempProfilePicture.$binary.base64
            }
        },
        "address": {
            "street": document.querySelector("#register-address").value,
            "postalCode": document.querySelector("#register-postalCode").value,
            "city": document.querySelector("#register-city").value
        },
        "role:": ""
    };
    inspectNewUser(newUser).then();
}
async function inspectNewUser(newUser) {
    console.log(JSON.stringify(newUser));
    let response;
    const url = baseFetchUrl + 'user';
    let signupUser = btoa(`newUser:newUser`)
    console.log(signupUser)
    try {
        response = await fetchDataPost(url, signupUser, newUser);
    } catch (e) {
        loadLoginPage()
        errorBox("Something went wrong! Try again later.")
    }
    console.log(response)
    if (response.verified) {
        loadLoginPage();
        alert("Please click the link in the email that has been sent to you for verification.")
        successBox(response.answer)
    } else if (!response.verifiedUsername) {
        messageBox("Username already in use!")
    } else if (!response.verifiedEmail) {
        messageBox("Email already in use!")
    }
}




function fileToBlob(dataURI, fileType) {
    // Convert base64 data URI to a binary string.
    const byteString = atob(dataURI.split(',')[1]);
    // console.log(byteString)

    // Create a Uint8Array from the binary string.
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
        // console.log(uint8Array)
    }

    // Create a Blob from the Uint8Array with dynamic MIME type and return it.
    return new Blob([uint8Array], {type: fileType});
}

