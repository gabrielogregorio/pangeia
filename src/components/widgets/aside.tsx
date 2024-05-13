import { useState, useContext, ChangeEvent, ReactElement } from 'react';
import { MenuContext } from '@/contexts/menuProvider';
import { GroupSuits } from './groupSuits';
import { MdClear } from 'react-icons/md';
import { useCurrentWindowSize } from '@/hooks/useCurrentWindowSize';

export const Aside = (): ReactElement => {
  const [filter, setFilter] = useState<string>('');
  const { menuIsOpen } = useContext(MenuContext);
  const { innerHeight } = useCurrentWindowSize();

  const styleMenuIsOpen: string = menuIsOpen ? 'w-full lg:w-full' : 'hidden lg:block lg:w-full';

  const hasAnyFilter = Boolean(filter);

  const styleOnHasFilter = hasAnyFilter
    ? 'dark:border-b-cyan-500 border-b-cyan-500'
    : 'border-b-gray-200 dark:border-b-gray-600';

  return (
    <aside
      className={`absolute top-0 ${styleMenuIsOpen} z-20 bottom-0 left-0 lg:relative lg:block lg:col-span-3 bg-white dark:bg-dark-max`}>
      <nav>
        <div
          className={`flex items-center border-b-2 ${styleOnHasFilter} m-2 mx-4 transition duration-150 bg-white dark:bg-dark-max `}>
          <input
            type="text"
            name="searchRequests"
            value={filter}
            autoComplete="off"
            onChange={(event: ChangeEvent<HTMLInputElement>): void => setFilter(event.target.value)}
            id="searchRequests"
            placeholder="Pesquise endpoints, textos..."
            className="w-full text-gray-500 dark:text-gray-300 focus:outline-none p-2 dark:bg-dark-max "
          />
          {hasAnyFilter ? (
            <button type="button" className="p-2 animate-fadeInSpeed" onClick={() => setFilter('')}>
              <MdClear />
            </button>
          ) : undefined}
        </div>
        <div className="overflow-y-scroll" style={{ height: `calc(${innerHeight}px - 120px)` }}>
          <div className="px-2">
            <GroupSuits filter={filter} />
            <div className="min-h-[5rem]"></div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
