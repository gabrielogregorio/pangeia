import { ReactElement, useContext } from 'react';
import { MenuContext } from '@/contexts/menuProvider';
import { IconMenu, MainLogo } from '@/icons/index';
import { Actions } from '@/layout/actions';

export const Header = (): ReactElement => {
  const { toggleMenuIsOpen } = useContext(MenuContext);

  return (
    <div
      style={{ height: '3.5rem' }}
      className="w-full bg-cyan-500 dark:bg-cyan-700 p-3 py-2 flex items-center h-[3.5rem] min-h-[3.5rem]">
      <header className="text-white font-bold text-3xl uppercase w-full flex items-center justify-center ">
        <div className="bg-cyan-500 dark:bg-cyan-700 text-white font-bold text-xl text-left p-3 py-2 uppercase flex items-center h-[3.5rem] min-h-[3.5rem]">
          <button
            type="button"
            id="expand-menu"
            onClick={(): void => toggleMenuIsOpen()}
            className="mr-2 lg:hidden border border-gray-300 dark:border-cyan-700 bg-white dark:bg-cyan-600 rounded-full p-2 text-cyan-600 dark:text-white">
            <IconMenu />
          </button>

          <a href="/" className="mr-2 flex items-center justify-center">
            <MainLogo />
            <div id="main-title">yggdrasil</div>
          </a>
        </div>

        <div className="flex-1" />

        <Actions />
      </header>
    </div>
  );
};
