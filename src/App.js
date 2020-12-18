import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './assets/scss/App.scss'
import Home from './components/Home'
import Navigation from './components/Navigation'
import SearchBar from './components/search/SearchBar';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Navigation />
				<SearchBar />
				<div className="container">
					<Routes>
						<Route path="/">
							<Home />
						</Route>
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
