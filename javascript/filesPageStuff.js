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
            let id =file.id;
            let identifier =file.identifier;
            let filename = file.fileName;
            let type = file.type
            console.log(type)
            let date = new Date(file.createdAt);
            let timeString = date.getDate() + "/" + (date.getMonth()+1) + "-" + date.getFullYear() + " " + clockStyler(date.getHours()) + ":" + clockStyler(date.getMinutes()) + ":" + clockStyler(date.getSeconds());

            if (type.startsWith("image") || type.startsWith("text") || type.endsWith("pdf")) {
                fileTableBody.innerHTML += `
                <tr>
                    <td>${file.fileName}</td>
                    <td>${usedStorage}</td>
                    <td>${timeString}</td>
                    <td class="actionField">
                        <img onclick="downloadFile('${user.username}','${identifier}','${filename}','${type}')" src="../images/download-Ico.svg" alt="Download" onmouseover="downloadImgHover(this);" onmouseout="downloadImgUnhover(this);">
                        <img onclick="removeFile('${identifier}', '${id}', '${filename}')" src="../images/trash-can.svg" alt="Remove" onmouseover="removeImgHover(this);" onmouseout="removeImgUnhover(this);">
                        <img onclick="downloadFile('${user.username}','${identifier}','${filename}','${type}', true)" src="../images/viewFile.svg" alt="Remove" onmouseover="removeImgHover(this);" onmouseout="removeImgUnhover(this);">
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
                        <img onclick="downloadFile('${user.username}','${identifier}','${filename}','${type}')" src="../images/download-Ico.svg" alt="Download" onmouseover="downloadImgHover(this);" onmouseout="downloadImgUnhover(this);">
                        <img onclick="removeFile('${identifier}', '${id}', '${filename}')" src="../images/trash-can.svg" alt="Remove" onmouseover="removeImgHover(this);" onmouseout="removeImgUnhover(this);">
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

async function removeFile(fileIdentifier, fileId, filename) {
    loadingGif();
    console.log("removing")
    let json = {
        fileId: fileId,
        fileIdentifier: fileIdentifier,
        fileName: filename,
        userId: loggedInUser.id
    }

    let deleteResponse = await fetchDataDelete(baseFetchUrl + 'file/'+JSON.stringify(json), base64credentials)
    console.log(typeof deleteResponse);
    console.log(deleteResponse);

    let userResponse;
    const url = baseFetchUrl + 'user/' + loggedInUser.id;
    let cred = btoa(`editUser:editUser`)
    try {
        userResponse = await fetchDataGet(url, cred)
        let user = await userResponse.json();
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    } catch (e) {
        errorBox("Something went wrong! Try again later.")
    }

    loadFilesPage();
}


function clockStyler(number) {
    if (number < 10){
        return "0"+number;
    } else {
        return number;
    }

}

async function handleFileUpload(inputId) {
    loadingGif()
    let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    // Get the file input element
    const input = document.querySelector(inputId);
    const formData = new FormData();
    formData.append("file", input.files[0], input.files[0].name);

    const url = baseFetchUrl + 'uploadFile?username=' + user.username;
    let cred = btoa(`fileGuy:fileGuy`)

    await fetchDataPostFiles(url, cred, formData)
    const postResult = JSON.parse(sessionStorage.getItem("uploadResponse"));
    console.log(postResult)

    const url2 = baseFetchUrl + 'user/' + user.id;
    const response = await fetchDataGet(url2, btoa("editUser:editUser"));
    console.log(response)
    let user2 = await response.json();
    console.log(user2);
    sessionStorage.setItem("loggedInUser", JSON.stringify(user2));

    loadFilesPage();
}

