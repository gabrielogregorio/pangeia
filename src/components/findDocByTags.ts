import { SchemaType } from '@/interfaces/api';

export const findDocByTags = (data: SchemaType[], tags: string[]): SchemaType | undefined => {
  const foundedItem = data.find((item) => {
    return tags.every((tag) => item.tags?.includes(tag));
  });

  return foundedItem;
};
