import { extractText, getDocumentProxy } from "unpdf";

export type DocumentPage = {
  page: number;
  text: string;
};

export async function readDocument(file: File): Promise<DocumentPage[]> {
  const name = file.name.toLowerCase();

  if (
    name.endsWith(".txt") ||
    name.endsWith(".md") ||
    name.endsWith(".markdown")
  ) {
    const content = await file.text();

    return content
      .split(/\f/)
      .map((text, index) => ({
        page: index + 1,
        text: text.trim(),
      }))
      .filter((page) => page.text.length > 0);
  }

  if (name.endsWith(".pdf")) {
    const buffer = await file.arrayBuffer();
    const pdf = await getDocumentProxy(new Uint8Array(buffer));

    const result = await extractText(pdf, {
      mergePages: false,
    });

    return result.text
      .map((text, index) => ({
        page: index + 1,
        text: text.trim(),
      }))
      .filter((page) => page.text.length > 0);
  }

  throw new Error("Formato no compatible. Usa PDF o TXT.");
}
