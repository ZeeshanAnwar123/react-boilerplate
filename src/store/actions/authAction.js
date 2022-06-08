import { LOGIN, LOGOUT } from '../types';
import firebase from '../../config/firebase';
import { toast } from 'react-toastify';

let auth = firebase.auth();
let firestore = firebase.firestore();
let Admins = firestore.collection('Admins');

export const login = payload => async dispatch => {
	await auth
		.signInWithEmailAndPassword(payload.email, payload.password)
		.then(async data => {
			let admin = await Admins.doc(data.user.uid).get();
			if (admin.exists) {
				dispatch({
					type: LOGIN,
					payload: { id: data.user.uid },
				});
			} else {
				toast.error('You are not authorized to access panel.');
			}
		})
		.catch(err => {
			toast.error(err.message);
		});
};

export const logout = () => async dispatch => {
	await auth.signOut().then(() => {
		dispatch({
			type: LOGOUT,
		});
	});
};
