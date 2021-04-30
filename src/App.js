import { Route, Routes, useLocation } from 'react-router-dom'
import './assets/scss/App.scss'
import AuthContextProvider from './contexts/AuthContext'
import Home from './components/Home'
import Navigation from './components/navigation/Navigation'
import AuthRoute from "./components/AuthRoute";
import AdminLogin from './components/admin/AdminLogin'
import CompanyPage from './components/companies/CompanyPage'
import CompanyAdd from './components/companies/CompanyAdd'
import Companies from './components/companies/Companies'
import CompanyEdit from './components/companies/CompanyEdit'
import CategoryPage from './components/categories/CategoryPage'
import SearchResult from './components/search/SearchResults'
import About from './components/pages/About'
import Contact from './components/pages/Contact'

function App() {
	const homePage = useLocation().pathname === '/'
	return (
		<AuthContextProvider>
			<div className={`App ${homePage ? 'change-color' : ''}` }>
				<Navigation />
				<Routes>
					<Route path="/">
						<Home />
					</Route>

					<Route path="/about">
						<About />
					</Route>

					<Route path="/contact">
						<Contact />
					</Route>

					<Route path="/admin">
						<Route path="/">
							<AdminLogin />
						</Route>
					</Route>

					<Route path="/companies">
						<Route path="/">
							<Companies />
						</Route>

						<AuthRoute path="/add">
							<CompanyAdd />
						</AuthRoute>

						<Route path="/:companyName">
							<Route path="/">
								<CompanyPage />
							</Route>

							<AuthRoute path="/edit">
								<CompanyEdit />
							</AuthRoute>
						</Route>
					</Route>

					<Route path="/search">
						<SearchResult />
					</Route>

					<Route path="/categories">
						<Route path="/:categoryName">
							<CategoryPage />
						</Route>
					</Route>
				</Routes>
			</div>
		</AuthContextProvider>
	);
}

export default App;
