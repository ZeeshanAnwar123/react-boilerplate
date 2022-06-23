import { FETCH_TESTS } from '../types';
import firebase from '../../config/firebase';
import { toast } from 'react-toastify';

let firestore = firebase.firestore();
let Content = firestore.collection('Content');

export const fetchTest =
	({ section, categoryId }) =>
	async dispatch => {
		dispatch({ type: FETCH_TESTS, payload: 'loading' });
		Content.where('section', '==', section)
			.where('categoryId', '==', categoryId)
			.where('contentType', '==', 1)
			.onSnapshot(snapshot => {
				let testItems = [];
				for (let doc of snapshot.docs) {
					testItems.push({ id: doc.id, ...doc.data() });
				}
				dispatch({ type: FETCH_TESTS, payload: testItems });
			});
	};

export const addTest =
	(payload, section, contentType, categoryId) => async dispatch => {
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
			toast.success('Test Added!!!');
		}
	};
