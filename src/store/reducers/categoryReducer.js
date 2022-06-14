import { FETCH_CATEGORIES } from '../types';

const initialState = {
	categories: 'idle',
};

export default function categoryReducer(
	state = initialState,
	{ type, payload }
) {
	console.log({ type, payload });
	switch (type) {
		case FETCH_CATEGORIES:
			return {
				...state,
				categories: payload,
			};
		default:
			return {
				...state,
			};
	}
}
