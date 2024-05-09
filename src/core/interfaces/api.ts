type pageDocsMd = {
  markdown?: string;
  dynamicId: string;
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
