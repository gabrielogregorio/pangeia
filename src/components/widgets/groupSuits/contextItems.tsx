import { ReactElement, useContext, useEffect, useState } from 'react';
import { normalizeStrings } from '@/normalizers/strings';
import { InfoItem } from '@/components/infoItem';
import { docSelectedContext } from '@/contexts/docSelectedProvider';
import { MenuContext } from '@/contexts/menuProvider';
import { SchemaType } from '@/interfaces/api';
import { Collapse } from '@/widgets/Collapse';
import { FaCircleMinus } from 'react-icons/fa6';
import { FaPlusCircle } from 'react-icons/fa';

export const ContextItems = ({
  data,
  filter,
  contextName,
}: {
  data: SchemaType[];
  filter: string;
  contextName: string;
}): ReactElement => {
  const { setDocSelected, docSelected } = useContext(docSelectedContext);
  const { setMenuIsOpen } = useContext(MenuContext);
  const [contextIsOpen, setContextIsOpen] = useState(false);
  const [hiddenIfNotChildrens, setHiddenX] = useState(false);

  useEffect(() => {
    setHiddenX(false);
    if (filter) {
      setContextIsOpen(true);
    }
  }, [data, filter]);

  return (
    <div>
      <div className={`flex flex-col ${hiddenIfNotChildrens ? '' : 'hidden'}`}>
        <div className="flex justify-center">
          <div className="flex-1">
            <h2 className="">
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 text-left p-2 text-lg font-bold dark:text-gray-200 text-gray-600 uppercase hover:text-blue-500 hover:bg-gray-200 hover:dark:bg-gray-700 transition-colors duration-500 hover:duration-75 "
                onClick={() => setContextIsOpen((prev) => !prev)}>
                <div>{contextName}</div>
                <div>{contextIsOpen ? <FaCircleMinus /> : <FaPlusCircle />}</div>
              </button>
            </h2>
          </div>
        </div>
      </div>

      <Collapse isOpen={contextIsOpen}>
        <div>
          {data.map((groupCase): ReactElement => {
            const filterNormalized = normalizeStrings(filter);

            // fix filter system
            // this is very bad
            const notExistsMatchFilterInRouterOrTexts: boolean =
              !normalizeStrings(groupCase.title).includes(filterNormalized) &&
              !normalizeStrings(groupCase.tags?.join(' ')).includes(filterNormalized) &&
              !normalizeStrings(JSON.stringify(groupCase.content)).includes(filterNormalized);

            if (filter !== '' && notExistsMatchFilterInRouterOrTexts) {
              return <div />;
            }

            if (!hiddenIfNotChildrens) {
              setHiddenX(true);
            }

            return (
              <InfoItem
                key={groupCase.dynamicId}
                isSelected={docSelected?.dynamicId === groupCase.dynamicId}
                onClick={() => {
                  setDocSelected(groupCase);
                  setMenuIsOpen(false);
                }}
                title={groupCase.title || 'Sem título'}
              />
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};
