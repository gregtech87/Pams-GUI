function loadFilesPage() {
    let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    let usedStorage = prettySize(user.usedStorage);



    messageDiv.innerHTML = ``;
    let contentDiv = document.querySelector("#mainContent");
    contentDiv.innerHTML = `
        <h2>Personal files</h2>
        <div style="max-width: fit-content">
            <div class="fileStorageMeter">
            <div>
                <label class="file-upload posButton">
                <input type="file" id="fileInput" onchange="handleFileUpload('#fileInput')">
                Upload file
                </label>
            </div>
            <div >
                <p><b>Storage space used: </b>${usedStorage} <b>Total: </b>${user.mbOfStorage + " MB"}</p>
            </div>
            </div>
            <section>
            <table id="fileTable" class="table-sortable">
                <thead>
                    <tr>
                        <th>File name</th>
                        <th>Size</th>
                        <th>added</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="fileTableBody">
                     <!-- Content will be loaded dynamically here -->
                </tbody>
            </table>
        </section>
        </div>
            `;

    getFiles().then();
}
