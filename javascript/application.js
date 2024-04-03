

/*******************************************************************************
 * Copyright (c) 2024. Tobias Gregorsson.
 * Github: Gregtech87
 ******************************************************************************/

function loadParameters() {
    loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    base64credentials = JSON.parse(sessionStorage.getItem("base64credentials"));
}


function loadApplication() {
    loadParameters();
    // console.log(loggedInUser)
    // console.log(base64credentials)
    let body = document.querySelector("body");
    body.classList.remove("body-login-register")

    messageDiv.innerHTML = ``;
    mainDiv.innerHTML = `

<div class="wrapper">
    <div class="sidebar">
    <img src="../images/liten%20logga.svg" alt="pam">
        <h2>Personal Asset Management</h2>
        <img id="profilePic" src="../images/defaultUser.png" alt="Profile picture"><br>
        <p><strong style="color: #85d6e9">User:</strong> ${loggedInUser.username}</p>
        <ul>
            <li><a href="#" onclick="loadApplication()"><i class="fas fa-home"></i>Home</a></li>
            <li><a href="#" onclick="displayProfileEdit()"><i class="fas fa-user"></i>Profile</a></li>
            <li><a href="#" onclick="loadMapPage(true, false, false, undefined)"><i class="fas fa-map-pin"></i>Map</a></li>
            <li><a href="#" onclick="loadAssetPage()"><i class="fas fa-project-diagram"></i>Assets</a></li>
            <li><a href="#" onclick="loadFilesPage()"><img src="../images/files.svg" class="sideBarBtn" alt="Logout symbol">Files</a></li>
            <li><a href="#" onclick="loadNotesPage()"><img src="../images/notes.svg" class="sideBarBtn" alt="Logout symbol">Notes</a></li>
<!--            <li><a href="#" onclick="loadFilesPage()"><img src="../images/files1.svg" class="sideBarBtn" alt="Logout symbol">Files</a></li>-->
<!--            <li><a href="#" onclick="loadFilesPage()"><img src="../images/files3.svg" class="sideBarBtn" alt="Logout symbol">Files</a></li>-->
<!--            <li><a href="#"><i class="fas fa-address-card"></i>About</a></li>-->
<!--            <li><a href="#"><i class="fas fa-address-book"></i>Contact</a></li>-->
            <li><a href="#" onclick="logout()"><img src="../images/right-from-bracket-solid.svg" class="sideBarBtn" alt="Logout symbol"></i>Logout</a></li>
        </ul> 
        <div class="social_media">
<!--            <a href="#"><i class="fab fa-facebook-f"></i></a>-->
            <a href="https://github.com/gregtech87"><img src="../images/github.svg" alt="Gihub" class="sideBarBtn" style="padding-right: 0"></img></a>
            <a href="https://www.linkedin.com/in/tobias-gregorsson-04b32a250/"><img src="../images/linkedin.svg" alt="Gihub"  class="sideBarBtn" style="padding-right: 0"></img></a>
        </div>
    </div>
    <div class="main_content">
        <div id="top" class="header">Welcome ${loggedInUser.firstName}!! Have a nice day.</div>  
        <div id="mainContent" class="info">
            <section style="margin-bottom: 20px; width: fit-content">
                <h3>Welcome to PAM: Personal Asset Manager Your Personal Asset Management Solution!</h3>
                <pre>
PAM is a comprehensive web application designed to help you organize and document your prized possessions. 
Whether it's tracking acquisitions, documenting warranties, or monitoring their status, PAM has you covered.

<b>Key Features:</b>
    1. User Authentication and Profile Management
        ◦ Secure login system with email verification.
        ◦ * Password recovery via email. 
        ◦ Profile picture upload capability.
    2. Item Information and Documentation
        ◦ Record details of your possessions including purchase date, location, and price.
        ◦ * Track warranty information for each item. *coming soon.
        ◦ Upload and manage images for visual representation.
        ◦ * Monitor item status such as loans or damages, with logging for historical tracking.
    3. User-Friendly Interface
        ◦ Intuitive and easy-to-use interface for efficient management.
        ◦ Option for dark mode and customizable themes.
        ◦ Quick access actions for common tasks.
    4. Sorting and Listing Options *coming soon, mayby.
        ◦ Various sorting and listing options based on criteria like date, category, or status.
    5. ** Data Export
        ◦ Export your data in different formats locally or via email, including JSON for flexibility.
        ◦ * Option for detailed reports on item history.
    6. Map Integration
        ◦ Interactive map showcasing your home address and locations of your possessions.
    7. Technical Architecture
        ◦ Robust backend using Spring Boot with Maven, and MongoDB as the primary database solution.
        ◦ Other files stored localy on the server.
        ◦ Responsive frontend developed with JavaScript, HTML, and CSS.
        ◦ *** Secure infrastructure with encryption for user data protection.
        
    * Coming soon.
    * Mail under construction.
    *** Passwords so far.

<b>Customer Details:</b>
    • Profile Picture
    • First Name
    • Last Name
    • Mobile Number
    • Email
    • GPS Coordinates (optional)
    • Address (optional)
    
<b>Item Details:</b>
    • Title
    • Image
    • Brand
    • Model
    • Category
    • Purchase Date
    • Price
    • Purchase Location
    • Dimensions
    • Description
    • Condition
    • Warranty
    • Age
    • Accessories
    • Status (e.g., loaned, borrower, purpose)

<b>Additional Item Description Guidelines:</b>
When describing an item, consider including these details for a comprehensive overview:
    • Name
    • Description
    • Brand and Model
    • Condition
    • Size and Dimensions
    • Age
    • History
    • Features and Specifications
    • Accessories
    • Storage and Maintenance Instructions
    • Insurance Information
    • Intended Use
    • Valuation
    • Certifications (if applicable)
    
With PAM, managing your personal assets has never been easier! Start organizing today.
                </pre>
            </section>
        </div>
    </div>    
</div>
    `;
    setProfilePic('#profilePic', loggedInUser);
}

