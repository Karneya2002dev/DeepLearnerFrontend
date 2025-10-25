import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "../Redux/Slices/coursesSlice";

const store = configureStore({
  reducer: {
    courses: courseReducer,
  },
});

export default store;
