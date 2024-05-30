import { SchemaType } from '@/interfaces/api';

export const findDocByTags = (data: SchemaType[], tags: string[]): SchemaType[] => {
  const foundedItem = data.filter((item) => {
    return tags.every((tag) => item.tags?.includes(tag));
  });

  return foundedItem;
};
