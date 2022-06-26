// Root Reducer

import { combineReducers } from 'redux';
import authUserReducer from './authUser';
import categoryReducer from './categoryReducer';
import calculatorReducer from './calculatorReducer';
import courseReducer from './courseReducer';
import testReducer from './testReducer';
import articleReducer from './articleReducer';

export let rootReducer = combineReducers({
	authUser: authUserReducer,
	category: categoryReducer,
	course: courseReducer,
	calculator: calculatorReducer,
	test: testReducer,
	article: articleReducer,
});

export default rootReducer;
