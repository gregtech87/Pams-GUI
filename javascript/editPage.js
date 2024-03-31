
function displayProfileEdit() {
    let contentDiv = document.querySelector("#mainContent");
    sessionStorage.setItem("newProfilePic", "false");
    contentDiv.innerHTML = `
    <h2>Edit Profile</h2>
    <div class="editPage editBorder" style="margin-bottom: 0">
        <div class="editUserForm" style="margin-bottom: 0">
            <form id="updateUserForm">
                <label for="firstName">First Name:</label>
                <input type="text" id="update-firstName" name="firstName" required>
        
                <label for="lastName">Last Name:</label>
                <input type="text" id="update-lastName" name="lastName">
                
                <label for="username">Username:</label>
                <input type="text" id="update-username" name="username" required>
                
                <label for="email">Email:</label>
                <input type="email" id="update-email" name="email" required>
                
                <label for="phone">Phone:</label>
                <input type="tel" id="update-phone" name="phone">
        
                <label for="dob">Date of Birth:</label>
                <input type="date" id="update-dob" name="dob">
        
                <div style="width: 94%">
                    <div style="display: flex; justify-content: space-between">
                        <label for="address">Address:</label>
                        <div>
                            <label for="customLocation">Custom coordinates:</label>
                            <input type="checkbox" id="customLocation" name="customLocation" style="width: fit-content">
                        </div>
                    </div>
                    <div style="display: flex">
                        <input type="text" id="update-address" name="address" placeholder="Street">
                        <input type="number" id="update-addressNumber" name="addressNumber" placeholder="Number" style="width: 50%">                
                    </div>
                </div>
        
                <label for="postalCode">Postal Code:</label>
                <input type="text" id="update-postalCode" name="postalCode">
        
                <label for="city">City:</label>
                <input type="text" id="update-city" name="city">
        
                <!--                <div style="margin-bottom: 0">-->
                <!--                    <button type="submit" class="posButton">Save Changes</button>-->
                <!--                    <button class="negButton" onclick="loadApplication()">Return</button>-->
                <!--                </div>-->
            </form>
        </div>
        <div class="editUserPic" style="margin-bottom: 0">
            <img id="editPic" src="../images/defaultUser.png" alt="Profile picture"><br>
            <label for="newPicture" class="pic-upload stdButton">
            <input type="file" id="newPicture" accept="image/*" onchange="handleImageChange('#newPicture', '#editPic')">
            Change profile picture</label>
            <form id="passwordForm" class="passwordForm">
                <label for="oldPassword">Old Password:</label>
                <input type="password" id="oldPassword" name="oldPassword" required>
                
                <label for="newPassword">New Password:</label>
                <input type="password" id="newPassword" name="newPassword" required>
                
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
                <button type="submit" class="stdButton">Change Password</button>
            </form>
        </div>    
        <!--        External form buttons for ev resizing          -->
        <div style="margin-bottom: 0;">
            <button id="formSub" type="submit" form="updateUserForm" class="posButton">Save Changes</button>
            <button class="negButton" onclick="loadApplication()">Return</button>
        </div>
        </div>
        <div style="display: flex">
            <button id="userPdfBtn" class="stdButton">Generate user info pdf</button>
            <p><b style="color: black"> Pdf Present: </b></p>
            <img id="userPdfBox" src="../images/checkBoxNegative.svg" alt="No Pdf present" style="width: 20px; margin:0 5px 0 5px">
            <p><b style="color: black"> Created at: </b><span id="pdfAge" style="color: black">Not yet.</span></p>
            <img class="downloadPdfBtn" id="downloadPdf" src="../images/download-Ico.svg" alt="Download" onmouseover="fileHover(this);" onmouseout="fileUnHover(this);">
            <img class="downloadPdfBtn" id="viewPdf" src="../images/viewFile.svg" alt="Download" onmouseover="fileHover(this);" onmouseout="fileUnHover(this);">
        </div>
        <div id="pdfDiv" style="visibility: hidden">New Pdf generated!</div>
        <div id="noPdfDiv" style="visibility: hidden">Could not generate Pdf, try again later!</div>
    `;
    populateEditUserForm();

    let downloadPdf = document.querySelector('#downloadPdf');
    downloadPdf.addEventListener("click", function (event) {
        event.preventDefault();
        downloadFile(loggedInUser.username, loggedInUser.pdfUser.userInfoPdfIdentifier, loggedInUser.pdfUser.name, 'application/pdf');
    });
    let viewPdf = document.querySelector('#viewPdf');
    viewPdf.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(loggedInUser)
        console.log(loggedInUser.pdfUser.userInfoPdfIdentifier)
        downloadFile(loggedInUser.username, loggedInUser.pdfUser.userInfoPdfIdentifier, loggedInUser.pdfUser.name, 'application/pdf', true).then();
    });

    let updateUserForm = document.querySelector('#updateUserForm');
    updateUserForm.addEventListener("submit", function (event) {
        event.preventDefault();
        updateUser(false, false ,false).then();
    });

    let enterKeyAction = document.querySelector('#updateUserForm');
    enterKeyAction.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.querySelector('#formSub').click();
        }
    });

    let passwordForm = document.querySelector('#passwordForm');
    passwordForm.addEventListener("submit", function (event) {
        event.preventDefault();
        updateUserPassword().then();
    });

    let userPdfBtn = document.querySelector('#userPdfBtn');
    userPdfBtn.addEventListener("click", function () {
        generateUserPdf().then();
        displayProfileEdit();
    });
}

