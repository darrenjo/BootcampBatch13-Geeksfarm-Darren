import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import { composeWithDevTools } from "@redux-devtools/extension";

export default configureStore({
  reducer: {
    counter: counterSlice,
    composeWithDevTools,
  },
});
