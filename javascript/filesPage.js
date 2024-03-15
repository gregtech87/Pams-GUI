function loadFilesPage() {

    let contentDiv = document.querySelector("#mainContent");
    contentDiv.innerHTML = `
            <h2>Files</h2>
                    <label class="file-upload posButton">
          <input type="file" id="fileInput" onchange="handlefile('#fileInput')">
          Upload profile picture
        </label>
            <table id="fileTable" class="table-sortable">
                <thead>
                    <tr>
                        <th>File name</th>
                        <th>stuff</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="fileTableBody">
                     <!-- Content will be loaded dynamically here -->
                </tbody>
            </table>
            `;


}
 function getFiles() {
     // loadingGif()
     activateSortingForTables();

     const fileTableBody = document.getElementById('fileTableBody');









     sortTableByColumn(document.getElementById('fileTable'), 0, true);
 }