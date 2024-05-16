import { render } from '@testing-library/react';
import { ReactElement, useContext } from 'react';
import { Header } from '@/layout/header';
import { MenuContext, MenuProvider } from '@/contexts/menuProvider';
import { ThemeContext, ThemeProvider } from '@/contexts/themProvider';

const MockComponent = (): ReactElement => {
  const { theme } = useContext(ThemeContext);
  const { menuIsOpen } = useContext(MenuContext);

  return (
    <>
      <h1>theme {String(theme)}</h1>
      <h1>menuIsOpen {String(menuIsOpen)}</h1>

      <Header />
    </>
  );
};

describe('Header Context', () => {
  it('should alternate theme by header', () => {
    render(
      <ThemeProvider>
        <MenuProvider>
          <MockComponent />
        </MenuProvider>
      </ThemeProvider>,
    );

    // expect(screen.queryByText('theme dark') as HTMLElement).toBeInTheDocument();
    // expect(screen.queryByText('menuIsOpen false') as HTMLElement).toBeInTheDocument();

    // fireEvent.click(screen.getByTestId('change-theme'));

    // expect(screen.queryByText('theme white') as HTMLElement).toBeInTheDocument();
    // expect(screen.queryByText('menuIsOpen false') as HTMLElement).toBeInTheDocument();

    // fireEvent.click(screen.getByTestId('change-theme'));

    // expect(screen.queryByText('theme dark') as HTMLElement).toBeInTheDocument();
    // expect(screen.queryByText('menuIsOpen false') as HTMLElement).toBeInTheDocument();
  });
});
