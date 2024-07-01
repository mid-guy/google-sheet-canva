import * as ReactDOMClient from 'react-dom/client';
import * as React from 'react'
import App from "./App";

const container = document.getElementById('app');
const root = ReactDOMClient.createRoot(container as any);
root.render(<App />);