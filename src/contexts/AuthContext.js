import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

const useAuth = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {

			console.log(user)
			setCurrentUser(user)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const contextValues = {
		currentUser,
		loading,
		login,
	}
	return (
		<AuthContext.Provider value={contextValues}>
			{loading && (<p>Loading...</p>)}
			{!loading && props.children}
		</AuthContext.Provider>
	)
}

export {
	AuthContext,
	useAuth,
	AuthContextProvider as default
} 