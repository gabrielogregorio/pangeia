type pageDocsMd = {
  markdown?: string;
};

export type contentType = pageDocsMd;

export type SchemaType = {
  dynamicId: string; // gerado pela api yggdrasil
  tags?: string[]; // gerado pelo midgard
  errors?: string[];
  title: string; // gerado pelo midgard
  originName: string;
  content: contentType[]; // gerado pelo midgard
};
