
/*******************************************************************************
 * Copyright (c) 2024. Tobias Gregorsson.
 * Github: Gregtech87
 ******************************************************************************/

async function getFiles() {
    loadingGif()
    activateSortingForTables();

    const fileTableBody = document.getElementById('fileTableBody');
    fileTableBody.innerHTML = ''; // Clear existing data

    let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    let list;

    if (user.personalFiles.length === 0) {
        // empty table ROw
        list = "empty";
    } else {
        list = user.personalFiles;
    }

    try {
        let responseFiles = await fetchDataGet(baseFetchUrl + "file/" + list, btoa("fileGuy:fileGuy"));
        let fileList = await responseFiles.json();

        fileList.forEach(file => {
            let usedStorage = prettySize(file.size);
            let id = file.id;
            let identifier = file.identifier;
            let filename = file.fileName;
            let type = file.type
            let date = new Date(file.createdAt);
            let timeString = date.getDate() + "/" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + clockStyler(date.getHours()) + ":" + clockStyler(date.getMinutes()) + ":" + clockStyler(date.getSeconds());

            if (type.startsWith("image") || type.startsWith("text") || type.endsWith("pdf")) {
                fileTableBody.innerHTML += `
                <tr>
                    <td>${file.fileName}</td>
                    <td>${usedStorage}</td>
                    <td>${timeString}</td>
                    <td class="actionField">
                        <img onclick="downloadFile('${user.username}','${identifier}','${filename}','${type}')" src="../images/download-Ico.svg" alt="Download" onmouseover="fileHover(this);" onmouseout="fileUnHover(this);">
                        <img onclick="removeFile('${identifier}', '${id}', '${filename}')" src="../images/trash-can.svg" alt="Remove" onmouseover="fileHover(this);" onmouseout="fileUnHover(this);">
                        <img onclick="downloadFile('${user.username}','${identifier}','${filename}','${type}', true)" src="../images/viewFile.svg" alt="Remove" onmouseover="fileHover(this);" onmouseout="fileUnHover(this);">
                    </td>
                </tr>
            `;
            } else {
                fileTableBody.innerHTML += `
                <tr>
                    <td>${file.fileName}</td>
                    <td>${usedStorage}</td>
                    <td>${timeString}</td>
                    <td class="actionField">
                        <img onclick="downloadFile('${user.username}','${identifier}','${filename}','${type}')" src="../images/download-Ico.svg" alt="Download" onmouseover="fileHover(this);" onmouseout="fileUnHover(this);">
                        <img onclick="removeFile('${identifier}', '${id}', '${filename}')" src="../images/trash-can.svg" alt="Remove" onmouseover="fileHover(this);" onmouseout="fileUnHover(this);">
                     </td>
                </tr>
            `;
            }
        });

        // Sort the table by the first column in ascending order
        sortTableByColumn(document.getElementById('fileTable'), 0, true);

        // Clear any previous messages
        messageDiv.innerHTML = '';
    } catch (error) {
        console.error('Error fetching files:', error);
        // Handle the error (e.g., display an error message to the user)
    }
}


async function downloadFile(username, identifier, filename, type, viewFile, listInGallery, galleryName) {
    console.log(username)
    console.log(identifier)
    console.log(filename)
    console.log(type)
    let viewBoolean = false;
    let galleryBoolean = false;
    if (viewFile !== undefined) {
        viewBoolean = viewFile;
    }
    if (listInGallery !== undefined) {
        galleryBoolean = true;
    }
    console.log(viewBoolean)
    console.log(galleryBoolean)
    console.log("pdf down")
    // let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    let url;
    if (galleryBoolean) {
        url = baseFetchUrl + 'downloadFile/' + identifier + "/" + username + "/" + galleryName;
    } else {
        url = baseFetchUrl + 'downloadFile/' + identifier + "/" + username;
    }
    let base64 = JSON.parse(sessionStorage.getItem("base64credentials"));


    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: 'Basic ' + base64
        }
    });

    const blob = await res.blob();
    const f = new File([blob], filename, {type: type});
    console.log(f);

    if (!viewBoolean && galleryBoolean) {
        console.log('return?');
        return f;
    }


    let file = window.URL.createObjectURL(f);
    console.log(file);

    if (viewBoolean) {
        console.log('viewFile')
        // window.location.assign(file);
        window.open(file);
    } else {
        const a = document.createElement('a');
        a.href = file;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
    }
}


