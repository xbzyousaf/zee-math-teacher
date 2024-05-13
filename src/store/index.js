import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./main"; // Import your root reducer
import setProfileReducer from "./setProfile";
import searchReducer from "./search";
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

const persistConfig = {
  key: "root",
  storage,
};

const persistedMainReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    main: persistedMainReducer,
    profile: setProfileReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };
