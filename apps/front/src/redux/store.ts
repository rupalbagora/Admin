import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import userReducer from "./Slice/useSliceForAdmin/userSlice";
import activeStatusReducer from "./Slice/activeStatus/activeStatusSlice";
import subscriptionPlansReducer from "./Slice/SubscriptionPlansSlice/subscriptionPlansSlice";
import certificateReducer from "./Slice/Uploadcertificate/certificateSlice";
import offerReducer from "./Slice/specialOffer/offerSlice";
import packageReducer from "./Slice/package/packageSlice";
import productPackagesReducer from "./Slice/productPackage/productPackageSlice";
import appointmentReducer from "./Slice/appointment/appointmentSlice";
import productReducer from "./Slice/product/productSlice";
import youtubeReducer from "./Slice/Youtube/youtube.slice"; 
import aboutSalonReducer from "./Slice/AboutOurSaloon/aboutSalonSlice";
import aboutUsReducer  from "./Slice/documents/aboutUsSlice";
import privacyPolicyReducer from "./Slice/documents/privacyPolicySlice";
import termsConditionReducer from "./Slice/documents/termsConditionSlice";

export const store = configureStore({
  reducer: {
    youtube: youtubeReducer,
    auth: authReducer,
    users: userReducer,
    activeStatus: activeStatusReducer,
    subscriptionPlans: subscriptionPlansReducer,
    certificates: certificateReducer, 
    offers: offerReducer,
    packages:packageReducer,
    productPackages: productPackagesReducer ,
    appointment: appointmentReducer,
    products: productReducer,
    youtubeVideos: youtubeReducer, 
    aboutSalons: aboutSalonReducer, 
    aboutUs: aboutUsReducer,
    privacyPolicy: privacyPolicyReducer,
    termsCondition: termsConditionReducer, 

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
