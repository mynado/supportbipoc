import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { SearchProvider } from './contexts/SearchContext'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<SearchProvider>
				<App />
			</SearchProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);