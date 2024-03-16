// function loadNotesPage() {
//     let contentDiv = document.querySelector("#mainContent");
//     let date = new Date()
//     let weekDay = date.getDay()
//     let day = date.getDate()
//     let month = date.getMonth()
//     let year = date.getFullYear()
//     let hours = date.getHours()
//     let minutes = date.getMinutes()
//     let timeString = "(" +weekDaysForPrintout[weekDay] + ") " + day + " / " + monthsForPrintout[month] + " - " + year + ", " + hours + ":" + minutes;
//     contentDiv.innerHTML = `
//     <button class="posButton" onclick="loadAddNotesPage()">Add new Note</button>
//     <section style="max-width: 800px">
//         <p>${timeString}</p>
//         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A sed nobis ut exercitationem atque accusamus sit natus officiis totam blanditiis at eum nemo, nulla et quae eius culpa eveniet voluptatibus repellat illum tenetur, facilis porro. Quae fuga odio perferendis itaque alias sint, beatae non maiores magnam ad, veniam tenetur atque ea exercitationem earum eveniet totam ipsam magni tempora aliquid ullam possimus? Tempora nobis facere porro, praesentium magnam provident accusamus temporibus! Repellendus harum veritatis itaque molestias repudiandae ea corporis maiores non obcaecati libero, unde ipsum consequuntur aut consectetur culpa magni omnis vero odio suscipit vitae dolor quod dignissimos perferendis eos? Consequuntur!</p>
//     </section>
//     `;
//     displayNotes().then();
// }


async function loadNotesPage() {
    loadingGif();
    let contentDiv = document.querySelector("#mainContent");
    contentDiv.innerHTML = `
    <h2>Notes</h2>
    <button class="posButton" onclick="loadAddNotesPage()">Add new Note</button>
`;
    let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
let list;
    if (user.notes.length === 0) {
        let contentDiv = document.querySelector("#mainContent");
        contentDiv.innerHTML += `
        <section style="max-width: 800px">
            <p>${new Date()}</p>
            <p>No Notes writen so far!</p>
        </section>
        `;
        list = "empty";
    } else {
        list = user.notes;
    }

    let responseNote = await fetchDataGet(baseFetchUrl + "note/" + list, btoa("noteGuy:noteGuy"))
    let noteList = await responseNote.json();
    console.log(noteList)
    for (const n of noteList.reverse()) {

        let contentDiv = document.querySelector("#mainContent");
        let title = n.title;
        let note = n.note;
        let createdAt = n.created;
        if (n.title.length < 1) {
            title = "No Title"
        }

        contentDiv.innerHTML += `
        <section style="max-width: 800px">
            <p><b>${title}: </b>${createdAt}</p>
            <pre class="displayNotes">${note}</pre>
        </section>
        `;
    }
    messageDiv.innerHTML = ``;
}

async function addNewNote() {
    loadingGif()

    let date = new Date();
    let timeString = "(" + weekDaysForPrintout[date.getDay()] + ") " + date.getDate() + " / " + monthsForPrintout[date.getMonth()] +
        " - " + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log(timeString);
    let storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    let note = document.querySelector("#note").value;
    let title = document.querySelector("#noteTitle").value;
    let noteObject = {
        id: "0",
        author: storedUser.id,
        created: timeString,
        title: title,
        note: note
    };
    console.log(noteObject);
    let responseNote = await fetchDataPost(baseFetchUrl + "note", btoa("noteGuy:noteGuy"), noteObject);
    console.log(responseNote);
    const url = baseFetchUrl + 'user/' + storedUser.id;
    const response = await fetchDataGet(url, btoa("editUser:editUser"));
    console.log(response)
    let user = await response.json();
    console.log(user);
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    await updateUser(false, true, false)
    await loadNotesPage();

}