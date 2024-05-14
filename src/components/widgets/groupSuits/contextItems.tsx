import { ReactElement, useContext, useState } from 'react';
import { InfoItem } from '@/components/infoItem';
import { DocSelectedContext } from '@/contexts/docSelectedProvider';
import { MenuContext } from '@/contexts/menuProvider';
import { SchemaType } from '@/interfaces/api';
import { Collapse } from '@/widgets/Collapse';
import { FaCircleMinus } from 'react-icons/fa6';
import { FaPlusCircle } from 'react-icons/fa';

export const ContextItems = ({ data, contextName }: { data: SchemaType[]; contextName: string }): ReactElement => {
  const { setDocSelected, docSelected } = useContext(DocSelectedContext);
  const { setMenuIsOpen } = useContext(MenuContext);
  const [contextIsOpen, setContextIsOpen] = useState(false);

  return (
    <div>
      <div className={`flex flex-col`}>
        <div className="flex justify-center">
          <div className="flex-1">
            <h2 className="">
              <button
                type="button"
                className="w-full flex items-center justify-between rounded-md px-2 text-left p-2 text-lg font-bold dark:text-gray-200 text-gray-600 uppercase hover:text-blue-500 hover:bg-gray-200 hover:dark:bg-gray-700 transition-colors duration-700 hover:duration-75 "
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
            return (
              <InfoItem
                key={groupCase.id}
                isSelected={docSelected?.id === groupCase.id}
                onClick={() => {
                  setDocSelected(groupCase);
                  setMenuIsOpen(false);
                }}
                title={'  ' + groupCase.title || 'Sem título'}
              />
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};
