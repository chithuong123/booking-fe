import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';  // Import rootReducer
import rootSaga from './sagas';  // Import rootSaga

// Tạo saga middleware
const sagaMiddleware = createSagaMiddleware();

// Kiểm tra môi trường và sử dụng Redux DevTools chỉ trong môi trường development
const middlewareEnhancer = process.env.NODE_ENV === 'development'
  ? composeWithDevTools(applyMiddleware(sagaMiddleware))
  : applyMiddleware(sagaMiddleware);

// Tạo store với Redux DevTools (chỉ dùng khi development) và Saga middleware
const store = createStore(
  rootReducer,
  middlewareEnhancer
);

// Chạy các saga watcher
sagaMiddleware.run(rootSaga);

export default store;
