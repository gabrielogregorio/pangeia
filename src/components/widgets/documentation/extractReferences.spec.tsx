import { extractReferences } from '@/widgets/documentation/extractReferences';

describe('extractReferences', () => {
  it('should extract references', () => {
    const string = `top
[ref.example1.item]
down
[ref.example2.item]
`;

    expect(extractReferences(string)).toStrictEqual([
      {
        content: 'top\n ',
        type: 'text',
      },
      {
        reference: 'example1.item',
        type: 'reference',
      },
      {
        content: 'down',
        type: 'text',
      },
      {
        reference: 'example2.item',
        type: 'reference',
      },
    ]);
  });
});
