import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";

import clientReducer from "./reducers/clientReducer";
import productReducer from "./reducers/productReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";

const rootReducer = combineReducers({   //Uygulamanın global state'ini yöneten ana fonksiyondur.
    client: clientReducer,
    product: productReducer,
    shoppingCart: shoppingCartReducer,
});

const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;