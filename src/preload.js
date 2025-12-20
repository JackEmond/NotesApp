// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  addNote: (title, content) => ipcRenderer.invoke("add-note", title, content),
  getNotes: () => ipcRenderer.invoke("get-notes"),
  updateNote: (id, title, content) =>
    ipcRenderer.invoke("update-note", id, title, content),
  deleteNote: (id) => ipcRenderer.invoke("delete-note", id),
});
