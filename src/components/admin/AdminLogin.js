import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './AdminLogin.scss'

const AdminLogin = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { login } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
			navigate('/companies')
		} catch (e) {
			setError("Could not log in. Please check your email address and your password.")
			setLoading(false)
		}
	}
	return (
		<div className="container mt-5">
			<div className="card card-container admin-card">
				<div className="card-body">
					<h5 className="card-title">Admin Login</h5>
						{error && (<div className="alert alert-danger">{error}</div>)}
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="exampleInputEmail1">Email</label>
								<input 
									type="email"
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Enter email"
									ref={emailRef}
									required/>
							</div>
							<div className="form-group">
								<label htmlFor="exampleInputPassword1">Password</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword1"
									placeholder="Password"
									ref={passwordRef}
									autoComplete="on"
									required/>
							</div>
							<button disabled={loading} type="submit" className="btn btn-primary">Login</button>
						</form>
				</div>
			</div>
		</div>
	)
}

export default AdminLogin

