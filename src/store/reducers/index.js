// Root Reducer

import { combineReducers } from "redux";
import authUserReducer from "./authUser";
import categoryReducer from './categoryReducer';
import courseReducer from './courseReducer';

export let rootReducer = combineReducers({
	authUser: authUserReducer,
	category: categoryReducer,
	course: courseReducer,
});

export default rootReducer;
