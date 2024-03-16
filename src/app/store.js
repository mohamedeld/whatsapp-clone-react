import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore} from "redux-persist";
import createFilter from "redux-persist-transform-filter";

const saveUserOnlyFilter = createFilter("user",["user"]);
const persistConfig = {
  key:"user",
  storage,
  whitelist:["user"],
  transforms:[saveUserOnlyFilter]
}

const persistedReducer = persistReducer(persistConfig,rootReducer);


export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"]
      }
    }),
  devTools:false
})

export const persistor = persistStore(store);