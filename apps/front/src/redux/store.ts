import { configureStore } from "@reduxjs/toolkit";
import youtubeReducer from "./Slice/Youtube/youtube.slice";
import authReducer from "./Slice/authSlice";
import userReducer from "./Slice/useSliceForAdmin/userSlice";
import activeStatusReducer from "./Slice/activeStatus/activeStatusSlice"
import subscriptionPlansReducer from './Slice/SubscriptionPlansSlice/subscriptionPlansSlice'
export const store = configureStore({
  reducer: {
    youtube: youtubeReducer,
    auth: authReducer,
    users:userReducer,
    activeStatus:activeStatusReducer,
    subscriptionPlans:subscriptionPlansReducer
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
