import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from './reducers';

const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});

export default store;