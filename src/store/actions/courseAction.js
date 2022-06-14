import { toast } from 'react-toastify';
import firebase from '../../config/firebase';
import { FETCH_COURSES } from '../types';
let firestore = firebase.firestore();
let Content = firestore.collection('Content');
let Learn = firestore.collection('Learn');
const upload = async (id, ref, file) => {
	let parts = file.name.split('.');
	let ext = parts[parts.length - 1];
	let name = id + '.' + ext;
	await ref.child(name).put(file);
	let url = await ref.child(name).getDownloadURL();
	return url;
};
export const addCourse = payload => async dispatch => {
	let { tutorials, course } = payload;
	let classes = [];
	for (let tutorial of tutorials) {
		let documentId = Content.doc().id;
		tutorial.documentId = documentId;
		tutorial.timeInterval = new Date().getTime();
		classes.push(documentId);
		if (tutorial.videoUrl) {
			let ref = firebase.storage().ref('article').child('video');
			tutorial.videoUrl = await upload(
				documentId,
				ref,
				tutorial.videoUrl
			);
		}
		if (tutorial.primaryImage) {
			let ref = firebase.storage().ref('article').child('image');
			tutorial.primaryImage = await upload(
				documentId,
				ref,
				tutorial.primaryImage
			);
			tutorial.thumbnail = tutorial.primaryImage;
		}
		await Content.doc(documentId).set(tutorial);
	}
	let learnId = Learn.doc().id;
	if (course.thumbnail) {
		let ref = firebase.storage().ref('article').child('image');
		course.thumbnail = await upload(learnId, ref, course.thumbnail);
	}
	course.classes = classes;
	await Learn.doc(learnId).set(course);
	toast.success('Course Added Successfully!!!');
};
export const editCourse = payload => async dispatch => {
	let { tutorials, course } = payload;
	let classes = [];
	for (let tutorial of tutorials) {
		let documentId = tutorial.documentId
			? tutorial.documentId
			: Content.doc().id;
		tutorial.documentId = documentId;
		tutorial.timeInterval = new Date().getTime();
		classes.push(documentId);
		if (tutorial.videoUrl && typeof tutorial.videoUrl != 'string') {
			let ref = firebase.storage().ref('article').child('video');
			tutorial.videoUrl = await upload(
				documentId,
				ref,
				tutorial.videoUrl
			);
		}
		if (tutorial.primaryImage && typeof tutorial.primaryImage != 'string') {
			let ref = firebase.storage().ref('article').child('image');
			tutorial.primaryImage = await upload(
				documentId,
				ref,
				tutorial.primaryImage
			);
			tutorial.thumbnail = tutorial.primaryImage;
		}
		await Content.doc(documentId).set(tutorial);
	}
	let learnId = course.id ? course.id : Learn.doc().id;
	if (course.thumbnail && typeof course.thumbnail != 'string') {
		let ref = firebase.storage().ref('article').child('image');
		course.thumbnail = await upload(learnId, ref, course.thumbnail);
	}
	course.classes = classes;
	await Learn.doc(learnId).set(course);
	toast.success('Course Updated Successfully!!!');
};
export const fetchCourses = () => async dispatch => {
	Learn.onSnapshot(async snapshot => {
		console.log('FETCH_COURSES');
		dispatch({ type: FETCH_COURSES, payload: 'loading' });
		let courses = [];
		for (let doc of snapshot.docs) {
			let learnData = doc.data();
			learnData['tutorials'] = [];
			for (let contentId of learnData.classes) {
				let contentDoc = await Content.doc(contentId).get();
				let contentData = contentDoc.data();
				if (contentData.contentType == 3 && contentData.section == 3) {
					learnData['tutorials'].push(contentData);
				}
			}
			if (learnData['tutorials'].length != 0)
				courses.push({ id: doc.id, ...learnData });
		}
		dispatch({ type: FETCH_COURSES, payload: courses });
	});
};
