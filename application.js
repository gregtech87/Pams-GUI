

function loadApplication() {
    let body = document.querySelector("body");
    body.classList.remove("boby-login-register")
    messageDiv.innerHTML = ``;
    mainDiv.innerHTML = `
        <section>
            <div>
            <img src="/images/yeay.gif" alt="loading Image">
            </div>   
        </section>             
        <section>
            <div>
            <img src="/images/yeay.gif" alt="loading Image">
            </div>   
        </section>     
    `;
    console.log(loggedInUser)
}