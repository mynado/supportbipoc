import { Route, Routes } from 'react-router-dom'
import './assets/scss/App.scss'
import Home from './components/Home'
import Navigation from './components/Navigation'
import SearchPage from './components/search/SearchPage'

function App() {
	return (
			<div className="App">
				<Navigation />
				<div className="container">
					<Routes>
						<Route path="/">
							<Home />
						</Route>

						<Route path="/search">
							<SearchPage />
						</Route>
					</Routes>
				</div>
			</div>
	);
}

export default App;
