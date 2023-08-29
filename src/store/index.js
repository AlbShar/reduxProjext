import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import filters from "../reducers/filters";
import heroes from "../reducers/heroes";

const stringMiddleware = (store) => (dispatch) => (action) => {
    if (typeof action === "string") {
        return dispatch({
          type: action
        });
      }
      return dispatch(action);
};

// const enhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       if (typeof action === "string") {
//         return oldDispatch({
//           type: action
//         });
//       }
//       return oldDispatch(action);
//     };

//     return store;
//   };

const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = applyMiddleware(stringMiddleware);

const store = createStore( 
                    combineReducers({heroes, filters}),
                    composeEnhancers(middleware));

export default store;
