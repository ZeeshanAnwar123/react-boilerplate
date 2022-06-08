import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Auth = props => {
	let history = useHistory();
	let authUser = useSelector(state => state.authUser);
	const checkAuth = () => {
		if (authUser.uid != null) history.push('/');
	};
	useEffect(() => {
		checkAuth();
	}, [authUser]);
	return (
		<>
			<div className='d-flex align-items-center justify-content-center w-100 h-full'>
				{props.children}
			</div>
		</>
	);
};

export default Auth;
