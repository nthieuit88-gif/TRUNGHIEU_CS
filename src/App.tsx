/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Software } from './pages/Software';
import { WebDesign } from './pages/WebDesign';
import { AppTools } from './pages/AppTools';
import { Cart } from './pages/Cart';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="phan-mem" element={<Software />} />
          <Route path="thiet-ke-website" element={<WebDesign />} />
          <Route path="app-tools" element={<AppTools />} />
          <Route path="gio-hang" element={<Cart />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
