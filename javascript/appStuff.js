function setProfilePic(elementId) {
    const imageElement = document.querySelector(elementId);
    // console.log(loggedInUser.profilePic.substring(0,100))
    // console.log(loggedInUser.profilePic.length)
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
    sessionStorage.setItem("uploadResponse", "")
    sessionStorage.setItem("latLong", "")
    window.open("index.html", "_self", windowSize);
}

function prettySize(size) {
    let usedStorage;
    let used = size;
    // user.usedStorage in bytes.
    // 1KB = 1024byte.
    // 1MB = 1048576 byte.
    //
    if (used < 1024) {
        usedStorage = used.toFixed(2)+" Byte"
    }
    if (used > 1024 && used < 1048576) {
        let s = used/1024
        usedStorage = s.toFixed(2) + " KB"
    }
    if (used > 1048576) {
        let s = used/1048576
        usedStorage = s.toFixed(2) + " MB"
    }
    return usedStorage;
}

function downloadImgHover(element) {
    element.style.width = '28px';
}

function downloadImgUnhover(element) {
    element.style.width = '25px';
}
function removeImgHover(element) {
    element.style.width = '28px';
}

function removeImgUnhover(element) {
    element.style.width = '25px';
}