const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const NOTES_FILE = "notes.json";

// GET all notes
app.get("/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync(NOTES_FILE, "utf8"));
    res.json(notes);
});

// POST a new note
app.post("/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync(NOTES_FILE, "utf8"));

    const newNote = {
        id: Date.now(),
        text: req.body.text
    };

    notes.push(newNote);

    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));

    res.status(201).json(newNote);
});

// DELETE a note
app.delete("/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync(NOTES_FILE, "utf8"));

    const updatedNotes = notes.filter(
        note => note.id !== Number(req.params.id)
    );

    fs.writeFileSync(NOTES_FILE, JSON.stringify(updatedNotes, null, 2));

    res.json({ message: "Note deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});