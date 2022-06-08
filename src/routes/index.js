import Login from '../views/auth/Login';
import Logout from '../views/auth/Logout';
import MainView from '../views/MainView';

let routes = [
	{
		path: '/auth/login',
		component: Login,
		layout: 'auth',
	},
	{
		path: '/auth/logout',
		component: Logout,
	},
	{
		path: '/',
		component: MainView,
		layout: 'main',
	},
];
export default routes;
