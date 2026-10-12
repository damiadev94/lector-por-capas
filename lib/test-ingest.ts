
import { readFile } from "node:fs/promises";
import { db } from "./db";
import { documents, nodes } from "./schema";
import { readDocument } from "./document-reader";
import { splitDocument } from "./split-document";

async function main() {
  const filePath = "./data/prueba.md";
  const content = await readFile(filePath, "utf8");

  const file = new File(
    [content],
    "prueba.md",
    { type: "text/markdown" },
  );

  // 1. Extraer el texto
  const pages = await readDocument(file);

  // 2. Detectar capítulos y secciones
  const sections = splitDocument(pages);

  if (sections.length === 0) {
    throw new Error("No se encontraron secciones.");
  }

  // 3. Guardar el documento y sus secciones
  const documentId = crypto.randomUUID();

  db.insert(documents)
    .values({
      id: documentId,
      title: "Documento de prueba",
      fileName: file.name,
      createdAt: new Date().toISOString(),
    })
    .run();

  db.insert(nodes)
    .values(
      sections.map((section) => ({
        id: crypto.randomUUID(),
        parentId: null,
        documentId,
        type: "seccion" as const,
        title: section.title,
        content: section.content,
        page: section.startPage,
        quote: null,
      })),
    )
    .run();

  // 4. Consultar lo guardado
  const savedSections = db
    .select()
    .from(nodes)
    .where(
      // Filtramos por el documento recién importado
      // usando la API de Drizzle.
      (await import("drizzle-orm")).eq(
        nodes.documentId,
        documentId,
      ),
    )
    .all();

  console.log("Documento importado:", file.name);
  console.log("Secciones guardadas:", savedSections.length);
  console.log(
    savedSections.map((section) => section.title),
  );
}

main().catch((error) => {
  console.error("Error durante la importación:", error);
  process.exitCode = 1;
});
