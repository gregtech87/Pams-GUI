


/*******************************************************************************
 * Copyright (c) 2024. Tobias Gregorsson.
 * Github: Gregtech87
 ******************************************************************************/

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
    </section>
    `;
    loadLoginButtons()
}

// Dev use only
async function aaaaaaa() {
    const url = baseFetchUrl + 'login';
    let base64 = btoa(`testGuy:testGuy`);
    try {
        const response = await fetchDataGet(url, base64);
        let user = await response.json();
        console.log(user)
        sessionStorage.setItem("loggedInUser", JSON.stringify(user))
        sessionStorage.setItem("base64credentials", JSON.stringify(base64));
        loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
        console.log(loggedInUser)
        window.open("application.html", "_self", windowSize);
    } catch (e) {

    }
}

function loadLoginButtons() {
    const loginForm = document.querySelector("#login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        login().then(permitted => {
            if (permitted) {
                console.log("yeay!!")
                console.log(loggedInUser)
                // loadApplication();
                window.open("application.html", "_self", windowSize);
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
    sessionStorage.setItem("base64credentials", JSON.stringify(base64credentials));
    let success = false;

    try {
        const url = baseFetchUrl + 'login';
        const response = await fetchDataGet(url, base64credentials);
        let user = await response.json();

        if (user.username === loggedInUsername) {
            loggedInUser = user;
            sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
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

        // loadLoginPage();
    }
    return success;
}


