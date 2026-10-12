
import { db } from "./db";
import { documents } from "./schema";

const id = crypto.randomUUID();

db.insert(documents)
  .values({
    id,
    title: "Documento de prueba",
    fileName: "prueba.txt",
    createdAt: new Date().toISOString(),
  })
  .run();

const result = db.select().from(documents).all();

console.log("Documentos guardados:", result);
