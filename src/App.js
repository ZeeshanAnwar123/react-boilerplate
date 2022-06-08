import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Auth from './layout/Auth';
import Main from './layout/Main';
import routes from './routes';
import store from './store';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Default from './layout/Default';

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						{routes.map(route => {
							switch (route.layout) {
								case 'main':
									return (
										<Route exact path={route.path}>
											<Main>
												<route.component />
											</Main>
										</Route>
									);
								case 'auth':
									return (
										<Route exact path={route.path}>
											<Auth>
												<route.component />
											</Auth>
										</Route>
									);
								default:
									return (
										<Route exact path={route.path}>
											<Default>
												<route.component />
											</Default>
										</Route>
									);
							}
						})}
						<Redirect to='/' />
					</Switch>
				</BrowserRouter>
			</Provider>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{/* Same as */}
			<ToastContainer />
		</>
	);
}

export default App;
