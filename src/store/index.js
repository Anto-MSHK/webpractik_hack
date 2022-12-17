import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userAPI } from "./services/userService";
import { authAPI } from "./services/authService";
import tokenReducer from "./services/tokenService";
import { folderAPI } from "./services/folderService";

const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [folderAPI.reducerPath]: folderAPI.reducer,
  token: tokenReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([userAPI.middleware, authAPI.middleware, folderAPI.middleware]),
});

export const persistor = persistStore(store);
