import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './core/contexts/dataProvider';
import { MenuProvider } from './core/contexts/menuProvider';
import App from './App';
import { ThemeProvider } from './core/contexts/themProvider';
import { DocSelectedProvider } from '@/contexts/docSelectedProvider';
import { ModeProvider } from '@/contexts/devProvider';

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <DocSelectedProvider>
    <ThemeProvider>
      <MenuProvider>
        <ModeProvider>
          <DataProvider>
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<App />} />
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </ModeProvider>
      </MenuProvider>
    </ThemeProvider>
  </DocSelectedProvider>,
);