async function removeFile(fileIdentifier, fileId, filename, itemId, itemInSessionStorage) {
    loadingGif();
    console.log("removing")
    let item = null
    if (itemId !== undefined){
        item = itemId
    }
    let json = {
        fileId: fileId,
        fileIdentifier: fileIdentifier,
        fileName: filename,
        itemId: item,
        userId: loggedInUser.id
    }
    console.log(itemId)

    let deleteResponse = await fetchDataDelete(baseFetchUrl + 'file/' + JSON.stringify(json), base64credentials)
    console.log(typeof deleteResponse);
    console.log(deleteResponse);

    console.log(sessionStorage.getItem('loggedInUser'))
    await updateUserInSessionStorage();
    console.log(sessionStorage.getItem('loggedInUser'))
    console.log()
    if (itemId === undefined){
        loadFilesPage();
    } else {
        await loadImagesToGallery(itemId, itemInSessionStorage)
    }
}


function clockStyler(number) {
    if (number < 10) {
        return "0" + number;
    } else {
        return number;
    }
}

async function handleFileUpload(inputId, itemId) {
    console.log(inputId)
    console.log(itemId)
    loadingGif()
    let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    // Get the file input element
    const input = document.querySelector(inputId);
    console.log(input)
    if (input == null) {
        messageDiv.innerHTML = ``;
        messageBox('No file selected')
    }

    // dataUrl to file stuff


    let url;
    const formData = new FormData();


    if (itemId !== undefined) {
        url = baseFetchUrl + 'uploadToGallery?username=' + user.username + '&itemId=' + itemId;
        let galleryImage = dataURLtoFile(previewTempImage, sessionStorage.getItem('previewImageName'))
        console.log(galleryImage)
        formData.append("file", galleryImage, galleryImage.name);
    } else {
        url = baseFetchUrl + 'uploadFile?username=' + user.username;
        formData.append("file", input.files[0], input.files[0].name);
    }

    console.log(url)


    let cred = btoa(`fileGuy:fileGuy`)

    await fetchDataPostFiles(url, cred, formData)
    const postResult = JSON.parse(sessionStorage.getItem("uploadResponse"));
    console.log(postResult)


    // fileAlreadyExists: true
    // fileName: "ChromeSetup(3).exe"
    // identifier: null
    // size : 1369128
    // storageLimitExceed:false
    // userNamePresent:true
    // maxFileSize
    if (postResult.fileSizeExceed) {
        messageBox('File to large! Max size: ' + postResult.maxFileSize + "MB")
    }
    if (postResult.storageLimitExceed) {
        messageBox('Not enough storage space!')
    }
    if (postResult.fileAlreadyExists) {
        messageBox('Filename already exists in storage!')
    }
// **********************************************
    if (itemId === undefined && !postResult.storageLimitExceed && !postResult.fileSizeExceed && !postResult.fileAlreadyExists) {
        // Update stored user.
        // const response = await fetchDataGet(baseFetchUrl + 'user/' + user.id, btoa("editUser:editUser"));
        // let user2 = await response.json();
        // console.log(user2);
        // sessionStorage.setItem("loggedInUser", JSON.stringify(user2));
        console.log('que')
        await updateUserInSessionStorage();
        loadFilesPage();
    }

    sessionStorage.setItem("newProfilePic", "false");
    previewTempImage = null;

    if (itemId !== undefined && !postResult.storageLimitExceed && !postResult.fileSizeExceed && !postResult.fileAlreadyExists) {
        await updateUserInSessionStorage();
        await loadImagesToGallery(itemId);
    }

}

