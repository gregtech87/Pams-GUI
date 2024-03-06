
function loadAddNotesPage() {
    let contentDiv = document.querySelector("#mainContent");
    contentDiv.innerHTML = `
<div>
    <form id="addNoteForm">
        <label for="note">Add new note:</label>
        <textarea id="note" name="note" required placeholder="New note." class="noteArea"></textarea>
        <div>
            <button type="submit" class="posButton">Save Note</button>
            <button class="negButton" onclick="loadNotesPage()">Return</button>
        </div>
    </form>
</div>
`;

    let form = document.querySelector("#addNoteForm");
    form.addEventListener("submit", event => {
        event.preventDefault();
        addNewNote().then();
    })
}

