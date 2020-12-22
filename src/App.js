import { Route, Routes } from 'react-router-dom'
import './assets/scss/App.scss'
import Home from './components/Home'
import Navigation from './components/Navigation'
import AdminLogin from './components/admin/AdminLogin'
import SearchPage from './components/search/SearchPage'
import Company from './components/company/Company'

function App() {
	return (
			<div className="App">
				<Navigation />
				<div className="container">
					<Routes>
						<Route path="/">
							<Home />
						</Route>

						<Route path="/admin">
							<AdminLogin />
						</Route>

						<Route path="/company">

							<Route path="/:companyName">
								<Company />
							</Route>
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
