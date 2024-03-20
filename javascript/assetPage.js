function loadAssetPage() {
    let contentDiv = document.querySelector("#mainContent");
    contentDiv.innerHTML = `
<section>
    <h2>Assets</h2>
    <button class="posButton" onclick="loadAddNewAssetPage()">Add New Asset</button>



</section>
`;
}