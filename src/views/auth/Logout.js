import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { logout } from '../../store/actions/authAction';

const Logout = () => {
	let history = useHistory();
	let dispatch = useDispatch();
	useEffect(() => {
		async function logoutUser() {
			await dispatch(logout());
			history.push('/auth/login');
		}
		logoutUser();
	});
	return (
		<>
			<div className='d-flex h-full w-100 align-items-center justify-content-center'>
				<div className='d-flex flex-column align-items-center justify-content-center'>
					<Spinner />
					<h5 className='mt-4'>Logging Out...</h5>
				</div>
			</div>
		</>
	);
};

export default Logout;
