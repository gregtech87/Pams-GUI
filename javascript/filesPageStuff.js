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
            fileTableBody.innerHTML += `
                <tr>
                    <td>${file.fileName}</td>
                    <td>${usedStorage}</td>
                    <td>${file.createdAt}</td>
                    <td class="actionField">
                        <img id="downloadImg" onclick="downloadFile('${identifier}')" src="../images/download-Ico.svg" alt="Download" onmouseover="downloadImgHover(this);" onmouseout="downloadImgUnhover(this);">
                        <img id="removeImg" onclick="removeFile('${identifier}', '${id}')" src="../images/trash-can.svg" alt="Remove" onmouseover="removeImgHover(this);" onmouseout="removeImgUnhover(this);">
                    </td>
                </tr>
            `;
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

function downloadFile(identifier) {
    console.log("downloading")
    console.log(identifier)
}

function removeFile(identifier, id) {
    console.log("removing")
    console.log(id)
    console.log(identifier)
}
