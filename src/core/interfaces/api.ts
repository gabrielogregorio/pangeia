type pageDocsMd = {
  markdown?: string;
  dynamicId: string;
  subType: 'dev' | 'normal';
  type: 'md' | 'tag';
};

export type contentType = pageDocsMd;

export type SchemaType = {
  dynamicId: string; // gerado pela api yggdrasil
  tags?: string[]; // gerado pelo midgard
  errors?: string[];
  title: string; // gerado pelo midgard
  handlerName: string;
  originName: string;
  content: contentType[]; // gerado pelo midgard
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
