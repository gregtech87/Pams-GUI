async function handlefile(inputId) {
    console.log("FiLeOrama")

    let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    // Get the file input element
    const input = document.querySelector(inputId);
    const file = input.files[0];

    console.log(file)

    const formData = new FormData();
    formData.append("file", input.files[0], null);

    let response;
    const url = baseFetchUrl + 'uploadFile?username=' + user.username;
    let cred = btoa(`fileGuy:fileGuy`)
    try {
        response = await fetchDataPostFiles(url, cred, formData)
        console.log(response)
        let data = response.json()
        console.log(data)
    } catch (e) {
        errorBox("Something went wrong! Try again later.")
    }

    // Check if any files are selected
    // if (file) {
    //     let reader = new FileReader();
    //     uploadedTempProfilePicture.name = file.name;
    //     uploadedTempProfilePicture.type = file.type;
    //     uploadedTempProfilePicture.size = file.size;
    //     uploadedTempProfilePicture.lastModified = file.lastModified;
    //     uploadedTempProfilePicture.lastModifiedDate = file.lastModifiedDate;
    //
    //     // Read the selected image file
    //     reader.onload = function (e) {
    //         // The e.target.result contains the data URL of the image
    //         let imageData = e.target.result;
    //         // Use the 'blob' object as needed (e.g., send it to a server).
    //         setTempProfilePicture(imageData);
    //         // Update the source of the image element
    //         previewImage.src = imageData;
    //     };
    //     reader.readAsDataURL(input.files[0]);
    // }
}