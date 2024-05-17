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

  const [isFocus, setIsFocus] = useState(false);
  const styleOnHasFilter =
    hasAnyFilter || isFocus ? 'dark:border-primary-700 border-primary-700' : 'border-gray-200 dark:border-gray-600';

  return (
    <aside
      className={`absolute top-0 ${styleMenuIsOpen} z-20 bottom-0 left-0 lg:relative lg:block lg:col-span-3 bg-white-smooth dark:bg-dark-max transition-colors duration-300 border-r-2 border-primary-200 dark:border-dark/20`}>
      <nav>
        <div className={`flex items-center border-2 rounded-md ${styleOnHasFilter} m-2 mx-4 transition duration-150 `}>
          <input
            type="text"
            name="searchRequests"
            value={filter}
            autoComplete="off"
            onBlur={() => setIsFocus(false)}
            onFocus={() => setIsFocus(true)}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => setFilter(event.target.value)}
            id="searchRequests"
            placeholder="Pesquise endpoints, textos..."
            className="w-full text-gray-500 dark:text-gray-300 focus:outline-none p-2 dark:bg-dark-max rounded-md "
          />
          {hasAnyFilter ? (
            <button type="button" className="p-2 px-4 animate-fadeInSpeed" onClick={() => setFilter('')}>
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
