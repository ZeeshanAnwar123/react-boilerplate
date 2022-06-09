import Login from '../views/auth/Login';
import Logout from '../views/auth/Logout';
import Learn from '../views/Learn';

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
		path: '/learn',
		component: Learn,
		layout: 'main',
	},
];
export default routes;
