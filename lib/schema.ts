
import {
  sqliteTable,
  text,
  integer,
} from "drizzle-orm/sqlite-core";

export const documents = sqliteTable("documents", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  fileName: text("file_name"),
  createdAt: text("created_at").notNull(),
});

export const nodes = sqliteTable("nodes", {
  id: text("id").primaryKey(),
  parentId: text("parent_id"),
  documentId: text("document_id")
    .notNull()
    .references(() => documents.id, { onDelete: "cascade" }),
  type: text("type", {
    enum: ["seccion", "concepto", "ejemplo"],
  }).notNull(),
  title: text("title").notNull(),
  content: text("content"),
  page: integer("page"),
  quote: text("quote"),
  verificationStatus: text("verification_status", {
    enum: ["pendiente", "verificada", "no_verificada"],
  })
    .notNull()
    .default("pendiente"),
  generationStatus: text("generation_status", {
    enum: ["pendiente", "generando", "completado", "error"],
  })
    .notNull()
    .default("pendiente"),
});
