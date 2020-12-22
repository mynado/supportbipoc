import { useRef } from 'react'

const AdminLogin = () => {
	const emailRef = useRef()
	const passwordRef = useRef()

	const handleSubmit = async e => {
		e.preventDefault()
		console.log('email', emailRef.current.value)
		console.log('password', passwordRef.current.value)
	}
	return (
		<>
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">Admin Login</h5>
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
							<button type="submit" className="btn btn-primary">Login</button>
						</form>
				</div>
			</div>
		</>
	)
}

export default AdminLogin

