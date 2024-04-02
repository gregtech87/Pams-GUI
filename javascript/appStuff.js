
/*******************************************************************************
 * Copyright (c) 2024. Tobias Gregorsson.
 * Github: Gregtech87
 ******************************************************************************/

function setProfilePic(elementId, origin) {
    console.log(origin)
    const imageElement = document.querySelector(elementId);
    // console.log(loggedInUser.profilePic.substring(0,100))
    // console.log(loggedInUser.profilePic.length)
    if (origin.profilePic.length > 100) {
        // Convert base64 data URI to a binary string.
        const byteString = atob(origin.profilePic);
        // Create a Uint8Array from the binary string.
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }
        // Create a Blob from the Uint8Array with dynamic MIME type.
        let pic = new File([uint8Array], origin.profilePictureData.name, {type: origin.profilePictureData.type,});
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

// async function updateUserInSessionStorage() {
//     console.log('uppdatting')
//     let userResponse;
//     const url = baseFetchUrl + 'user/' + loggedInUser.id;
//     let cred = btoa(`editUser:editUser`)
//     try {
//         userResponse = await fetchDataGet(url, cred)
//         let user = await userResponse.json();
//         sessionStorage.setItem("loggedInUser", JSON.stringify(user));
//         loggedInUser = user;
//     } catch (e) {
//         errorBox("Something went wrong! Try again later.")
//     }
//
// }

async function updateUserInSessionStorage() {
    console.log('updating');
    let userResponse;
    const url = baseFetchUrl + 'user/' + loggedInUser.id;
    let cred = btoa(`editUser:editUser`);
    try {
        userResponse = await fetchDataGet(url, cred);
        let user = await userResponse.json();
        console.log('Fetched user:', user); // Debugging: Log fetched user
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
        console.log('Updated sessionStorage:', sessionStorage.getItem('loggedInUser')); // Debugging: Log updated sessionStorage
        loggedInUser = user; // Update the global loggedInUser variable
    } catch (e) {
        errorBox("Something went wrong! Try again later.");
    }
}



function dataURLtoFile(dataUrl, filename) {
    let dataArray = dataUrl.split(","),
        mime = dataArray[0].match(/:(.*?);/)[1],
        binaryString = atob(dataArray[dataArray.length - 1]),
        n = binaryString.length,
        u8Array = new Uint8Array(n);
    while (n--) {
        u8Array[n] = binaryString.charCodeAt(n);
    }
    return new File([u8Array], filename, { type: mime });
}

function logout() {
    console.log("Logging out")
    loggedInUser = "Nope";
    baseFetchUrl = "Nope";
    base64credentials = "Nope";
    uploadedTempProfilePicture = "Nope";
    // sessionStorage.setItem("base64credentials", "")
    // sessionStorage.setItem("loggedInUser", "")
    // sessionStorage.setItem("uploadResponse", "")
    // sessionStorage.setItem("latLong", "")
    sessionStorage.clear()
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
        usedStorage = used + " Byte"
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

function fileHover(element) {
    element.style.width = '28px';
}

function fileUnHover(element) {
    element.style.width = '25px';
}
function removeImgHover(element) {
    element.style.width = '23px';
}

function removeImgUnHover(element) {
    element.style.width = '20px';
}

function toggleReadOnly(elementId) {
    console.log("toggling")
    let form = document.querySelector(elementId);
    let elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].type !== "button") { // Exclude buttons from being toggled
            if (elements[i].hasAttribute("readonly")) {
                elements[i].removeAttribute("readonly");
            } else {
                elements[i].setAttribute("readonly", "readonly");
            }
        }
    }
}

function loopThroughForm(elementId) {
    let form = document.querySelector(elementId);
    let elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
        console.log("Element name: " + elements[i].id);
        console.log("Element value: " + elements[i].value);
    }
}