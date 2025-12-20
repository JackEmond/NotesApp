import { app } from "electron";
import path from "node:path";
import Database from "better-sqlite3";

class AppDatabase {
  constructor() {
    const dbPath = path.join(app.getPath("userData"), "notes-app.sqlite");
    this.db = new Database(dbPath);
    this.db.pragma("journal_mode = WAL");
    this.setupDatabase();
  }

  setupDatabase() {
    const createNotesTableQuery = `
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT Default 'Untitled',
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;
    this.db.exec(createNotesTableQuery);
    console.log("Database and notes table are set up.");
  }

  addNote(title, content) {
    const stmt = this.db.prepare(`
      INSERT INTO notes (title, content) VALUES (?, ?)
    `);
    const info = stmt.run(title, content);
    return info.lastInsertRowid;
  }
  addNote(title, content) {
    const stmt = this.db.prepare(`
      INSERT INTO notes (title, content) VALUES (?, ?)
    `);
    const info = stmt.run(title, content);
    return info.lastInsertRowid;
  }

  getNotes() {
    const stmt = this.db.prepare(`
      SELECT * FROM notes ORDER BY updated_at DESC
    `);
    return stmt.all();
  }
  updateNote(id, title, content) {
    const stmt = this.db.prepare(`
      UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `);
    stmt.run(title, content, id);
  }
  deleteNote(id) {
    const stmt = this.db.prepare(`
      DELETE FROM notes WHERE id = ?
    `);
    stmt.run(id);
  }
  close() {
    this.db.close();
    console.log("Database connection closed.");
  }
}

export default AppDatabase;
