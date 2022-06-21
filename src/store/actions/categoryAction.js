import { toast } from 'react-toastify';
import firebase from '../../config/firebase';
import { FETCH_CATEGORIES } from '../types';
let firestore = firebase.firestore();
let Category = firestore.collection('Category');

export const fetchCategories =
	({ contentType, section }) =>
	async dispatch => {
		dispatch({ type: FETCH_CATEGORIES, payload: 'loading' });
		Category.where('contentType', '==', contentType)
			.where('section', '==', section)
			.onSnapshot(snapshot => {
				let categories = [];
				for (let categoryDoc of snapshot.docs) {
					categories.push({
						id: categoryDoc.id,
						...categoryDoc.data(),
					});
				}
				console.log({ categories });
				dispatch({ type: FETCH_CATEGORIES, payload: categories });
			});
	};

export const addCategory = payload => async dispatch => {
	let categoryId = Category.doc().id;
	payload.categoryColor = payload.categoryColor.replace('#', '');
	payload.timeInterval = new Date().getTime();
	payload.categoryId = categoryId;
	Category.add(payload).then(() => {
		toast.success('Category Added!!!');
	});
};
