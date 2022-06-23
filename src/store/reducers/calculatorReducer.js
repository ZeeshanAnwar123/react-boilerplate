import { FETCH_CALCULATORS } from '../types';

const initialState = {
	calculators: 'idle',
};

export default function calculatorReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case FETCH_CALCULATORS:
			return {
				...state,
				calculators: payload,
			};
		default:
			return {
				...state,
			};
	}
}
