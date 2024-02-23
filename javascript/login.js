const mainDiv = document.querySelector("#app")
const messageDiv = document.querySelector("#messageBoxes");
let loggedInUser;
let base64credentials;
// let baseFetchUrl = 'https://pam-api.gregtech.duckdns.org/api/v1/';
let baseFetchUrl = 'http://localhost:8586/api/v1/';

function loadLoginPage() {
    mainDiv.innerHTML = `
        <section>
      <div id="login-page">
        <img src="../images/MainLogo.png" style="width: 100%" alt="Logo">
        <h2>Personal Asset Management</h2>
        <form id="login-form">
          <label for="login-username">Username:</label>
          <input type="text" id="login-username" required>
          
          <label for="login-password">Password:</label>
          <input type="password" id="login-password" required>

          <button type="submit" class="posButton">Login</button>
        </form>
        <div>Not a member? <a href="#" onclick="displaySignupPage()">Sign up now</a></div>
      </div>
      
<!--      Devbutton-->
      <button onclick="aaaaaaa()">aaaaaaaa</button>
      <button onclick="bbbbb()">bbbbbbbb</button>
    </section>
    `;
    loadLoginButtons()
}

// Dev use only
async function aaaaaaa() {
    const url = baseFetchUrl + 'login';
    let base64 = btoa(`ttt:tttttttt`);
    const response = await fetchDataGet(url, base64);
    loggedInUser = await response.json();
    loadApplication();

}
function bbbbb() {

}
function loadLoginButtons() {
    const loginForm = document.querySelector("#login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        login().then(permitted => {
            if (permitted) {
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
    let success = false;

    try {
        const url = baseFetchUrl + 'login';
        const response = await fetchDataGet(url, base64credentials);
        let user = await response.json();

        if (user.username === loggedInUsername) {
            loggedInUser = user;
            success = true;
            console.log(success)
        }
    } catch (e) {
        const url = baseFetchUrl + "userstatus?credentials=" + loggedInUsername + ":" + loggedInPassword;
        console.log(url)
        const response = await fetchDataGet(url, btoa(`statusCheck:statusCheck`));
        let answer = await response.json();
        console.log(answer)
        let found = answer.userFound;
        let password = answer.verifiedPassword;
        let enabled = answer.accountEnabled;
        let locked = answer.accountLocked;
        console.log(found)
        console.log(enabled)
        if (!found) {
            errorBox('User with username: \"' + loggedInUsername + '\" Not found!')
        } else if (!password) {
            errorBox('Wrong password!')
        } else if (!enabled) {
            errorBox('Account not confirmed')
        } else if (locked) {
            errorBox('Account locked!')
        }

        loadLoginPage();
    }
    return success;
}

function loadingGif() {
    messageDiv.innerHTML += `
        <img src="../images/loadingGif.gif" alt="loading Image" id="loadingSnail" class="loadingGif">
    `;
}

