import { FETCH_TESTS } from '../types';

const initialState = {
	tests: 'idle',
};

export default function testReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCH_TESTS:
			return {
				...state,
				tests: payload,
			};
		default:
			return {
				...state,
			};
	}
}
