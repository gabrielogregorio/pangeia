const regex = /\(ref\.([\d\w\s\/\_\-\.]{1,})\)/;

const addNewLinesForEachReference = (text: string) => {
  return text.replace(regex, (match) => `\n${match}\n`);
};

type returnType = { type: 'text'; content: string } | { type: 'reference'; reference: string };

export const extractReferences = (originalText: string): returnType[] => {
  const mapaCompleto: returnType[] = [];
  let textWithReferencesInNewLine = addNewLinesForEachReference(originalText);
  let ultimoTexto = '';

  textWithReferencesInNewLine.split('\n').forEach((line) => {
    const find = line.match(regex);
    if (!find) {
      ultimoTexto += '\n' + line;
      return;
    }

    if (ultimoTexto) {
      mapaCompleto.push({
        type: 'text',
        content: ultimoTexto,
      });
      ultimoTexto = '';
    }

    mapaCompleto.push({
      type: 'reference',
      reference: find[1],
    });
  });

  if (ultimoTexto) {
    mapaCompleto.push({
      type: 'text',
      content: ultimoTexto,
    });
    ultimoTexto = '';
  }

  return mapaCompleto;
};
