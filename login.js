const mainDiv = document.querySelector("#app")
let loggedInUser;
let base64credentials;




function loadLoginPage() {
    mainDiv.innerHTML = `
        <section>
      <div id="login-page">
        <h2>Login</h2>
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
    const url = 'http://localhost:8586/api/v1/users';
    try {
        const response = await fetchDataGet(url, base64credentials);
        let data = await response.json();
        console.log(data)
        data.forEach(user => {
            if (user.username === loggedInUsername) {
                loggedInUser = user;
                success = true;
            }
        });
        console.log(success)
    } catch (e) {
        errorBox('\"' + loggedInUsername + '\" Not found or wrong password')
        loadLoginPage();
    }
    return success;
}

function loadingGif() {
    mainDiv.innerHTML += `
        <img src="/images/loadingGif.gif" alt="loading Image" class="loadingGif">
    `;
}

