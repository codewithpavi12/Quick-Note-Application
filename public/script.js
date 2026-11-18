const noteInput = document.getElementById("noteInput");
const addNoteButton = document.getElementById("addNote");
const notesList = document.getElementById("notesList");

// Display all notes
async function loadNotes() {
    const response = await fetch("/notes");
    const notes = await response.json();

    notesList.innerHTML = "";

    notes.forEach(note => {
        const noteElement = document.createElement("div");
        noteElement.className = "note";

        noteElement.innerHTML = `
            <span>${note.text}</span>
            <button class="delete-btn" onclick="deleteNote(${note.id})">
                Delete
            </button>
        `;

        notesList.appendChild(noteElement);
    });
}

// Add a new note
addNoteButton.addEventListener("click", async () => {
    const text = noteInput.value.trim();

    if (text === "") {
        alert("Please write a note first!");
        return;
    }

    await fetch("/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
    });

    noteInput.value = "";

    loadNotes();
});

// Delete a note
async function deleteNote(id) {
    await fetch(`/notes/${id}`, {
        method: "DELETE"
    });

    loadNotes();
}

// Load notes when the page opens
loadNotes();