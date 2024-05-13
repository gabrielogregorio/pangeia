const regex = /\(ref\.([\d\w\s/_\-.]{1,})\)/;

const addNewLinesForEachReference = (text: string) => {
  return text.replace(regex, (match) => `\n${match}\n`);
};

type returnType = { type: 'text'; content: string } | { type: 'reference'; reference: string };

export const extractReferences = (originalText: string): returnType[] => {
  const fullMap: returnType[] = [];
  const textWithReferencesInNewLine = addNewLinesForEachReference(originalText);
  let lastText = '';

  textWithReferencesInNewLine.split('\n').forEach((line) => {
    const find = line.match(regex);
    if (!find) {
      lastText = lastText ? lastText + '\n ' + line : line;
      return;
    }

    if (lastText) {
      fullMap.push({
        type: 'text',
        content: lastText,
      });
      lastText = '';
    }

    fullMap.push({
      type: 'reference',
      reference: find[1],
    });
  });

  if (lastText) {
    fullMap.push({
      type: 'text',
      content: lastText,
    });
    lastText = '';
  }

  return fullMap;
};
