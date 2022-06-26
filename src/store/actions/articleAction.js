import { toast } from 'react-toastify';
import firebase from '../../config/firebase';
import { FETCH_ARTICLES } from '../types';
let firestore = firebase.firestore();
let Content = firestore.collection('Content');
const upload = async (id, ref, file) => {
	let parts = file.name.split('.');
	let ext = parts[parts.length - 1];
	let name = id + '.' + ext;
	await ref.child(name).put(file);
	let url = await ref.child(name).getDownloadURL();
	return url;
};
export const addArticle = payload => async dispatch => {
	let documentId = Content.doc().id;
	payload.documentId = documentId;
	if (payload.videoUrl && typeof payload.videoUrl != 'string') {
		let ref = firebase.storage().ref('article').child('video');
		payload.videoUrl = await upload(documentId, ref, payload.videoUrl);
	}
	if (payload.primaryImage) {
		let ref = firebase.storage().ref('article').child('image');
		payload.primaryImage = await upload(
			documentId,
			ref,
			payload.primaryImage
		);
		payload.thumbnail = payload.primaryImage;
	}
	for (let content of payload.content) {
		let { paragraphId } = content;
		if (content.bottomVideo && typeof content.bottomVideo != 'string') {
			let ref = firebase.storage().ref('article').child('video');
			content.bottomVideo = await upload(
				paragraphId,
				ref,
				content.bottomVideo
			);
		}
		if (content.bottomImage) {
			let ref = firebase.storage().ref('article').child('image');
			content.bottomImage = await upload(
				paragraphId,
				ref,
				content.bottomImage
			);
		}
	}
	payload.timeInterval = new Date().getTime();
	await Content.doc(documentId).set(payload);
	toast.success('Article Added Successfully!!!');
};
export const editArticle = payload => async dispatch => {
	console.log({ payload });
	let documentId = payload.documentId;
	console.log({ documentId });
	if (!documentId || documentId == '') {
		documentId = Content.doc().id;
	}
	if (payload.videoUrl && typeof payload.videoUrl != 'string') {
		let ref = firebase.storage().ref('article').child('video');
		payload.videoUrl = await upload(documentId, ref, payload.videoUrl);
	}
	if (payload.primaryImage && typeof payload.primaryImage != 'string') {
		let ref = firebase.storage().ref('article').child('image');
		payload.primaryImage = await upload(
			documentId,
			ref,
			payload.primaryImage
		);
		payload.thumbnail = payload.primaryImage;
	}
	for (let content of payload.content) {
		let { paragraphId } = content;
		if (content.bottomVideo && typeof content.bottomVideo != 'string') {
			let ref = firebase.storage().ref('article').child('video');
			content.bottomVideo = await upload(
				paragraphId,
				ref,
				content.bottomVideo
			);
		}
		if (content.bottomImage && typeof content.bottomImage != 'string') {
			let ref = firebase.storage().ref('article').child('image');
			content.bottomImage = await upload(
				paragraphId,
				ref,
				content.bottomImage
			);
		}
	}
	await Content.doc(documentId).update(payload);
	toast.success('Article Updated Successfully!!!');
};
export const fetchArticles =
	({ section }) =>
	async dispatch => {
		dispatch({ type: FETCH_ARTICLES, payload: 'loading' });
		Content.where('contentType', '==', 1)
			.where('section', '==', section)
			.onSnapshot(snapshot => {
				let articles = [];
				for (let doc of snapshot.docs) {
					articles.push({ ...doc.data() });
				}
				dispatch({ type: FETCH_ARTICLES, payload: articles });
			});
	};

export const deleteArticle = articleId => async dispatch => {
	let content = await Content.doc(articleId).get();
	let contentData = content.data();
	for (let content of contentData.content) {
		if (content.bottomImage.includes('firebasestorage')) {
			// await firebase.storage().refFromURL(primaryImage).delete();
		}
		if (content.bottomVideo.includes('firebasestorage')) {
			// await firebase.storage().refFromURL(videoUrl).delete();
		}
	}
	if (contentData.thumbnail.includes('firebasestorage')) {
		// await firebase.storage().refFromURL(courseData.thumbnail).delete();
	}
	await Content.doc(articleId).delete();
};
