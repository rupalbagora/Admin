import { configureStore } from "@reduxjs/toolkit";
import youtubeReducer from "./Slice/Youtube/youtube.slice";
import authReducer from "./Slice/authSlice";
import userReducer from "./Slice/useSliceForAdmin/userSlice";
import activeStatusReducer from "./Slice/activeStatus/activeStatusSlice";
import subscriptionPlansReducer from "./Slice/SubscriptionPlansSlice/subscriptionPlansSlice";
import certificateReducer from "./Slice/Uploadcertificate/certificateSlice";
import offerReducer from "./Slice/specialOffer/offerSlice";
import packageReducer from "./Slice/package/packageSlice";
import productPackagesReducer from "./Slice/productPackage/productPackageSlice";
import appointmentReducer from "./Slice/productPackage/productPackageSlice";
import productReducer from "./Slice/product/productSlice";


export const store = configureStore({
  reducer: {
    youtube: youtubeReducer,
    auth: authReducer,
    users: userReducer,
    activeStatus: activeStatusReducer,
    subscriptionPlans: subscriptionPlansReducer,
    certificates: certificateReducer, 
    offers: offerReducer,
    package:packageReducer,
    productPackages: productPackagesReducer ,
    appointment: appointmentReducer,
      products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
