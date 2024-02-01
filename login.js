const mainDiv = document.querySelector("#app")

function loadLoginPage() {
    mainDiv.innerHTML = `
        <section>
      <div id="login-page">
        <h2>Login</h2>
        <form id="login-form">
          <label for="username">Username:</label>
          <input type="text" id="username" required>
          
          <label for="password">Password:</label>
          <input type="password" id="password" required>

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
        // Implement login logic here (authentication, etc.)
        alert("Login functionality not implemented in this example.");
    });

}

