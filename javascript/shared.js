const mainDiv = document.querySelector("#app")
const messageDiv = document.querySelector("#messageBoxes");
let windowSize = "width=" + window.innerWidth + ",height=" + window.innerHeight + ",scrollbars=no";
// let baseFetchUrl = 'https://pam-api.gregtech.duckdns.org/api/v1/';
let baseFetchUrl = 'http://localhost:8586/api/v1/';
let loggedInUser;
let base64credentials;