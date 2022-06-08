import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/authAction';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import LogoCropped from '../../assets/img/logo_cropped.png';
import { useState } from 'react';
const Login = props => {
	let dispatch = useDispatch();
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let [loading, setLoading] = useState(false);
	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		let obj = {
			email,
			password,
		};
		await dispatch(login(obj));
		setLoading(false);
	};
	return (
		<>
			<div className='auth-form p-4 p-sm-5'>
				<div className='d-flex justify-content-center'>
					<img src={LogoCropped} />
				</div>
				<hr />
				<h5 className='font-weight-bold mt-4'>Login</h5>
				<Form onSubmit={handleSubmit}>
					<FormGroup className='mt-3'>
						<Label>Email</Label>
						<Input
							type='email'
							required
							value={email}
							onChange={e => setEmail(e.target.value)}
						></Input>
					</FormGroup>
					<FormGroup>
						<Label>Password</Label>
						<Input
							type='password'
							required
							value={password}
							onChange={e => setPassword(e.target.value)}
						></Input>
					</FormGroup>
					<Button type='submit' block color='dark' disabled={loading}>
						{loading ? <Spinner size='sm' /> : 'Login'}
					</Button>
				</Form>
			</div>
		</>
	);
};

export default Login;
