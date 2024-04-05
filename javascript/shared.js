


/*******************************************************************************
 * Copyright (c) 2024. Tobias Gregorsson.
 * Github: Gregtech87
 ******************************************************************************/

const monthsForPrintout = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDaysForPrintout = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const mainDiv = document.querySelector("#app")
const messageDiv = document.querySelector("#messageBoxes");
let windowSize = "width=" + window.innerWidth + ",height=" + window.innerHeight + ",scrollbars=no";
let baseFetchUrl = 'https://pam-api.gregtech.duckdns.org/api/v1/';
// let baseFetchUrl = 'http://localhost:8586/api/v1/';
let loggedInUser;
let base64credentials;
let previewTempImage;
let uploadedTempProfilePicture = {"$binary": {}};

function handleImageChange(inputId, elementID) {
    // Resetting temp file
    uploadedTempProfilePicture = {"$binary": {}};
    sessionStorage.setItem("newProfilePic", "true");
    // Get the file input element
    const input = document.querySelector(inputId);
    const file = input.files[0];

    // Get the image element
    let previewImage = document.querySelector(elementID);

    // Check if any files are selected
    if (file) {
        let reader = new FileReader();
        uploadedTempProfilePicture.name = file.name;
        uploadedTempProfilePicture.type = file.type;
        uploadedTempProfilePicture.size = file.size;
        uploadedTempProfilePicture.lastModified = file.lastModified;
        uploadedTempProfilePicture.lastModifiedDate = file.lastModifiedDate;

        // Read the selected image file
        reader.onload = function (e) {
            // The e.target.result contains the data URL of the image
            let imageData = e.target.result;
            previewTempImage = imageData.toString();
            sessionStorage.setItem('previewImageName', file.name)
            // Use the 'blob' object as needed (e.g., send it to a server).
            setTempProfilePicture(imageData);
            // Update the source of the image element
            previewImage.src = imageData;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function setTempProfilePicture(imageData) {
    let commaIndex = imageData.indexOf(",", 0)
    if (imageData.length > 50) {
        uploadedTempProfilePicture.$binary.base64 = imageData.substring(commaIndex + 1);
    }
}
function loadingGif() {
    messageDiv.innerHTML += `
        <img src="../images/loadingGif.gif" alt="loading Image" id="loadingSnail" class="loadingGif">
    `;
    // setTimeout(function () {
    //
    //     errorBox('AAAAAAAAAAAA')
    // }, 4000);
}

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row.
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        // return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
        // Check if the column text is a number
        const isNumber = !isNaN(parseFloat(aColText)) && isFinite(aColText);

        if (isNumber) {
            // If it's a number, convert to numbers and compare
            return (parseFloat(aColText) - parseFloat(bColText)) * dirModifier;
        } else {
            // If it's not a number, compare as strings
            return aColText.localeCompare(bColText) * dirModifier;
        }
    });
    // Remove all existing TRs from the table.
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    // Re-add the newly sorted rows.
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted.
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}

function activateSortingForTables() {
    document.querySelectorAll(".table-sortable th").forEach(headerCell => {
        headerCell.addEventListener("click", () => {
            let tableElement = headerCell.parentElement.parentElement.parentElement;
            let headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
            let currentIsAscending = headerCell.classList.contains("th-sort-asc");
            sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
        });
    });
}
