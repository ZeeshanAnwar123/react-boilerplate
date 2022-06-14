import { FETCH_COURSES } from '../types';

const initialState = {
	courses: 'idle',
};

export default function categoryReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case FETCH_COURSES:
			return {
				...state,
				courses: payload,
			};
		default:
			return {
				...state,
			};
	}
}
