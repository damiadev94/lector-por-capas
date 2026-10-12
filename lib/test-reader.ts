
import { readDocument } from "./document-reader";
import { writeFile } from "node:fs/promises";

async function main() {
  const markdown = `# Capítulo 1: Aprendizaje

El aprendizaje mejora cuando relacionamos
los conceptos nuevos con conocimientos previos.

## Conceptos clave

- Comprensión
- Memoria
- Práctica

# Capítulo 2: Aplicación

Practicar permite comprobar lo aprendido.
`;

  const filePath = "./data/prueba.md";
  await writeFile(filePath, markdown, "utf8");

  const file = new File(
    [markdown],
    "prueba.md",
    { type: "text/markdown" },
  );

  const pages = await readDocument(file);

  console.log("Páginas detectadas:", pages.length);
  console.log("Contenido extraído:");
  console.log(pages);
}

main().catch(console.error);
