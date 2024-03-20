
function loadParameters() {
    loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    base64credentials = JSON.parse(sessionStorage.getItem("base64credentials"));
}


function loadApplication() {
    loadParameters();
    console.log(loggedInUser)
    console.log(base64credentials)
    let body = document.querySelector("body");
    body.classList.remove("body-login-register")

    messageDiv.innerHTML = ``;
    mainDiv.innerHTML = `

<div class="wrapper">
    <div class="sidebar">
    <img src="../images/liten%20logga.svg" alt="pam">
        <h2>Personal Asset Management</h2>
        <img id="profilePic" src="../images/defaultUser.png" alt="Profile picture" style="width: 60%; max-height: 200px"><br>
        <p><strong style="color: #85d6e9">User:</strong> ${loggedInUser.username}</p>
        <ul>
            <li><a href="#" onclick="loadApplication()"><i class="fas fa-home"></i>Home</a></li>
            <li><a href="#" onclick="displayProfileEdit()"><i class="fas fa-user"></i>Profile</a></li>
            <li><a href="#" onclick="loadMapPage(true, false)"><i class="fas fa-map-pin"></i>Map</a></li>
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
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
    </div>
    <div class="main_content">
        <div id="top" class="header">Welcome ${loggedInUser.firstName}!! Have a nice day.</div>  
        <div id="mainContent" class="info">
            <div style="margin-bottom: 20px">Lorem ipsum dolor sit, amet consectetur adipisicing elit. A sed nobis ut exercitationem atque accusamus sit natus officiis totam blanditiis at eum nemo, nulla et quae eius culpa eveniet voluptatibus repellat illum tenetur, facilis porro. Quae fuga odio perferendis itaque alias sint, beatae non maiores magnam ad, veniam tenetur atque ea exercitationem earum eveniet totam ipsam magni tempora aliquid ullam possimus? Tempora nobis facere porro, praesentium magnam provident accusamus temporibus! Repellendus harum veritatis itaque molestias repudiandae ea corporis maiores non obcaecati libero, unde ipsum consequuntur aut consectetur culpa magni omnis vero odio suscipit vitae dolor quod dignissimos perferendis eos? Consequuntur!</div>
            <div style="margin-bottom: 20px">Lorem ipsum dolor sit, amet consectetur adipisicing elit. A sed nobis ut exercitationem atque accusamus sit natus officiis totam blanditiis at eum nemo, nulla et quae eius culpa eveniet voluptatibus repellat illum tenetur, facilis porro. Quae fuga odio perferendis itaque alias sint, beatae non maiores magnam ad, veniam tenetur atque ea exercitationem earum eveniet totam ipsam magni tempora aliquid ullam possimus? Tempora nobis facere porro, praesentium magnam provident accusamus temporibus! Repellendus harum veritatis itaque molestias repudiandae ea corporis maiores non obcaecati libero, unde ipsum consequuntur aut consectetur culpa magni omnis vero odio suscipit vitae dolor quod dignissimos perferendis eos? Consequuntur!</div>
            <div style="margin-bottom: 20px">Lorem ipsum dolor sit, amet consectetur adipisicing elit. A sed nobis ut exercitationem atque accusamus sit natus officiis totam blanditiis at eum nemo, nulla et quae eius culpa eveniet voluptatibus repellat illum tenetur, facilis porro. Quae fuga odio perferendis itaque alias sint, beatae non maiores magnam ad, veniam tenetur atque ea exercitationem earum eveniet totam ipsam magni tempora aliquid ullam possimus? Tempora nobis facere porro, praesentium magnam provident accusamus temporibus! Repellendus harum veritatis itaque molestias repudiandae ea corporis maiores non obcaecati libero, unde ipsum consequuntur aut consectetur culpa magni omnis vero odio suscipit vitae dolor quod dignissimos perferendis eos? Consequuntur!</div>
            <div style="margin-bottom: 20px">Lorem ipsum dolor sit, amet consectetur adipisicing elit. A sed nobis ut exercitationem atque accusamus sit natus officiis totam blanditiis at eum nemo, nulla et quae eius culpa eveniet voluptatibus repellat illum tenetur, facilis porro. Quae fuga odio perferendis itaque alias sint, beatae non maiores magnam ad, veniam tenetur atque ea exercitationem earum eveniet totam ipsam magni tempora aliquid ullam possimus? Tempora nobis facere porro, praesentium magnam provident accusamus temporibus! Repellendus harum veritatis itaque molestias repudiandae ea corporis maiores non obcaecati libero, unde ipsum consequuntur aut consectetur culpa magni omnis vero odio suscipit vitae dolor quod dignissimos perferendis eos? Consequuntur!</div>
            <div style="margin-bottom: 20px">Lorem ipsum dolor sit, amet consectetur adipisicing elit. A sed nobis ut exercitationem atque accusamus sit natus officiis totam blanditiis at eum nemo, nulla et quae eius culpa eveniet voluptatibus repellat illum tenetur, facilis porro. Quae fuga odio perferendis itaque alias sint, beatae non maiores magnam ad, veniam tenetur atque ea exercitationem earum eveniet totam ipsam magni tempora aliquid ullam possimus? Tempora nobis facere porro, praesentium magnam provident accusamus temporibus! Repellendus harum veritatis itaque molestias repudiandae ea corporis maiores non obcaecati libero, unde ipsum consequuntur aut consectetur culpa magni omnis vero odio suscipit vitae dolor quod dignissimos perferendis eos? Consequuntur!</div>
            <div style="margin-bottom: 20px">Lorem ipsum dolor sit, amet consectetur adipisicing elit. A sed nobis ut exercitationem atque accusamus sit natus officiis totam blanditiis at eum nemo, nulla et quae eius culpa eveniet voluptatibus repellat illum tenetur, facilis porro. Quae fuga odio perferendis itaque alias sint, beatae non maiores magnam ad, veniam tenetur atque ea exercitationem earum eveniet totam ipsam magni tempora aliquid ullam possimus? Tempora nobis facere porro, praesentium magnam provident accusamus temporibus! Repellendus harum veritatis itaque molestias repudiandae ea corporis maiores non obcaecati libero, unde ipsum consequuntur aut consectetur culpa magni omnis vero odio suscipit vitae dolor quod dignissimos perferendis eos? Consequuntur!</div>
            <div style="margin-bottom: 20px">Lorem ipsum dolor sit, amet consectetur adipisicing elit. A sed nobis ut exercitationem atque accusamus sit natus officiis totam blanditiis at eum nemo, nulla et quae eius culpa eveniet voluptatibus repellat illum tenetur, facilis porro. Quae fuga odio perferendis itaque alias sint, beatae non maiores magnam ad, veniam tenetur atque ea exercitationem earum eveniet totam ipsam magni tempora aliquid ullam possimus? Tempora nobis facere porro, praesentium magnam provident accusamus temporibus! Repellendus harum veritatis itaque molestias repudiandae ea corporis maiores non obcaecati libero, unde ipsum consequuntur aut consectetur culpa magni omnis vero odio suscipit vitae dolor quod dignissimos perferendis eos? Consequuntur!</div>
            <aside>
             <p>asdasd</p>
            </aside>
            <section>
                <div>
                <img src="../images/defaultUser.jpg" alt="loading Image">
                </div>   
            </section>             
            <section>
                <div>
                <img src="../images/defaultUser.jpg" alt="loading Image">
                </div>   
            </section>

        </div>
    </div>

        
</div>
    `;
    setProfilePic('#profilePic');

}

