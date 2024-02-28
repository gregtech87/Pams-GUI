const mainDiv = document.querySelector("#app")
const messageDiv = document.querySelector("#messageBoxes");
let windowSize = "width=" + window.innerWidth + ",height=" + window.innerHeight + ",scrollbars=no";
// let baseFetchUrl = 'https://pam-api.gregtech.duckdns.org/api/v1/';
let baseFetchUrl = 'http://localhost:8586/api/v1/';
let loggedInUser;
let base64credentials;
let uploadedTempProfilePicture = {"$binary": {}};

function handleImageChange(inputId, elementID) {
    // Resetting temp file
    uploadedTempProfilePicture = {"$binary": {}};
    // Get the file input element
    const input = document.querySelector(inputId);
    const file = input.files[0];
    // Get the image element
    let previewImage = document.querySelector(elementID);

    // Check if any files are selected
    if (file) {
        let reader = new FileReader();
        uploadedTempProfilePicture.name = file.name;
        uploadedTempProfilePicture.type = file.type;
        uploadedTempProfilePicture.size = file.size;
        uploadedTempProfilePicture.lastModified = file.lastModified;
        uploadedTempProfilePicture.lastModifiedDate = file.lastModifiedDate;

        // Read the selected image file
        reader.onload = function (e) {
            // The e.target.result contains the data URL of the image
            let imageData = e.target.result;
            // Use the 'blob' object as needed (e.g., send it to a server).
            setTempProfilePicture(imageData);
            // Update the source of the image element
            previewImage.src = imageData;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function setTempProfilePicture(imageData) {
    let commaIndex = imageData.indexOf(",", 0)
    if (imageData.length > 50) {
        uploadedTempProfilePicture.$binary.base64 = imageData.substring(commaIndex + 1);
    }
}
function loadingGif() {
    messageDiv.innerHTML += `
        <img src="../images/loadingGif.gif" alt="loading Image" id="loadingSnail" class="loadingGif">
    `;
}
