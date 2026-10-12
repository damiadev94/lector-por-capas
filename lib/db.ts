
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

const sqlite = new Database("./data/lector.db");

sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite);
