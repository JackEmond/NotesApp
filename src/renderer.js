/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./index.css";

const notesInput = document.getElementById("note-title");
const notesContent = document.getElementById("note-content");
const addNoteButton = document.getElementById("add-note-button");
const notesList = document.getElementById("notes-list");

addNoteButton.addEventListener("click", async () => {
  console.log("Add Note button clicked");
  const title = notesInput.value.trim();
  const content = notesContent.value.trim();
  await window.api.addNote(title, content);
  notesInput.value = "";
  notesContent.value = "";
  loadNotes();
});

async function loadNotes() {
  const notes = await window.api.getNotes();
  notesList.innerHTML = "";
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = note.title.toLocaleString();
    notesList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadNotes();
});

console.log(
  '👋 This message is being logged by "renderer.js", included via Vite'
);
