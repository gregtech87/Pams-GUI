const mainDiv = document.querySelector("#app")
let loggedInUser;
let base64credentials;
// let dummyUser = {
//         "id": "2",
//         "customerId": 2,
//         "username": "jerry",
//         "password": "{noop}jerry",
//         "firstName": "Jerry",
//         "lastName": "Persson",
//         "email": "jerry@cat.se",
//         "phone": "0766654665",
//         "dateOfBirth": "1948-01-06",
//         "address": {
//             "street": "Haspelvägen 3",
//             "postalCode": 87445,
//             "city": "Växsjö"
//         },
//         "roles": [
//             {
//                 "id": "3",
//                 "role": "ROLE_ADMIN"
//             },
//             {
//                 "id": "4",
//                 "role": "ROLE_USER"
//             }
//         ]
//     };
// dummyUser.roles.forEach(r => {
//     console.log(r);
//     console.log(r.id);
//     console.log(r.role);
// });



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
    const loginForm = document.getElementById("login-form");

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
    let loggedInUsername = document.getElementById('login-username').value;
    let loggedInPassword = document.getElementById('login-password').value;
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

