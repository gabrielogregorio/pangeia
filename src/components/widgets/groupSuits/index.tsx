import { ReactElement, useContext } from 'react';
import { normalizeStrings } from '@/normalizers/strings';
import { DataContext } from '@/contexts/dataProvider';
import { InfoItem } from '@/components/infoItem';
import { docSelectedContext } from '@/contexts/docSelectedProvider';

export const GroupSuits = ({ filter }: { filter: string }): ReactElement => {
  const { data } = useContext(DataContext);
  const { setDocSelected } = useContext(docSelectedContext);

  return (
    <div>
      <div className="flex flex-col p-2">
        <div className="flex justify-center">
          <div className="flex-1">
            <h2 className="text-lg font-bold dark:text-gray-200 text-gray-600 uppercase hover:text-blue-500">
              {'Sem título - fix me'}
            </h2>
          </div>
        </div>
      </div>

      {data.map((groupCase): ReactElement => {
        const filterNormalized: string = normalizeStrings(filter);

        // fix filter system
        const notExistsMatchFilterInRouterOrTexts: boolean =
          !normalizeStrings(groupCase.title).includes(filterNormalized) &&
          !normalizeStrings(groupCase.tags?.join(' ')).includes(filterNormalized) &&
          !normalizeStrings(JSON.stringify(groupCase.content)).includes(filterNormalized);

        if (filter !== '' && notExistsMatchFilterInRouterOrTexts) {
          return <div />;
        }

        return (
          <InfoItem
            key={groupCase.dynamicId}
            isSelected={false}
            onClick={(): void => setDocSelected(groupCase)}
            title={groupCase.title || 'Sem título'}
          />
        );
      })}
    </div>
  );
};
