const mainDiv = document.querySelector("#app")
const messageDiv = document.querySelector("#messageBoxes");
let loggedInUser;
let base64credentials;




function loadLoginPage() {
    mainDiv.innerHTML = `
        <section>
      <div id="login-page">
        <h2>PAM: Personal Asset Management</h2>
        <form id="login-form">
          <label for="login-username">Username:</label>
          <input type="text" id="login-username" required>
          
          <label for="login-password">Password:</label>
          <input type="password" id="login-password" required>

          <button type="submit" class="posButton">Login</button>
        </form>
        <div>Not a member? <a href="#" onclick="displaySignupPage()">Sign up now</a></div>
      </div>
    </section>
    `;
    loadLoginButtons()
}

function loadLoginButtons() {
    const loginForm = document.querySelector("#login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        login().then(permitted => {
            if(permitted){
                console.log("yeay!!")
                console.log(loggedInUser)
                loadApplication();
            } else {
                console.log("NOOOO!!")
                console.log(loggedInUser)
            }
        });
    });

}

async function login() {
    let loggedInUsername = document.querySelector('#login-username').value;
    let loggedInPassword = document.querySelector('#login-password').value;
    loadingGif();
    base64credentials = btoa(`${loggedInUsername}:${loggedInPassword}`);
    console.log(base64credentials)
    let success = false;
    const url = 'http://localhost:8586/api/v1/login';
    try {
        const response = await fetchDataGet(url, base64credentials);
        let data = await response.json();
        console.log(data)
        // data.forEach(user => {
            if (data.username === loggedInUsername) {
                loggedInUser = data;
                console.log(loggedInUser)
                success = true;
            }
        // });
        console.log(success)
    } catch (e) {
        errorBox('\"' + loggedInUsername + '\" Not found or wrong password')
        loadLoginPage();
    }
    return success;
}

function loadingGif() {
    messageDiv.innerHTML += `
        <img src="/images/loadingGif.gif" alt="loading Image" id="loadingSnail" class="loadingGif">
    `;
}

