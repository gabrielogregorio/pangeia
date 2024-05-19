type pageDocsMd = {
  markdown?: string;
  dynamicId: string;
  subType: 'dev' | 'normal';
  type: 'md' | 'tag';
};
export type handlerRequestType = {
  type: 'request';
  dynamicId: string;
  method: string;
  headers: {
    [key: string]: string;
  };
  payload: string;
  url: string;
};

export type blocksType = pageDocsMd | handlerRequestType;

type codeWithoutLanguageType = {
  type: 'code-without-language';
  file: string;
  code: string[];
};

export type requestJsonWithoutHeader = {
  type: 'request-json-without-header';
  file: string;
  code: string[];
};

type warningType = codeWithoutLanguageType | requestJsonWithoutHeader;

export type SchemaType = {
  id: string;
  tags?: string[];
  handlerName: string;
  errors?: string[];
  warning?: warningType[];
  title: string;
  originName: string;
  blocks: blocksType[];
};

export type scrappersType = {
  bannedPaths: string[];
  filterFile: string;
  directory: string;
  muteLogsListOfAnalyzedFiles: boolean;
};

export type hierarchyType = {
  tags: string[];
  title: string;
};

export type configBase = {
  scrappers: scrappersType[];
  hierarchy: hierarchyType[];
};

export type responseApi = { schema: SchemaType[]; hierarchy: hierarchyType[] };
