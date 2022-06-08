import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Main = props => {
	let history = useHistory();
	let authUser = useSelector(state => state.authUser);
	const checkAuth = () => {
		if (authUser.uid == null) history.push('/auth/login');
	};
	useEffect(() => {
		checkAuth();
	}, [authUser]);
	return (
		<div className='d-flex'>
			<Sidebar />
			<div className='main-content'>{props.children}</div>
		</div>
	);
};

export default Main;
