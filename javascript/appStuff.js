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