import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import folderReducer from "./slices/folderSlice";
import { fileAPI } from "./services/fileService";

const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [folderAPI.reducerPath]: folderAPI.reducer,
  [fileAPI.reducerPath]: fileAPI.reducer,
  token: tokenReducer,
  folder: folderReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    folderAPI.reducerPath,
    fileAPI.reducerPath,
    authAPI.reducerPath,
    "token",
    userAPI.reducerPath,
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      userAPI.middleware,
      authAPI.middleware,
      folderAPI.middleware,
      fileAPI.middleware,
    ]),
});

export const persistor = persistStore(store);
