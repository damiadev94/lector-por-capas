
import { splitDocument } from "./split-document";

const pages = [
  {
    page: 1,
    text: `# Capítulo 1: Aprendizaje

El aprendizaje conecta conocimientos nuevos
con conocimientos previos.

## Conceptos clave

La práctica ayuda a consolidar la memoria.`,
  },
  {
    page: 2,
    text: `# Capítulo 2: Aplicación

Practicar permite comprobar lo aprendido.`,
  },
];

const sections = splitDocument(pages);

console.log(JSON.stringify(sections, null, 2));
