import { Route, Routes } from 'react-router-dom'
import './assets/scss/App.scss'
import AuthContextProvider from './contexts/AuthContext'
import Home from './components/Home'
import Navigation from './components/Navigation'
import AuthRoute from "./components/AuthRoute";
import AdminLogin from './components/admin/AdminLogin'
import AdminHome from './components/admin/AdminHome'
import SearchPage from './components/search/SearchPage'
import CompanyPage from './components/company/CompanyPage'
import AdminAddCompany from './components/admin/AdminAddCompany'
import Companies from './components/company/Companies'

function App() {
	return (
			<AuthContextProvider>
				<div className="App">
					<Navigation />
					<div className="container">
						<Routes>
							<Route path="/">
								<Home />
							</Route>

							<Route path="/admin">
								<Route path="/">
									<AdminLogin />
								</Route>
								
								<AuthRoute path="/home">
									<AdminHome />
								</AuthRoute>

								<AuthRoute path="/add-company">
									<AdminAddCompany />
								</AuthRoute>
							</Route>

							<Route path="/companies">
								<Route path="/">
									<Companies />
								</Route>

								<Route path="/:companyName">
									<CompanyPage />
								</Route>
							</Route>

							<Route path="/search">
								<SearchPage />
							</Route>
						</Routes>
					</div>
				</div>
			</AuthContextProvider>
	);
}

export default App;
