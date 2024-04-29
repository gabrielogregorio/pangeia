import { ReactElement, useContext } from 'react';
import { normalizeStrings } from '@/normalizers/strings';
import { DataContext } from '@/contexts/dataProvider';
import { InfoItem } from '@/components/infoItem';
import { dataSelectedContext } from '@/contexts/dataSelectedProvider';
import { SchemaType } from '@/interfaces/api';

const RenderRecursive = ({
  groupCase,
  setDataSelected,
  level = 0,
}: {
  groupCase: SchemaType;
  setDataSelected: (dataSelected: SchemaType) => void;
  level?: number;
}) => {
  const renderList = (data: SchemaType[]) => {
    return data.map((item) => {
      return <RenderRecursive level={level + 1} groupCase={item} setDataSelected={setDataSelected} />;
    });
  };

  return (
    <div>
      <InfoItem
        key={groupCase.id}
        isSelected={false}
        onClick={(): void => setDataSelected(groupCase)}
        title={new Array(level * 2).fill(' ').join('') + (groupCase.title || groupCase.name || 'Sem título')}
      />
      {groupCase.children?.length ? renderList(groupCase.children) : undefined}
    </div>
  );
};

export const GroupSuits = ({ filter }: { filter: string }): ReactElement => {
  const { data } = useContext(DataContext);
  const { setDataSelected } = useContext(dataSelectedContext);

  return (
    <div>
      {data.map((groupCase): ReactElement => {
        const filterNormalized: string = normalizeStrings(filter);

        const notExistsMatchFilterInRouterOrTexts: boolean =
          !normalizeStrings(groupCase.name).includes(filterNormalized) &&
          !normalizeStrings(groupCase.title).includes(filterNormalized) &&
          !normalizeStrings(JSON.stringify(groupCase.page)).includes(filterNormalized);

        if (filter !== '' && notExistsMatchFilterInRouterOrTexts) {
          return <div />;
        }

        <div className="flex flex-col p-2">
          <div className="flex justify-center">
            <div className="flex-1">
              <h2 className="text-lg font-bold dark:text-gray-200 text-gray-600 uppercase hover:text-blue-500">
                {groupCase.title || groupCase.name || 'Sem título'}
              </h2>
            </div>
          </div>
        </div>;

        return <RenderRecursive key={groupCase.id} groupCase={groupCase} setDataSelected={setDataSelected} />;
      })}
    </div>
  );
};
