import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './core/contexts/dataProvider';
import { MenuProvider } from './core/contexts/menuProvider';
import App from './App';
import { ThemeProvider } from './core/contexts/themProvider';
import { DataSelectedProvider } from '@/contexts/dataSelectedProvider';

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <DataSelectedProvider>
      <ThemeProvider>
        <MenuProvider>
          <DataProvider>
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<App />} />
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </MenuProvider>
      </ThemeProvider>
    </DataSelectedProvider>
  </React.StrictMode>,
);
