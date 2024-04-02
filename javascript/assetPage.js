
/*******************************************************************************
 * Copyright (c) 2024. Tobias Gregorsson.
 * Github: Gregtech87
 ******************************************************************************/

function loadAssetPage() {
    let contentDiv = document.querySelector("#mainContent");
    contentDiv.innerHTML = `
<section class="assetArea">
    <h2 style="color: black;">Asset overview</h2>
    <button class="posButton" style="margin-bottom: 30px" onclick="loadAddNewAssetPage()">Add New Asset</button>
    <div id="assetContent"></div>
</section>
`;
    getAssets();
}

async function getAssets() {
    loadingGif()
    let contentDiv = document.querySelector("#assetContent");


    let storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const url = baseFetchUrl + 'items/' + storedUser.items;
    const response = await fetchDataGet(url, btoa("itemGuy:itemGuy"));
    console.log(response)
    if (response === undefined) {
        messageDiv.innerHTML = ``;
        return;
    }
    let itemList = await response.json();

    let boxIndex = 0;
    itemList.reverse().forEach(item => {
        sessionStorage.setItem("item" + boxIndex, JSON.stringify(item))
        contentDiv.innerHTML += `
        <section class="itemBox" id="item${boxIndex}">
            <div>
            <img id="itemImg${boxIndex}" src="../images/no-image-asset.gif" alt="ItemPic">
            <p>${item.title}</p>
            <p style="font-size: small">Created: ${item.createdAt}</p>
            </div>         
        </section>
       `;

        boxIndex++;
    });

    let contentIndex = 0;

    while (contentIndex < boxIndex) {
        let internalIndex = contentIndex;

        let itemBtn = document.querySelector("#item" + contentIndex)
        itemBtn.addEventListener('click', (event) => {
            // event.preventDefault();
            console.log("wtf: " + internalIndex)
            loadItemDetailsPage('item'+ internalIndex)
        });

        setProfilePic('#itemImg'+contentIndex, JSON.parse(sessionStorage.getItem("item"+contentIndex)));
        contentIndex++
    }
    messageDiv.innerHTML = ``;
}