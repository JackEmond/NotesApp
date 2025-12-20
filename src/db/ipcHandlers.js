import { ipcMain } from "electron";

export default function setupIpcHandlers(db) {
  ipcMain.handle("add-note", (__, title, content) => {
    return db.addNote(title, content);
  });
  ipcMain.handle("get-notes", () => {
    return db.getNotes();
  });
  ipcMain.handle("update-note", (__, id, title, content) => {
    db.updateNote(id, title, content);
  });
  ipcMain.handle("delete-note", (__, id) => {
    db.deleteNote(id);
  });
}
