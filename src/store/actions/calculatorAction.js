import { FETCH_CALCULATORS } from '../types';
import firebase from '../../config/firebase';
import { toast } from 'react-toastify';

let firestore = firebase.firestore();
let Content = firestore.collection('Content');

export const fetchCalculator =
	({ section, categoryId }) =>
	async dispatch => {
		dispatch({ type: FETCH_CALCULATORS, payload: 'loading' });
		Content.where('section', '==', section)
			.where('categoryId', '==', categoryId)
			.where('contentType', '==', 0)
			.onSnapshot(snapshot => {
				let calculatorItems = [];
				for (let doc of snapshot.docs) {
					calculatorItems.push({ id: doc.id, ...doc.data() });
				}
				dispatch({ type: FETCH_CALCULATORS, payload: calculatorItems });
			});
	};

export const addCalculator =
	(payload, section, contentType, categoryId) => async dispatch => {
		console.log(section, contentType, categoryId);
		let isError = false;
		let contents = await Content.where('section', '==', section)
			.where('contentType', '==', contentType)
			.where('categoryId', '==', categoryId)
			.get();
		for (let content of contents.docs) {
			await Content.doc(content.id).delete();
		}
		for (let content of payload) {
			let documentId = content.documentId;
			if (documentId == '') {
				documentId = Content.doc().id;
			}
			content.documentId = documentId;
			content.timeInterval = new Date().getTime();
			await Content.doc(documentId)
				.set(content)
				.catch(err => {
					isError = true;
				});
		}
		if (!isError) {
			toast.success('Calculator Added!!!');
		}
	};
