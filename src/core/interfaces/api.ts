type pageDocsMd = {
  id: string;
  name?: string;
  title?: string;
  markdown?: string;
};

type pageDocsTestsEndpoints = {
  id: string;
  name?: string;
  description?: string;
  path?: string;
  method?: string;
  payload?: string;
  headers?: string;
  resposta?: string;
};

export type PageType = pageDocsMd | pageDocsTestsEndpoints;

export type SchemaType = {
  id: string;
  title?: string;
  name?: string;
  children?: SchemaType[];
  page?: PageType[];
};
