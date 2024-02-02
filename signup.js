// import {ObjectId} from "mongodb";



// import {ObjectId} from "mongodb";

function displaySignupPage() {
    mainDiv.innerHTML = `
 <section style="width: 400px; margin: auto">
      <div id="register-page">
        <h2>Register User</h2>
        <img id="previewImage" src="/images/defaultUser.jpg" alt="Uploaded Image" style="width: 200px">
        <label class="file-upload stdButton">
          <input type="file" id="imageInput" accept="image/*" onchange="handleImageChange()">
          Upload profile picture
        </label>
        <form id="register-form" class="register-form" onsubmit="registerUser()">
          <div class="column one">
            <label for="register-username" class="required">Username:</label>
            <input type="text" id="register-username" required>

            <label for="register-firstname">First Name:</label>
            <input type="text" id="register-firstname">

            <label for="register-email" class="required">Email:</label>
            <input type="email" id="register-email" required>
  
            <label for="register-address">Address:</label>
            <input type="text" id="register-address">          

            <label for="register-city">City:</label>
            <input type="text" id="register-city">
          </div>
          <div class="column two">
            <label for="register-password" class="required">Password:</label>
            <input type="password" id="register-password" required>

            <label for="register-lastname">Last Name:</label>
            <input type="text" id="register-lastname">
  
            <label for="register-phone-number">Phone Number:</label>
            <input type="tel" id="register-phone-number">

            <label for="register-postalCode">PostalCode:</label>
            <input type="text" id="register-postalCode">
          </div>
        <button type="submit" class="posButton">Register</button>
        <button onclick="loadLoginPage()" class="negButton">Return</button>
        </form>
      </div>
    </section>
        `;
}

function registerUser() {
        loadingGif();

    let newUser = {
        "id": "0",
        "customerId": 2,
        "username": "sssssssssssssssssssssss",
        "password": "{noop}jerry",
        "firstName": "Jerry",
        "lastName": "Persson",
        "email": "jerry@cat.se",
        "phone": "0766654665",
        "dateOfBirth": "1948-01-06",
        "address": {
            "street": "Haspelvägen 3",
            "postalCode": 87445,
            "city": "Växsjö"
        },
        "roles": [
            {
                "id": "0",
                "role": "ROLE_ADMIN"
            },
            {
                "id": "0",
                "role": "ROLE_USER"
            }
        ]
    };
    const url = 'http://localhost:8586/api/v1/users';
    let signupUser = btoa(`${"newUser"}:${"newUser"}`)
    fetchDataPost(url, signupUser, newUser).then(r => {

        loadLoginPage();
    });
    // alert(JSON.stringify(newUser));

}

let uploadedTempProfilePicture;
function handleImageChange() {
    // Get the file input element
    const input = document.getElementById('imageInput');
    const file = input.files[0];
    // Get the image element
    let previewImage = document.getElementById('previewImage');

    // Check if any files are selected
    if (file) {
        let reader = new FileReader();

        // Read the selected image file
        reader.onload = function (e) {
            // The e.target.result contains the data URL of the image
            let imageData = e.target.result;

            // Use the 'blob' object as needed (e.g., send it to a server).
            setTempProfilePicture(fileToBlob(imageData, file.type));

            // Update the source of the image element
            previewImage.src = imageData;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function fileToBlob(dataURI, fileType) {
  // Convert base64 data URI to a binary string.
  const byteString = atob(dataURI.split(',')[1]);

  // Create a Uint8Array from the binary string.
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  // Create a Blob from the Uint8Array with dynamic MIME type and return it.
    return new Blob([uint8Array], {type: fileType});
}

function setTempProfilePicture(pic) {
    uploadedTempProfilePicture = pic
}