import './assets/main.scss';
import api from './assets/api.json';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

createRoot( document.getElementById( `root` )! ).render( <StrictMode>
	<App data={ api } />
</StrictMode> );
