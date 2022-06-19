import Login from '../views/auth/Login';
import Logout from '../views/auth/Logout';
import Learn from '../views/Learn';
import Articles from '../views/Articles';
import Calculators from '../views/Calculators';

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
	{
		path: '/articles',
		component: Articles,
		layout: 'main',
	},
	{
		path: '/calculators',
		component: Calculators,
		layout: 'main',
	},
	{
		path: '/tests',
		component: Calculators,
		layout: 'main',
	},
];
export default routes;
