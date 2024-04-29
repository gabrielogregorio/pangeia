import { useState, useContext, ChangeEvent, ReactElement } from 'react';
import { MenuContext } from '@/contexts/menuProvider';
import { GroupSuits } from './groupSuits';

export const Aside = (): ReactElement => {
  const [filter, setFilter] = useState<string>('');
  const { menuIsOpen } = useContext(MenuContext);

  const styleMenuIsOpen: string = menuIsOpen ? 'w-full sm:w-80 lg:w-full' : 'hidden lg:block lg:w-full';

  return (
    <aside
      className={`absolute top-0 ${styleMenuIsOpen} z-20 left-0 lg:relative lg:block lg:col-span-3 h-full overflow-y-auto bg-white dark:bg-dark`}>
      <nav>
        <div className="flex items-center border-b-2 border-b-gray-200 dark:border-b-gray-600 m-2 mx-4 dark:hover:border-b-cyan-500 hover:border-b-cyan-500 transition duration-150">
          <input
            type="search"
            name="searchRequests"
            value={filter}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => setFilter(event.target.value)}
            id="searchRequests"
            placeholder="Pesquise endpoints, textos..."
            className="w-full text-gray-500 focus:outline-none dark:bg-dark p-2 "
          />
        </div>
        <div className="overflow-y-auto">
          <div className="flex flex-col px-2">
            <GroupSuits filter={filter} />
          </div>
        </div>
      </nav>
    </aside>
  );
};
