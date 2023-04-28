import React from 'react';
import App from './App';
import * as ReactDOMCllient from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const routing = (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
        </Routes>
    </BrowserRouter>
);

const container = document.getElementById('root');
if (container) {
    const root = ReactDOMCllient.createRoot(container);
    root.render(routing);
} else {
    throw new Error('Could not find root container');
}
