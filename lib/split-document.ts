
export type DocumentSection = {
  title: string;
  content: string;
  startPage: number;
  endPage: number;
};

type SourcePage = {
  page: number;
  text: string;
};

export function splitDocument(
  pages: SourcePage[],
  maxChars = 12000,
): DocumentSection[] {
  const sections: DocumentSection[] = [];
  let currentTitle = "Introducción";
  let currentParts: string[] = [];
  let currentStartPage = pages[0]?.page ?? 1;
  let currentLength = 0;
  let foundHeading = false;

  function saveSection(endPage: number) {
    const content = currentParts.join("\n").trim();

    if (!content) return;

    sections.push({
      title: currentTitle,
      content,
      startPage: currentStartPage,
      endPage,
    });
  }

  for (const page of pages) {
    const lines = page.text.split(/\r?\n/);

    for (const line of lines) {
      const heading = line.match(/^#{1,3}\s+(.+)$/);

      if (heading) {
        foundHeading = true;
        saveSection(page.page);
        currentTitle = heading[1].trim();
        currentParts = [];
        currentStartPage = page.page;
        currentLength = 0;
        continue;
      }

      if (currentLength + line.length > maxChars && currentParts.length > 0) {
        saveSection(page.page);
        currentTitle = foundHeading
          ? `${currentTitle} (continuación)`
          : `Bloque ${sections.length + 2}`;
        currentParts = [];
        currentStartPage = page.page;
        currentLength = 0;
      }

      currentParts.push(line);
      currentLength += line.length + 1;
    }
  }

  saveSection(pages[pages.length - 1]?.page ?? currentStartPage);

  return sections;
}
