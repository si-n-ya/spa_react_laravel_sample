import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
    <div className="text-red">
        Laravel React+Typescript環境構築
    </div>
);
