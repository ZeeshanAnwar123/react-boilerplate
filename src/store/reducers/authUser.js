import { LOGIN, LOGOUT, UPDATE_PROFILE } from "../types";

const initialState = {
	uid: null,
};

export default function authUserReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case LOGIN:
			return {
				...state,
				uid: payload.id,
			};
		case LOGOUT:
			localStorage.removeItem('auth');
			return {
				...state,
				uid: null,
			};
		default:
			return { ...state };
	}
}
