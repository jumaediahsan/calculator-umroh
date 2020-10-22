import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { reducer as form } from 'redux-form';

const persistConfig = {
	key: 'root',
	storage,
}


const reducers = combineReducers({
	form,
	//your other reducers
})

const persistedReducer = persistReducer(
	persistConfig,
	reducers
)

const store = createStore(
	persistedReducer
);

const persistor = persistStore(store)

export {
	store, 
	persistor
} 