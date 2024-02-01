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
        <form id="register-form" class="register-form">
          <div class="column one">
            <label for="register-username" class="required">Username:</label>
            <input type="text" id="register-username" required>

            <label for="firstname">First Name:</label>
            <input type="text" id="firstname">

            <label for="email" class="required">Email:</label>
            <input type="email" id="email" required>
  
            <label for="address">Address:</label>
            <input type="text" id="address">          

            <label for="city">City:</label>
            <input type="text" id="city">
          </div>
          <div class="column two">
            <label for="register-password" class="required">Password:</label>
            <input type="password" id="register-password" required>

            <label for="lastname">Last Name:</label>
            <input type="text" id="lastname">
  
            <label for="phone-number">Phone Number:</label>
            <input type="tel" id="phone-number">

            <label for="postalCode">PostalCode:</label>
            <input type="text" id="postalCode">
          </div>
        <button type="submit" class="posButton">Register</button>
        <button onclick="loadLoginPage()" class="negButton">Return</button>
        </form>
      </div>
    </section>

        `;
    loadSignupButtons();
}


function loadSignupButtons() {
    const registerForm = document.getElementById("register-form");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        // Implement registration logic here (store user data, etc.)
        alert("Registration functionality not implemented in this example.");
    });
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
            setTempProfilePicture(dataURItoBlob(imageData, file.type));

            // Update the source of the image element
            previewImage.src = imageData;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function setTempProfilePicture(pic) {
  uploadedTempProfilePicture = pic
  console.log(pic)
  console.log(uploadedTempProfilePicture)
}
function dataURItoBlob(dataURI, fileType) {
  // Convert base64 data URI to a binary string.
  const byteString = atob(dataURI.split(',')[1]);

  // Create a Uint8Array from the binary string.
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  // Create a Blob from the Uint8Array with dynamic MIME type.
  const blob = new Blob([uint8Array], { type: fileType });

  return blob;
}