import { FETCH_ARTICLES } from '../types';

const initialState = {
	articles: 'idle',
};

export default function articleReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case FETCH_ARTICLES:
			return {
				...state,
				articles: payload,
			};
		default:
			return {
				...state,
			};
	}
}
