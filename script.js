// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Save notes
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Add note
function addNote() {
  let input = document.getElementById("noteInput");
  let value = input.value.trim();

  if (value === "") return;

  notes.push({
    text: value,
    time: new Date().toLocaleString()
  });

  input.value = "";
  input.focus();

  saveNotes();
  displayNotes();
}

// Display notes
function displayNotes() {
  let container = document.getElementById("notesContainer");
  container.innerHTML = "";

  if (notes.length === 0) {
    container.innerHTML = "<p>No notes yet</p>";
    return;
  }

  notes.forEach((note, index) => {
    container.innerHTML += `
      <div class="note">
        <p>${note.text}</p>
        <small>${note.time}</small><br>
        <button onclick="editNote(${index})">Edit</button>
        <button onclick="deleteNote(${index})">Delete</button>
      </div>
    `;
  });
}

// Delete note
function deleteNote(index) {
  if (confirm("Delete this note?")) {
    notes.splice(index, 1);
    saveNotes();
    displayNotes();
  }
}

// Edit note
function editNote(index) {
  let newNote = prompt("Edit your note:", notes[index].text);

  if (newNote !== null && newNote.trim() !== "") {
    notes[index].text = newNote.trim();
    notes[index].time = "Edited: " + new Date().toLocaleString();

    saveNotes();
    displayNotes();
  }
}

// Search notes
document.getElementById("search").addEventListener("input", function () {
  let value = this.value.toLowerCase();
  let container = document.getElementById("notesContainer");
  container.innerHTML = "";

  let filtered = notes.filter(note =>
    note.text.toLowerCase().includes(value)
  );

  if (filtered.length === 0) {
    container.innerHTML = "<p>No matching notes</p>";
    return;
  }

  filtered.forEach((note, index) => {
    container.innerHTML += `
      <div class="note">
        <p>${note.text}</p>
        <small>${note.time}</small><br>
        <button onclick="editNote(${index})">Edit</button>
        <button onclick="deleteNote(${index})">Delete</button>
      </div>
    `;
  });
});

// Dark mode toggle
document.getElementById("toggleTheme").onclick = () => {
  document.body.classList.toggle("dark");
};

// Enter key support
document.getElementById("noteInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addNote();
  }
});

// Initial load
displayNotes();
